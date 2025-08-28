import * as quizService from "../services/quiz.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const createQuiz = asyncHandler(async (req, res) => {
    const quiz = await quizService.createQuiz(req.user, {
        lessonId: req.body.lessonId,
        title: req.body.title,
        questions: req.body.questions
    });
    res.status(201).json({ success: true, data: quiz });
});

export const updateQuiz = asyncHandler(async (req, res) => {
    const quiz = await quizService.updateQuiz(req.user, req.params.id, req.body);
    res.json({ success: true, data: quiz });
});

export const deleteQuiz = asyncHandler(async (req, res) => {
    await quizService.deleteQuiz(req.user, req.params.id);
    res.json({ success: true, message: "Quiz deleted" });
});

export const getQuizByLesson = asyncHandler(async (req, res) => {
    const quiz = await quizService.getQuizByLesson(req.params.lessonId);
    res.json({ success: true, data: quiz });
});

export const submitQuiz = asyncHandler(async (req, res) => {
    const submission = await quizService.submitQuiz(req.user, req.params.id, req.body.answers);
    res.status(201).json({ success: true, data: submission });
});

export const getSubmissions = asyncHandler(async (req, res) => {
    const subs = await quizService.getSubmissions(req.user, req.params.quizId);
    res.json({ success: true, data: subs });
});
