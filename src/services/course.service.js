import { Course } from "../models/Course.js";
import { Forbidden, NotFoundErr } from "../utils/AppError.js";

// Create Course (Instructor only)
export const createCourse = async (user, data) => {
  if (user.role !== "instructor" && user.role !== "admin") {
    throw Forbidden("Only instructors can create courses");
  }

  const course = await Course.create({
    ...data,
    instructor: user.id,
  });

  return course;
};

// Update Course (Instructor only)
export const updateCourse = async (user, courseId, data) => {
  const course = await Course.findById(courseId);
  if (!course) throw NotFoundErr("Course not found");

  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to update this course");
  }

  Object.assign(course, data);
  await course.save();
  return course;
};

// Delete Course (Instructor only)
export const deleteCourse = async (user, courseId) => {
  const course = await Course.findById(courseId);
  if (!course) throw NotFoundErr("Course not found");

  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to delete this course");
  }

  await course.deleteOne();
};

// List Courses (Search + Filters)
export const listCourses = async (filters) => {
  return Course.searchCourses(filters);
};

// Get Course Details
export const getCourseById = async (id) => {
  const course = await Course.findById(id).populate("instructor", "name email");
  if (!course) throw NotFoundErr("Course not found");
  return course;
};
