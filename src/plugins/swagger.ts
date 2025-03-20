import fp from 'fastify-plugin'
import swagger, { type FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import swaggerUi, { type FastifySwaggerUiOptions } from '@fastify/swagger-ui'
import type { FastifyInstance } from 'fastify'

export interface SwaggerOptions {
  /**
   * OpenAPI document info
   */
  info?: {
    title?: string
    description?: string
    version?: string
  }
  /**
   * Route prefix for Swagger UI
   */
  routePrefix?: string
}

/**
 * Defines the Swagger plugin configuration
 */
async function defineSwaggerPlugin(
  server: FastifyInstance,
  options: SwaggerOptions = {},
): Promise<void> {
  const swaggerOptions: FastifyDynamicSwaggerOptions = {
    swagger: {
      info: {
        title: options.info?.title ?? 'API Documentation',
        description:
          options.info?.description ?? 'API documentation powered by Swagger',
        version: options.info?.version ?? '1.0.0',
      },
    },
  }

  const swaggerUiOptions: FastifySwaggerUiOptions = {
    routePrefix: options.routePrefix ?? '/docs',
  }

  await server.register(swagger, swaggerOptions)
  await server.register(swaggerUi, swaggerUiOptions)
}

/**
 * Wraps the Swagger plugin into fastify
 */
const swaggerPlugin = fp(defineSwaggerPlugin, {
  name: '@fastify-core/swagger',
  dependencies: ['@fastify-core/logger'],
})

/**
 * Registers the Swagger plugin
 * @param server - The Fastify server instance
 * @param options - Swagger configuration options
 */
export async function registerSwagger(
  server: FastifyInstance,
  options?: SwaggerOptions,
): Promise<void> {
  await server.register(swaggerPlugin, options ?? {})
}
