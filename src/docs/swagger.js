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


//old version

// import swaggerJsDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import { readFileSync } from "fs";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";
// import swaggerUiDist from "swagger-ui-dist";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My Express API",
//       version: "1.0.0",
//       description: "API documentation",
//     },
//     servers: [
//       {
//         url: process.env.BASE_URL || "http://localhost:4000/api/v1",
//       },
//     ],
//   },
//   apis: ["./src/routes/*.js"],
// };

// const swaggerSpec = swaggerJsDoc(options);

// const swaggerDocs = (app) => {
//   // Serve swagger.json endpoint
//   app.get("/swagger.json", (req, res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.send(swaggerSpec);
//   });

//   const swaggerUiAssetPath = swaggerUiDist.getAbsoluteFSPath();

//   // Override swagger-initializer.js to point to /swagger.json
//   app.get("/api-docs/swagger-initializer.js", (req, res) => {
//     res.type("application/javascript");
//     res.send(`window.onload = function() {
//       window.ui = SwaggerUIBundle({
//         url: '/swagger.json',
//         dom_id: '#swagger-ui',
//         presets: [
//           SwaggerUIBundle.presets.apis,
//           SwaggerUIStandalonePreset
//         ],
//         layout: "StandaloneLayout"
//       });
//     }`);
//   });

//   // Serve Swagger UI static files
//   app.use("/api-docs", swaggerUi.serve, (req, res, next) => {
//     if (req.path === "/") {
//       const html = readFileSync(
//         join(swaggerUiAssetPath, "index.html"),
//         "utf-8"
//       );
//       res.send(html);
//     } else {
//       next();
//     }
//   });
// };

// export default swaggerDocs;

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
        url: process.env.APP_URL || "http://localhost:4000/api/v1",
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
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "64d1234abcd5678ef90a12cd" },
            name: { type: "string", example: "Usama Tahir" },
            email: { type: "string", example: "usama@example.com" },
            role: { type: "string", example: "student" },
            avatar: { type: "string", example: "https://example.com/avatar.png" },
            bio: { type: "string", example: "Web developer and instructor" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string", example: "eyJhbGciOi..." },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        Course: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64d5678abcd1234ef90a12cd" },
            title: { type: "string", example: "React Basics" },
            description: { type: "string", example: "Learn React from scratch" },
            category: { type: "string", example: "Web Development" },
            level: {
              type: "string",
              enum: ["beginner", "intermediate", "advanced"],
              example: "beginner"
            },
            price: { type: "number", example: 49.99 },
            instructor: {
              type: "object",
              properties: {
                _id: { type: "string", example: "64d1111abcd5678ef90a12aa" },
                name: { type: "string", example: "Ali Instructor" },
                email: { type: "string", example: "ali@course.com" },
              },
            },
            syllabus: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  week: { type: "number", example: 1 },
                  topic: { type: "string", example: "Introduction" },
                  content: { type: "string", example: "Getting started with React" },
                },
              },
            },
            published: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time", example: "2025-08-26T10:00:00Z" },
            updatedAt: { type: "string", format: "date-time", example: "2025-08-26T10:05:00Z" },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Users", description: "User management APIs" },
      { name: "Dashboard", description: "Dashboard related APIs" },
      { name: "Courses", description: "Course management APIs" },
    ],
  },
  apis: ["./src/routes/*.js"], // routes se docs
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  // swagger.json expose karna (Postman ya frontend ke liye)
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Swagger UI serve
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
    })
  );
};

export default swaggerDocs;


