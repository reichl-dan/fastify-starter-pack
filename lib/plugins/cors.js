import cors from '@fastify/cors'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('@fastify/cors').FastifyCorsOptions} FastifyCorsOptions
 * @typedef {Partial<FastifyCorsOptions>} CorsOptions
 */

/**
 * Registers and configures the CORS plugin
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {CorsOptions} [options] - CORS configuration options
 */
export async function registerCors(server, options) {
  const params = {
    origin: true,
    credentials: true,
    ...options,
  }

  await server.register(cors, params)
}
