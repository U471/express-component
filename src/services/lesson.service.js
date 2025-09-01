import { Lesson } from "../models/Lesson.js";
import { Course } from "../models/Course.js";
import { Forbidden, NotFoundErr, BadRequest } from "../utils/AppError.js";

export const createLesson = async (user, data) => {
  const course = await Course.findById(data.course);
  if (!course) throw NotFoundErr("Course not found");
  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Only course instructor or admin can add lessons");
  }
  const lesson = await Lesson.create(data);
  return lesson;
};

export const updateLesson = async (user, lessonId, data) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) throw NotFoundErr("Lesson not found");

  const course = await Course.findById(lesson.course);
  if (!course) throw NotFoundErr("Course not found");

  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to update this lesson");
  }

  Object.assign(lesson, data);
  await lesson.save();
  return lesson;
};

export const deleteLesson = async (user, lessonId) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) throw NotFoundErr("Lesson not found");

  const course = await Course.findById(lesson.course);
  if (!course) throw NotFoundErr("Course not found");

  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to delete this lesson");
  }

  await lesson.deleteOne();
};

export const getLessonsByCourse = async (courseId) => {
  return Lesson.find({ course: courseId }).sort({ order: 1 });
};

// reorder: lessonsOrder = [lessonId1, lessonId2, ...]
export const reorderLessons = async (user, courseId, lessonsOrder = []) => {
  const course = await Course.findById(courseId);
  if (!course) throw NotFoundErr("Course not found");

  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to reorder lessons");
  }

  if (!Array.isArray(lessonsOrder) || lessonsOrder.length === 0) {
    throw BadRequest("lessonsOrder must be a non-empty array of lesson IDs");
  }

  // Update order using Promise.all for concurrency
  await Promise.all(
    lessonsOrder.map((lessonId, index) =>
      Lesson.findByIdAndUpdate(lessonId, { order: index }, { new: true })
    )
  );

  return Lesson.find({ course: courseId }).sort({ order: 1 });
};
