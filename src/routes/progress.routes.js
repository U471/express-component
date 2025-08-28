import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import * as progressController from "../controllers/progress.controller.js";
import { markLessonSchema, completeCourseSchema } from "../validations/progress.validation.js";

const router = Router();

// mark lesson complete/uncomplete
router.post("/mark", auth, validate(markLessonSchema), progressController.markLesson);

// get my progress for a course
router.get("/course/:courseId", auth, progressController.getMyProgress);

// issue certificate (student)
router.post("/certificate", auth, validate(completeCourseSchema), progressController.issueCertificate);

export default router;
