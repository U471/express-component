/**
 * Centralized Swagger Docs for Lessons, Enrollments, Progress, Quizzes
 */

export const lessonDocs = {
  "/lessons": {
    post: {
      summary: "Create a lesson",
      tags: ["Lessons"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Lesson" },
          },
        },
      },
      responses: {
        201: { description: "Lesson created successfully" },
      },
    },
  },
  "/lessons/{id}": {
    put: {
      summary: "Update lesson",
      tags: ["Lessons"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Lesson updated" },
      },
    },
    delete: {
      summary: "Delete lesson",
      tags: ["Lessons"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Lesson deleted" },
      },
    },
  },
  "/lessons/reorder/{courseId}": {
    put: {
      summary: "Reorder lessons of a course",
      tags: ["Lessons"],
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: "courseId", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                lessons: { type: "array", items: { type: "string" } },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Lessons reordered" },
      },
    },
  },
  "/lessons/{courseId}": {
    get: {
      summary: "Get lessons of a course",
      tags: ["Lessons"],
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: "courseId", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: {
          description: "List of lessons",
          content: {
            "application/json": {
              schema: { type: "array", items: { $ref: "#/components/schemas/Lesson" } },
            },
          },
        },
      },
    },
  },
};

// 🔹 Enrollments
export const enrollmentDocs = {
  "/enrollments": {
    post: {
      summary: "Enroll in a course",
      tags: ["Enrollments"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: { type: "object", properties: { courseId: { type: "string" } } },
          },
        },
      },
      responses: {
        201: { description: "Enrolled successfully" },
      },
    },
  },
  "/enrollments/me": {
    get: {
      summary: "Get my enrollments",
      tags: ["Enrollments"],
      security: [{ bearerAuth: [] }],
      responses: { 200: { description: "List of enrolled courses" } },
    },
  },
  "/enrollments/course/{courseId}": {
    get: {
      summary: "View enrolled students of a course",
      tags: ["Enrollments"],
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "courseId", in: "path", required: true, schema: { type: "string" } }],
      responses: { 200: { description: "List of students" } },
    },
  },
  "/enrollments/unenroll": {
    post: {
      summary: "Unenroll from a course",
      tags: ["Enrollments"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: { type: "object", properties: { courseId: { type: "string" } } },
          },
        },
      },
      responses: { 200: { description: "Unenrolled successfully" } },
    },
  },
};

// 🔹 Progress
export const progressDocs = {
  "/progress/mark": {
    post: {
      summary: "Mark lesson completed",
      tags: ["Progress"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                courseId: { type: "string" },
                lessonId: { type: "string" },
                completed: { type: "boolean" },
              },
            },
          },
        },
      },
      responses: { 200: { description: "Progress updated" } },
    },
  },
  "/progress/course/{courseId}": {
    get: {
      summary: "Get my progress for a course",
      tags: ["Progress"],
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "courseId", in: "path", required: true, schema: { type: "string" } }],
      responses: {
        200: {
          description: "Progress details",
          content: { "application/json": { schema: { $ref: "#/components/schemas/Progress" } } },
        },
      },
    },
  },
  "/progress/certificate": {
    post: {
      summary: "Issue certificate",
      tags: ["Progress"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                courseId: { type: "string" },
                certificateUrl: { type: "string" },
              },
            },
          },
        },
      },
      responses: { 200: { description: "Certificate issued" } },
    },
  },
};

// 🔹 Quizzes
export const quizDocs = {
  "/quizzes": {
    post: {
      summary: "Create quiz for a lesson",
      tags: ["Quizzes"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                lessonId: { type: "string" },
                question: { type: "string" },
                options: { type: "array", items: { type: "string" } },
                correctAnswer: { type: "number" },
              },
            },
          },
        },
      },
      responses: { 201: { description: "Quiz created" } },
    },
  },
  "/quizzes/{id}": {
    put: {
      summary: "Update quiz",
      tags: ["Quizzes"],
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "id", in: "path", schema: { type: "string" } }],
      responses: { 200: { description: "Quiz updated" } },
    },
    delete: {
      summary: "Delete quiz",
      tags: ["Quizzes"],
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "id", in: "path", schema: { type: "string" } }],
      responses: { 200: { description: "Quiz deleted" } },
    },
  },
  "/quizzes/lesson/{lessonId}": {
    get: {
      summary: "Get quiz for a lesson",
      tags: ["Quizzes"],
      parameters: [{ name: "lessonId", in: "path", schema: { type: "string" } }],
      responses: {
        200: { description: "Quiz details", content: { "application/json": { schema: { $ref: "#/components/schemas/Quiz" } } } },
      },
    },
  },
  "/quizzes/{id}/submit": {
    post: {
      summary: "Submit quiz answers",
      tags: ["Quizzes"],
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "id", in: "path", schema: { type: "string" } }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: { answers: { type: "array", items: { type: "number" } } },
            },
          },
        },
      },
      responses: { 200: { description: "Quiz submitted" } },
    },
  },
  "/quizzes/{quizId}/submissions": {
    get: {
      summary: "Get quiz submissions",
      tags: ["Quizzes"],
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "quizId", in: "path", schema: { type: "string" } }],
      responses: { 200: { description: "List of submissions" } },
    },
  },
};
