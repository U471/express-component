import Joi from "joi";

const questionSchema = Joi.object({
  question: Joi.string().required(),
  options: Joi.array().items(Joi.string().required()).min(2).required(),
  correctOption: Joi.number().integer().min(0).required()
});

export const createQuizSchema = Joi.object({
  lessonId: Joi.string().required(),
  title: Joi.string().required(),
  questions: Joi.array().items(questionSchema).min(1).required()
});

export const submitQuizSchema = Joi.object({
  answers: Joi.array().items(
    Joi.object({
      questionId: Joi.string().required(),
      selectedOption: Joi.number().required()
    })
  ).min(1).required()
});
