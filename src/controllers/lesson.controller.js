import * as lessonService from "../services/lesson.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// instructor/admin only
export const createLesson = asyncHandler(async (req, res) => {
    const lesson = await lessonService.createLesson(req.user, req.body);
    res.status(201).json({ success: true, data: lesson });
});

export const updateLesson = asyncHandler(async (req, res) => {
    const lesson = await lessonService.updateLesson(req.user, req.params.id, req.body);
    res.json({ success: true, data: lesson });
});

export const deleteLesson = asyncHandler(async (req, res) => {
    await lessonService.deleteLesson(req.user, req.params.id);
    res.json({ success: true, message: "Lesson deleted" });
});

export const getLessonsByCourse = asyncHandler(async (req, res) => {
    const lessons = await lessonService.getLessonsByCourse(req.params.courseId);
    res.json({ success: true, data: lessons });
});

export const reorderLessons = asyncHandler(async (req, res) => {
    const lessons = await lessonService.reorderLessons(req.user, req.params.courseId, req.body.lessonsOrder);
    res.json({ success: true, data: lessons });
});
