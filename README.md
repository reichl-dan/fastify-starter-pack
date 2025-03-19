# Fastify API with TypeScript and Biome

A modern Fastify API project using TypeScript for type safety and Biome for linting and formatting.

## Features

- Fastify web framework
- TypeScript for type safety
- Biome for linting and formatting
- CORS enabled
- Development mode with hot reload
- Health check endpoint

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start the production server:
```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start the production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code using Biome
- `npm run check` - Run Biome check and apply fixes

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint

## Project Structure

```
.
├── src/
│   └── index.ts      # Main application entry point
├── dist/             # Compiled JavaScript files
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── biome.json        # Biome configuration
```
