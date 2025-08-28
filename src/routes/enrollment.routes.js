import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { allowRole } from "../middlewares/allowRole.js";
import validate from "../middlewares/validate.js";
import * as enrollmentController from "../controllers/enrollment.controller.js";
import { enrollSchema, unenrollSchema } from "../validations/enrollment.validation.js";

const router = Router();

// Student enroll
router.post("/", auth, allowRole("student", "admin"), validate(enrollSchema), enrollmentController.enroll);

// Student view own enrollments
router.get("/me", auth, allowRole("student", "instructor", "admin"), enrollmentController.myEnrollments);

// Instructor or admin: view enrollments for a course
router.get("/course/:courseId", auth, allowRole("admin", "instructor"), enrollmentController.courseEnrollments);

// Unenroll
router.post("/unenroll", auth, allowRole("student", "admin"), validate(unenrollSchema), enrollmentController.unenroll);

export default router;
