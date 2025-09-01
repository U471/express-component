import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { allowRole } from "../middlewares/allowRole.js";
import * as courseController from "../controllers/course.controller.js";
import validate from "../middlewares/validate.js";
import { createCourseSchema } from "../validations/course.validation.js";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management APIs
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course (Instructor only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: React Basics
 *               description:
 *                 type: string
 *                 example: Learn React from scratch
 *               category:
 *                 type: string
 *                 example: Web Development
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *                 example: beginner
 *               price:
 *                 type: number
 *                 example: 49.99
 *               syllabus:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     week:
 *                       type: number
 *                       example: 1
 *                     topic:
 *                       type: string
 *                       example: Introduction
 *                     content:
 *                       type: string
 *                       example: Getting started with React
 *     responses:
 *       201:
 *         description: Course created successfully
 *       403:
 *         description: Only instructors or admins can create courses
 */
router.post("/", auth, allowRole("admin", "instructor"), validate(createCourseSchema), courseController.createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course (Instructor only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Advanced React
 *               description:
 *                 type: string
 *                 example: Deep dive into React
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       403:
 *         description: Not authorized to update this course
 *       404:
 *         description: Course not found
 */
router.put("/:id", auth, allowRole("admin", "instructor"), courseController.updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course (Instructor only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       403:
 *         description: Not authorized to delete this course
 *       404:
 *         description: Course not found
 */
router.delete("/:id", auth, allowRole("admin", "instructor"), courseController.deleteCourse);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get list of courses (with filters)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword in title or description
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Course category filter
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         description: Course difficulty level
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get("/", auth, allowRole("admin", "instructor", "student"), courseController.listCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get course details by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 */
router.get("/:id", auth, allowRole("admin", "instructor", "student"), courseController.getCourse);

export default router;
