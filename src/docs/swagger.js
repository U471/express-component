// // src/swagger.js
// import swaggerJsDoc from "swagger-jsdoc";
// import { serve, setup } from "swagger-ui-express";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My Express API",
//       version: "1.0.0",
//       description: "API documentation for my Express project",
//     },
//     servers: [
//       {
//         url: process.env.BASE_URL || "http://localhost:4000/api/v1",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//   },
//   apis: ["./src/routes/*.js"],
// };
// const swaggerSpec = swaggerJsDoc(options);

// const swaggerDocs = (app) => {
//   app.use("/api-docs", serve, setup(swaggerSpec, { explorer: true }));
// };

// export default swaggerDocs;

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:4000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css", // ✅ force load CSS
    })
  );
};

export default swaggerDocs;

