import swaggerJsdoc from "swagger-jsdoc"
import path from 'path'
import { fileURLToPath } from 'url'

import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const hostName = process.env.API_URL;

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Management Portal API",
      version: "1.0.0",
      description: "This is the API documentation for Product management web-application.",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
    },
    servers: [
      {
        url: hostName
      },
    ],
  },
  apis: [path.join(__dirname, './routes/**/*.js')]
};

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;