import { host, port } from '../config'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

/**
 * Declares the start method on the FastifyInstance
 */
declare module 'fastify' {
  interface FastifyInstance {
    start: () => Promise<void>
  }
}

/**
 * Defines the server start plugin functionality
 * @param server - The Fastify server instance
 */
const defineServerStartPlugin: FastifyPluginAsync = async (
  server: FastifyInstance,
): Promise<void> => {
  server.decorate('start', async function (this: FastifyInstance) {
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

/**
 * Wraps the start plugin into fastify
 */
const serverStartPlugin = fp(defineServerStartPlugin, {
  name: 'server-start-plugin',
})

/**
 * Registers the server start plugin
 * @param server - The Fastify server instance
 */
export async function registerServerStart(server: FastifyInstance): Promise<void> {
  await server.register(serverStartPlugin)
}
