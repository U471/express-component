import Joi from "joi";

export const createCourseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  level: Joi.string().valid("beginner", "intermediate", "advanced"),
  price: Joi.number().min(0),
  syllabus: Joi.array().items(
    Joi.object({
      week: Joi.number().required(),
      topic: Joi.string().required(),
      content: Joi.string().required(),
    })
  ),
});
