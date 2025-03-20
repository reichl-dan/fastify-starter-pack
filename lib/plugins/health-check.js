import fp from 'fastify-plugin'

/** @typedef {import('fastify').FastifyInstance} FastifyInstance */

/**
 * @typedef {Object} HealthCheckOptions
 * @property {Object} [healthCheck] - Custom response for the health check endpoint
 */

/**
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {HealthCheckOptions} [options={}] - Health check configuration options
 */
async function defineHealthCheckPlugin(server, options = {}) {
  server.get('/health', async () => {
    return options.healthCheck ?? { status: 'ok' }
  })
}

export const registerHealthCheck = fp(defineHealthCheckPlugin, {
  name: '@fastify-core/health-check',
})
