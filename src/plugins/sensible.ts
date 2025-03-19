import sensible from '@fastify/sensible'
import type { FastifyInstance } from 'fastify'

/**
 * Registers the sensible plugin which adds many useful utilities
 * @param server - The Fastify server instance
 */
export async function registerSensible(server: FastifyInstance): Promise<void> {
  await server.register(sensible)
}
