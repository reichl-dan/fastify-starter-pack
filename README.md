# Fastify Core Plugin

A comprehensive Fastify plugin that combines essential plugins and utilities commonly required for API development. This plugin provides a robust foundation for building scalable web services with a single registration. All included plugins can be easily customized through a global configuration object.

## Features

- **Plugin Collection**: Combines essential Fastify plugins into a single, easy-to-use package
- **Type Safety**: Built with TypeScript for enhanced developer experience and code reliability
- **Modern Tooling**: Uses Biome for fast, consistent code linting and formatting
- **Production Ready**: Includes essential security, monitoring, and performance features
- **Flexible Configuration**: All bundled plugins can be configured through a single configuration object
- **API Documentation**: Automatic Swagger/OpenAPI documentation in development mode

## Included Plugins

### Official Fastify Plugins
- `@fastify/cors`: Configurable CORS support
- `@fastify/helmet`: Security headers for protection against common web vulnerabilities
- `@fastify/cookie`: Cookie parsing and serialization
- `@fastify/rate-limit`: Request rate limiting for API protection
- `@fastify/sensible`: Adds useful utilities and HTTP helpers
- `@fastify/swagger` & `@fastify/swagger-ui`: API documentation (development mode only)

### Custom Plugins
- **Logger Plugin**: Enhanced logging with request tracking and pretty printing in development
- **Monitoring Plugin**: Request duration tracking and performance monitoring
- **Error Handler**: Standardized error responses with validation support
- **Server Start Plugin**: Graceful server startup/shutdown with environment-based configuration
- **Health Check**: Built-in health check endpoint for monitoring

## Installation

```bash
npm install @fastify/core
# or
pnpm add @fastify/core
# or
yarn add @fastify/core
```

## Usage

### Basic Usage

The simplest way to use the plugin:

```typescript
import fastify from 'fastify'
import fastifyCore from '@fastify/core'

async function startServer() {
  const server = fastify()
  await server.register(fastifyCore)
  await server.start()
  return server
}
```

### Configuring Plugins

All bundled plugins can be configured through an options object when registering the core plugin:

```typescript
await server.register(fastifyCore, {
  // Configure CORS
  cors: {
    origin: ['https://your-domain.com'],
    credentials: true
  },
  // Configure rate limiting
  rateLimit: {
    max: 100,
    timeWindow: '1 minute'
  },
  // Configure custom health check response
  healthCheck: {
    status: 'ok',
    version: '1.0.0'
  }
})
```

The server will use default configurations if no options are provided. You can override any plugin's configuration by passing the appropriate options object.
