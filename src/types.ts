import type { FastifyInstance } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    start: () => Promise<void>
  }
}
