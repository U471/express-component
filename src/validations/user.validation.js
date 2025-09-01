import Joi from "joi";

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  bio: Joi.string().max(200).optional(),
  avatar: Joi.string().uri().optional(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});
