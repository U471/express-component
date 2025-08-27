// utils/allowRole.js
import { Forbidden } from "../utils/AppError.js";

// roles ek array hoga jisme allowed roles ayenge
export const allowRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(Forbidden("You are not authorized to access this resource"));
    }
    next();
  };
};
