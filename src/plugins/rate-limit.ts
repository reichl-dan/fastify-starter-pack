import rateLimit from '@fastify/rate-limit'
import type { RateLimitOptions as FastifyRateLimitOptions } from '@fastify/rate-limit'
import type { FastifyInstance } from 'fastify'

export type RateLimitOptions = Partial<FastifyRateLimitOptions>

/**
 * Registers and configures the rate limit plugin
 * @param server - The Fastify server instance
 * @param options - Rate limit configuration options
 */
export async function registerRateLimit(
  server: FastifyInstance,
  options?: RateLimitOptions,
): Promise<void> {
  const params: FastifyRateLimitOptions = {
    max: 100,
    timeWindow: '1 minute',
    ...options,
  }

  await server.register(rateLimit, params)
}
