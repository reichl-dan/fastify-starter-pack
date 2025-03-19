import type { FastifyBaseLogger, FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import type { LoggerOptions as PinoLoggerOptions } from 'pino'
import pino from 'pino'

export type LoggerPluginOptions = Partial<PinoLoggerOptions>

/**
 * Defines the logger plugin functionality
 * @param server - The Fastify server instance
 * @param options - Logger configuration options
 */
const defineLoggerPlugin: FastifyPluginAsync = async (
  server: FastifyInstance,
  options?: LoggerPluginOptions,
): Promise<void> => {
  // Override the default logger
  server.log = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport:
      process.env.NODE_ENV === 'development'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
    ...options,
  })

  // Add request logging hook
  server.addHook('onRequest', (request, reply, done) => {
    request.log.info({
      method: request.method,
      url: request.url,
      id: request.id,
    })
    done()
  })
}

/**
 * Wraps the logger plugin into fastify
 */
const loggerPlugin = fp(defineLoggerPlugin, {
  name: 'logger-plugin',
})

/**
 * Registers the logger plugin
 * @param server - The Fastify server instance
 * @param options - Logger configuration options
 */
export async function registerLogger(
  server: FastifyInstance,
  options?: Partial<PinoLoggerOptions>,
): Promise<void> {
  await server.register(loggerPlugin, options ?? {})
}
