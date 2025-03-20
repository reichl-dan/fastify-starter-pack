import * as config from '../config'
import cookie from '@fastify/cookie'
import type { FastifyCookieOptions } from '@fastify/cookie'
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
  const params: FastifyCookieOptions = {
    secret: config.cookieSecret,
    hook: 'onRequest',
    parseOptions: {
      secure: config.isProduction,
      httpOnly: true,
      sameSite: 'lax',
      ...options?.parseOptions,
    },
    ...options,
  }

  await server.register(cookie, params)
}
