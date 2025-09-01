import { Enrollment } from "../models/Enrollment.js";
import { Course } from "../models/Course.js";
import { Progress } from "../models/Progress.js";
import { Forbidden, NotFoundErr, Conflict } from "../utils/AppError.js";

export const enroll = async (user, courseId) => {
  if (user.role !== "student" && user.role !== "admin") {
    throw Forbidden("Only students can enroll in courses");
  }

  const course = await Course.findById(courseId);
  if (!course) throw NotFoundErr("Course not found");
  if (!course.published) throw Forbidden("Course is not published");

  const already = await Enrollment.findOne({ course: courseId, student: user.id });
  if (already) throw Conflict("Already enrolled in this course");

  const enrollment = await Enrollment.create({ course: courseId, student: user.id });

  // create initial progress doc if not exists
  const existingProgress = await Progress.findOne({ user: user.id, course: courseId });
  if (!existingProgress) {
    await Progress.create({ user: user.id, course: courseId, completedLessons: [], percent: 0 });
  }

  return enrollment;
};

export const getMyEnrollments = async (user) => {
  return Enrollment.find({ student: user.id }).populate("course");
};

export const getCourseEnrollments = async (user, courseId) => {
  const course = await Course.findById(courseId);
  if (!course) throw NotFoundErr("Course not found");

  // only instructor of course or admin can view all enrollments for that course
  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to view enrollments for this course");
  }

  return Enrollment.find({ course: courseId }).populate("student", "name email");
};

export const unenroll = async (user, courseId) => {
  const enrollment = await Enrollment.findOne({ course: courseId, student: user.id });
  if (!enrollment) throw NotFoundErr("Enrollment not found");

  await enrollment.deleteOne();
  await Progress.deleteOne({ user: user.id, course: courseId }); // optional: remove progress
};
