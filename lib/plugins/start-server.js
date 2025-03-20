import fp from 'fastify-plugin'
import { host, port } from '../config.js'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 */

/**
 * Defines the server start plugin functionality
 * @param {FastifyInstance} server - The Fastify server instance
 */
async function defineStartServerPlugin(server) {
  server.decorate('start', async function () {
    try {
      await this.listen({ host, port })

      // Handle graceful shutdown
      const shutdown = async () => {
        this.log.info('🛑 Initiating shutdown...')
        try {
          await this.close()
          this.log.info('✅ Server shutdown complete')
          process.exit(0)
        } catch (err) {
          this.log.error('❌ Error during shutdown:', err)
          process.exit(1)
        }
      }

      // Register shutdown handlers
      process.on('SIGINT', shutdown)
      process.on('SIGTERM', shutdown)
    } catch (err) {
      this.log.error(err)
      process.exit(1)
    }
  })
}

const startServerPlugin = fp(defineStartServerPlugin, {
  name: '@fastify-core/start-server',
})

/**
 * Registers the server start plugin
 * @param {FastifyInstance} server - The Fastify server instance
 */
export async function registerStartServer(server) {
  await server.register(startServerPlugin)
}
