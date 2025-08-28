import Joi from "joi";

export const createLessonSchema = Joi.object({
  courseId: Joi.string().required(),
  title: Joi.string().required(),
  type: Joi.string().valid("video", "pdf", "quiz").required(),
  contentUrl: Joi.string().uri().required(),
  order: Joi.number().default(0),
});

export const updateLessonSchema = Joi.object({
  title: Joi.string(),
  type: Joi.string().valid("video", "pdf", "quiz"),
  contentUrl: Joi.string().uri(),
  order: Joi.number()
});
