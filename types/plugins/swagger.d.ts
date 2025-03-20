export interface SwaggerOptions {
  /** Information about the API */
  info?: {
    /** API title */
    title?: string
    /** API description */
    description?: string
    /** API version */
    version?: string
  }
  /** Route prefix for Swagger UI */
  routePrefix?: string
}
