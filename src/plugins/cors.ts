import type { FastifyCorsOptions } from '@fastify/cors'
import cors from '@fastify/cors'
import type { FastifyInstance } from 'fastify'

export type CorsOptions = Partial<FastifyCorsOptions>

/**
 * Registers and configures the CORS plugin
 * @param server - The Fastify server instance
 * @param options - CORS configuration options
 */
export async function registerCors(
  server: FastifyInstance,
  options?: CorsOptions,
): Promise<void> {
  const params: FastifyCorsOptions = {
    origin: true,
    credentials: true,
    ...options,
  }

  await server.register(cors, params)
}
