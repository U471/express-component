import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { allowRole } from "../middlewares/allowRole.js";
import validate from "../middlewares/validate.js";
import * as quizController from "../controllers/quiz.controller.js";
import { createQuizSchema, submitQuizSchema } from "../validations/quiz.validation.js";

const router = Router();

// instructor/admin manage quizzes
router.post("/", auth, allowRole("admin", "instructor"), validate(createQuizSchema), quizController.createQuiz);
router.put("/:id", auth, allowRole("admin", "instructor"), quizController.updateQuiz);
router.delete("/:id", auth, allowRole("admin", "instructor"), quizController.deleteQuiz);

// get quiz for lesson (enrolled users)
router.get("/lesson/:lessonId", auth, quizController.getQuizByLesson);

// student submit answers
router.post("/:id/submit", auth, validate(submitQuizSchema), quizController.submitQuiz);

// instructor view submissions
router.get("/:quizId/submissions", auth, allowRole("admin", "instructor"), quizController.getSubmissions);

export default router;
