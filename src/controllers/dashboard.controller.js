import { asyncHandler } from '../middlewares/asyncHandler.js';
import { getUserById } from '../services/user.service.js';

export const getDashboard = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user.id);
  res.json({
    success: true,
    user,
    stats: {
      notifications: 3,
      messages: 1,
      lastLoginAt: new Date()
    }
  });
});
