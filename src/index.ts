import fastify, { type FastifyInstance } from 'fastify'
import { type PluginOptions, registerPlugins } from './plugins/_plugins'

/**
 * Configuration options for the Fastify server instance
 * @interface ServerOptions
 * @extends {PluginOptions}
 */
export interface ServerOptions extends PluginOptions {
  /**
   * Custom response for the health check endpoint
   * @default "{ status: 'ok' }"
   */
  healthCheck?: object
}

/**
 * Creates a new Fastify server instance with the given options
 * @param {ServerOptions} options - Configuration options for the server and its plugins
 * @returns {Promise<FastifyInstance>} A configured Fastify server instance
 * @throws {Error} If plugin registration fails
 */
export async function createServer(
  options: ServerOptions = {},
): Promise<FastifyInstance> {
  // Create the server
  const server = fastify()

  // Register plugins
  await registerPlugins(server, options)

  // Add health check route
  server.get('/health', async () => {
    return options.healthCheck ?? { status: 'ok' }
  })

  return server
}
