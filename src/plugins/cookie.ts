import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import type { FastifyInstance } from 'fastify'

export type CookieOptions = Partial<FastifyCookieOptions>

/**
 * Registers and configures the cookie plugin
 * @param server - The Fastify server instance
 * @param options - Cookie configuration options
 */
export async function registerCookie(
  server: FastifyInstance,
  options?: CookieOptions,
): Promise<void> {
  const config: FastifyCookieOptions = {
    secret: process.env.COOKIE_SECRET || 'development-secret',
    hook: 'onRequest',
    parseOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      ...options?.parseOptions,
    },
    ...options,
  }

  await server.register(cookie, config)
}
