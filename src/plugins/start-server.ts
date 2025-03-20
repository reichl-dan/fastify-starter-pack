import { host, port } from '../config'
import fp from 'fastify-plugin'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    start: () => Promise<void>
  }
}

/**
 * Defines the server start plugin functionality
 * @param server - The Fastify server instance
 */
const defineStartServerPlugin: FastifyPluginAsync = async (
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
const startServerPlugin = fp(defineStartServerPlugin, {
  name: '@fastify-core/start-server',
})

/**
 * Registers the server start plugin
 * @param server - The Fastify server instance
 */
export async function registerStartServer(server: FastifyInstance): Promise<void> {
  await server.register(startServerPlugin)
}
