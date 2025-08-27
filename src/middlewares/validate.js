import { BadRequest } from "../utils/AppError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(
        BadRequest("Validation failed", {
          errors: error.details.map((d) => d.message),
        })
      );
    }
    next();
  };
};

export default validate;
