# Fastify API Template with TypeScript and Biome

A modern Fastify API template that provides a robust foundation for building scalable web services. This template comes with a comprehensive set of pre-configured plugins and utilities that can be easily customized through a global configuration object when creating the server.

## Features

- **Type Safety**: Built with TypeScript for enhanced developer experience and code reliability
- **Modern Tooling**: Uses Biome for fast, consistent code linting and formatting
- **Development Ready**: Hot reload support for rapid development
- **Production Optimized**: Includes essential security, monitoring, and performance features
- **Flexible Configuration**: All plugins can be configured through a single configuration object
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

## Prerequisites

- Node.js
- npm, pnpm, or yarn

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm run dev
```

3. Build for production:
```bash
pnpm run build
```

4. Start the production server:
```bash
pnpm start
```
