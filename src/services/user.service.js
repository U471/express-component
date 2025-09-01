import { User } from '../models/User.js';
import { NotFoundErr, BadRequest } from "../utils/AppError.js";

export const findUserByEmail = (email) => User.findOne({ email });
export const createUser = (data) => User.create(data);
export const getUserById = (id) => User.findById(id).select('-password');

// Update profile
export const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-password");
  if (!user) throw NotFoundErr("User not found");
  return user;
};

// Change password
export const changePassword = async (id, { oldPassword, newPassword }) => {
  const user = await User.findById(id);
  if (!user) throw NotFoundErr("User not found");

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) throw BadRequest("Old password is incorrect");

  user.password = newPassword; // ✅ pre-save hook will hash it
  await user.save();
};
