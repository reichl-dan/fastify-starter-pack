import type { FastifyHelmetOptions } from '@fastify/helmet'
import helmet from '@fastify/helmet'
import type { FastifyInstance } from 'fastify'

export type HelmetOptions = Partial<FastifyHelmetOptions>

/**
 * Registers and configures the helmet plugin for security headers
 * @param server - The Fastify server instance
 * @param options - Helmet configuration options
 */
export async function registerHelmet(
  server: FastifyInstance,
  options?: HelmetOptions,
): Promise<void> {
  const config: FastifyHelmetOptions = {
    global: true,
    ...options,
  }

  await server.register(helmet, config)
}
