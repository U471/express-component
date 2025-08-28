import { Progress } from "../models/Progress.js";
import { Lesson } from "../models/Lesson.js";
import { Enrollment } from "../models/Enrollment.js";
import { Course } from "../models/Course.js";
import { NotFoundErr, Forbidden } from "../utils/AppError.js";

export const markLesson = async (user, { courseId, lessonId, completed = true }) => {
  // ensure user enrolled
  const enrollment = await Enrollment.findOne({ course: courseId, student: user.id });
  if (!enrollment) throw Forbidden("User is not enrolled in this course");

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) throw NotFoundErr("Lesson not found");

  if (lesson.course.toString() !== courseId.toString()) {
    throw Forbidden("Lesson does not belong to the provided course");
  }

  const totalLessons = await Lesson.countDocuments({ course: courseId });

  let progress = await Progress.findOne({ user: user.id, course: courseId });
  if (!progress) {
    progress = await Progress.create({ user: user.id, course: courseId, completedLessons: [], percent: 0 });
  }

  const already = progress.completedLessons.some((l) => l.toString() === lessonId.toString());

  if (completed && !already) {
    progress.completedLessons.push(lessonId);
  } else if (!completed && already) {
    progress.completedLessons = progress.completedLessons.filter((l) => l.toString() !== lessonId.toString());
  }

  progress.percent = totalLessons === 0 ? 0 : Math.round((progress.completedLessons.length / totalLessons) * 100);
  progress.completed = progress.percent === 100;

  await progress.save();
  return progress;
};

export const getProgressForUserCourse = async (user, courseId) => {
  const progress = await Progress.findOne({ user: user.id, course: courseId }).populate("completedLessons");
  if (!progress) throw NotFoundErr("Progress not found");
  return progress;
};

export const issueCertificate = async (user, courseId, certificateUrl = "") => {
  const course = await Course.findById(courseId);
  if (!course) throw NotFoundErr("Course not found");

  const progress = await Progress.findOne({ user: user.id, course: courseId });
  if (!progress) throw NotFoundErr("Progress not found");
  if (!progress.completed) throw Forbidden("Course not yet completed");

  progress.certificate = { issued: true, issuedAt: new Date(), url: certificateUrl };
  await progress.save();
  return progress;
};
