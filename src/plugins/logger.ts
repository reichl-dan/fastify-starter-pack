import * as config from '../config'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
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
  const pinoConfig: pino.LoggerOptions = {
    level: config.logLevel,
    transport:
      config.isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    ...options,
  }

  // Override the default logger
  server.log = pino(pinoConfig)

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
