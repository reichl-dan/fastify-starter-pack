import type { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'

// Extend FastifyRequest to include our custom properties
declare module 'fastify' {
  interface FastifyRequest {
    startTime: [number, number] // NodeJS.HRTime type
  }
}

/**
 * Defines the monitoring plugin functionality
 * @param server - The Fastify server instance
 * @param options - Monitoring configuration options
 */
const defineMonitoringPlugin: FastifyPluginAsync = async (
  server: FastifyInstance,
): Promise<void> => {
  server.addHook('onRequest', (request, reply, done) => {
    request.startTime = process.hrtime()
    done()
  })

  server.addHook('onResponse', (request, reply, done) => {
    const diff = process.hrtime(request.startTime)
    const duration = diff[0] * 1e3 + diff[1] * 1e-6 // Convert to milliseconds
    request.log.info({
      statusCode: reply.statusCode,
      duration: `${duration.toFixed(2)}ms`,
      method: request.method,
      url: request.url,
    })
    done()
  })
}

/**
 * Wraps the monitoring plugin into fastify
 */
const monitoringPlugin = fp(defineMonitoringPlugin, {
  name: 'monitoring-plugin',
  dependencies: ['logger-plugin'],
})

/**
 * Registers the monitoring plugin
 * @param server - The Fastify server instance
 * @param options - Monitoring configuration options
 */
export async function registerMonitoring(server: FastifyInstance): Promise<void> {
  await server.register(monitoringPlugin)
}
