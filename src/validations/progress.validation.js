import Joi from "joi";

export const markLessonSchema = Joi.object({
  courseId: Joi.string().required(),
  lessonId: Joi.string().required(),
  completed: Joi.boolean().default(true), // mark complete/uncomplete
});

export const completeCourseSchema = Joi.object({
  courseId: Joi.string().required(),
});
