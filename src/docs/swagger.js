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
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import swaggerUiDist from "swagger-ui-dist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  // Serve swagger.json endpoint (for UI to fetch spec)
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Serve Swagger UI HTML manually
  const swaggerUiAssetPath = swaggerUiDist.getAbsoluteFSPath();
  const swaggerHtml = readFileSync(
    join(swaggerUiAssetPath, "index.html"),
    "utf-8"
  ).replace("https://petstore.swagger.io/v2/swagger.json", "/swagger.json");

  app.use("/api-docs", swaggerUi.serve);
  app.get("/api-docs", (req, res) => res.send(swaggerHtml));
};

export default swaggerDocs;
