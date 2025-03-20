import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'

export interface HealthCheckOptions {
  /**
   * Custom response for the health check endpoint
   * @default "{ status: 'ok' }"
   */
  healthCheck?: object
}

async function defineHealthCheckPlugin(
  server: FastifyInstance,
  options: HealthCheckOptions = {},
): Promise<void> {
  server.get('/health', async () => {
    return options.healthCheck ?? { status: 'ok' }
  })
}

export const registerHealthCheck = fp(defineHealthCheckPlugin, {
  name: '@fastify-core/health-check',
})
