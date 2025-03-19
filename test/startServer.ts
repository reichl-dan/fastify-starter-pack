import type { FastifyInstance } from 'fastify'
import { type ServerOptions, createServer } from '../src'

export async function startServer(options?: ServerOptions): Promise<FastifyInstance> {
  const server = await createServer(options)
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
