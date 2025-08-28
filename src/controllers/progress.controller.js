import * as progressService from "../services/progress.service.js";
import {asyncHandler} from "../middlewares/asyncHandler.js";

export const markLesson = asyncHandler(async (req, res) => {
  const progress = await progressService.markLesson(req.user, req.body);
  res.json({ success: true, data: progress });
});

export const getMyProgress = asyncHandler(async (req, res) => {
  const progress = await progressService.getProgressForUserCourse(req.user, req.params.courseId);
  res.json({ success: true, data: progress });
});

export const issueCertificate = asyncHandler(async (req, res) => {
  // certificateUrl could be generated server-side; accepting optional url
  const progress = await progressService.issueCertificate(req.user, req.body.courseId, req.body.certificateUrl || "");
  res.json({ success: true, data: progress });
});
