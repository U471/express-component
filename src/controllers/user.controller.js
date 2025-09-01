import * as userService from "../services/user.service.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';

// Get current user profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  res.json({ success: true, data: user });
});

// Update profile
export const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUser(req.user.id, req.body);
  res.json({ success: true, data: updatedUser });
});

// Change password
export const changePassword = asyncHandler(async (req, res) => {
  await userService.changePassword(req.user.id, req.body);
  res.json({ success: true, message: "Password updated successfully" });
});
