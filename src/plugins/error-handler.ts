import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import fp from 'fastify-plugin'

export interface ErrorResponse {
  error: string
  statusCode: number
  validation?: Array<{
    message: string
    field?: string
  }>
}

/**
 * Defines the error handler plugin functionality
 * @param server - The Fastify server instance
 */
const defineErrorHandlerPlugin: FastifyPluginAsync = async (
  server: FastifyInstance,
): Promise<void> => {
  server.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      // Log the error
      request.log.error({
        err: error,
        url: request.url,
        method: request.method,
        statusCode: error.statusCode,
      })

      // Apply default error response
      const response: ErrorResponse = {
        error: error.message || 'Internal Server Error',
        statusCode: error.statusCode || 500,
      }

      // Handle validation errors
      if (error.validation) {
        response.statusCode = 400
        response.validation = error.validation.map(({ message, params }) => ({
          message: message || 'Validation error',
          field: params?.field?.toString(),
        }))
      }

      // Include stack trace if in development
      if (process.env.NODE_ENV === 'development' && error.stack) {
        Object.assign(response, { stack: error.stack })
      }

      // Send the response
      reply.status(response.statusCode).send(response)
    },
  )
}

/**
 * Wraps the error handler plugin into fastify
 */
const errorHandlerPlugin = fp(defineErrorHandlerPlugin, {
  name: 'error-handler-plugin',
  dependencies: ['logger-plugin'],
})

/**
 * Registers the error handler plugin
 * @param server - The Fastify server instance
 */
export async function registerErrorHandler(server: FastifyInstance): Promise<void> {
  await server.register(errorHandlerPlugin)
}
