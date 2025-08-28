import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { allowRole } from "../middlewares/allowRole.js";
import validate from "../middlewares/validate.js";
import {
  createLessonSchema,
  updateLessonSchema,
} from "../validations/lesson.validation.js";
import * as lessonController from "../controllers/lesson.controller.js";

const router = Router();

// Create / update / delete / reorder => instructor or admin
router.post("/", auth, allowRole("admin", "instructor"), validate(createLessonSchema), lessonController.createLesson);
router.put("/:id", auth, allowRole("admin", "instructor"), validate(updateLessonSchema), lessonController.updateLesson);
router.delete("/:id", auth, allowRole("admin", "instructor"), lessonController.deleteLesson);
router.put("/reorder/:courseId", auth, allowRole("admin", "instructor"), lessonController.reorderLessons);

// Students & instructors can view lessons for a course (auth required)
router.get("/:courseId", auth, allowRole("admin", "instructor","student"), lessonController.getLessonsByCourse);

export default router;
