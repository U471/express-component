import Joi from "joi";

export const enrollSchema = Joi.object({
  courseId: Joi.string().required(),
});

export const unenrollSchema = Joi.object({
  courseId: Joi.string().required(),
});
