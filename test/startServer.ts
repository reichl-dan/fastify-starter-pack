import fastify from 'fastify'
import type { FastifyInstance } from 'fastify'
import corePlugin from '../src'
import type { FastifyCoreOptions } from '../src'

export async function startServer(
  options: FastifyCoreOptions = {},
): Promise<FastifyInstance> {
  const server = fastify()
  await server.register(corePlugin, options)
  await server.start()
  return server
}

// Start server if this file is run directly
if (require.main === module) {
  startServer()
    .then((server) => {
      const addresses = server.addresses()
      console.log('🚀 Server running on:', addresses)

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `🔍 Swagger UI available at: http://localhost:${addresses[0].port}/docs\n`,
        )
      }
    })
    .catch((err) => {
      console.error('Failed to start server:', err)
      process.exit(1)
    })
}
