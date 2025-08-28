import * as enrollmentService from "../services/enrollment.service.js";
import {asyncHandler} from "../middlewares/asyncHandler.js";

export const enroll = asyncHandler(async (req, res) => {
  const enrollment = await enrollmentService.enroll(req.user, req.body.courseId);
  res.status(201).json({ success: true, data: enrollment });
});

export const myEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await enrollmentService.getMyEnrollments(req.user);
  res.json({ success: true, data: enrollments });
});

export const courseEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await enrollmentService.getCourseEnrollments(req.user, req.params.courseId);
  res.json({ success: true, data: enrollments });
});

export const unenroll = asyncHandler(async (req, res) => {
  await enrollmentService.unenroll(req.user, req.body.courseId);
  res.json({ success: true, message: "Unenrolled successfully" });
});
