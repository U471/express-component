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
  // Serve swagger.json endpoint
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  const swaggerUiAssetPath = swaggerUiDist.getAbsoluteFSPath();

  // Override swagger-initializer.js to point to /swagger.json
  app.get("/api-docs/swagger-initializer.js", (req, res) => {
    res.type("application/javascript");
    res.send(`window.onload = function() {
      window.ui = SwaggerUIBundle({
        url: '/swagger.json',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout"
      });
    }`);
  });

  // Serve Swagger UI static files
  app.use("/api-docs", swaggerUi.serve, (req, res, next) => {
    if (req.path === "/") {
      const html = readFileSync(
        join(swaggerUiAssetPath, "index.html"),
        "utf-8"
      );
      res.send(html);
    } else {
      next();
    }
  });
};

export default swaggerDocs;

