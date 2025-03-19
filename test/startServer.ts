import type { FastifyInstance } from 'fastify'
import { type ServerOptions, createServer } from '../src'

export async function startServer(options?: ServerOptions): Promise<FastifyInstance> {
  const server = await createServer(options)
  await server.listen({ port: 3000 })
  return server
}

// Start server if this file is run directly
if (require.main === module) {
  startServer()
    .then((server) => {
      const addresses = server.addresses()
      console.log('Server started successfully!')
      console.log('Listening on:', addresses)

      if (process.env.NODE_ENV === 'development') {
        console.log('\nSwagger UI available at: http://localhost:3000/docs')
      }
    })
    .catch((err) => {
      console.error('Failed to start server:', err)
      process.exit(1)
    })
}
