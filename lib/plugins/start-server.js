import fp from 'fastify-plugin'
import { host, port } from '../config.js'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('types/index.d.ts').ServerStartOptions} ServerStartOptions
 */

/**
 * Defines the server start plugin functionality
 * @param {FastifyInstance} server - The Fastify server instance
 */
async function defineStartServerPlugin(server) {
  /**
   * Start the server with optional configuration
   * @param {ServerStartOptions} [config={}] - Optional server configuration
   */
  server.decorate('start', async function (config = {}) {
    try {
      const serverHost = config.host ?? host
      const serverPort = config.port ?? port

      this.log.info(`🚀 Starting server on ${serverHost}:${serverPort}`)
      await this.listen({ host: serverHost, port: serverPort })

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
