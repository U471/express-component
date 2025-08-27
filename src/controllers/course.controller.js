import * as courseService from "../services/course.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// Create Course (Instructor only)
export const createCourse = asyncHandler(async (req, res) => {
    const course = await courseService.createCourse(req.user, req.body);
    res.status(201).json({ success: true, data: course });
});

// Update Course (Instructor only)
export const updateCourse = asyncHandler(async (req, res) => {
    const course = await courseService.updateCourse(req.user, req.params.id, req.body);
    res.json({ success: true, data: course });
});

// Delete Course (Instructor only)
export const deleteCourse = asyncHandler(async (req, res) => {
    await courseService.deleteCourse(req.user, req.params.id);
    res.json({ success: true, message: "Course deleted successfully" });
});

// List Courses (with search + filters)
export const listCourses = asyncHandler(async (req, res) => {
    const courses = await courseService.listCourses(req.query);
    res.json({ success: true, data: courses });
});

// Get Course Details
export const getCourse = asyncHandler(async (req, res) => {
    const course = await courseService.getCourseById(req.params.id);
    res.json({ success: true, data: course });
});
