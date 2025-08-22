// src/swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation for my Express project",
    },
    servers: [
      {
        url: "http://localhost:4000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

  },
  apis: ["./src/routes/*.js"], // routes ke files se docs read karega
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", serve, setup(swaggerSpec));
};

export default swaggerDocs;
