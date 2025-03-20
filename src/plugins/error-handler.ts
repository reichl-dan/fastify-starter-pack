import * as config from '../config'
import fp from 'fastify-plugin'
import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from 'fastify'

export interface ErrorResponse {
  statusCode: number
  error: string
  message: string
  stack?: string
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
        statusCode: reply.statusCode,
        error: error.name || 'Error',
        message: error.message || 'An error occurred',
      }

      // Handle validation errors
      if (error.validation) {
        response.statusCode = 400
        response.validation = error.validation.map(({ message, params }) => ({
          message: message || 'Validation error',
          field: params?.field?.toString(),
        }))
      }

      // Add stack trace in development
      if (config.isDevelopment && error.stack) {
        response.stack = error.stack
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
  name: '@fastify-core/error-handler',
  dependencies: ['@fastify-core/logger'],
})

/**
 * Registers the error handler plugin
 * @param server - The Fastify server instance
 */
export async function registerErrorHandler(server: FastifyInstance): Promise<void> {
  await server.register(errorHandlerPlugin)
}
