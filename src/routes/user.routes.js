import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import * as userController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "../validations/user.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64d1234abcd5678ef90a12cd
 *                     name:
 *                       type: string
 *                       example: Ali Khan
 *                     email:
 *                       type: string
 *                       example: ali@example.com
 *                     role:
 *                       type: string
 *                       example: student
 *                     avatar:
 *                       type: string
 *                       example: https://example.com/avatar.png
 *                     bio:
 *                       type: string
 *                       example: I love coding!
 */
router.get("/me", auth, userController.getProfile);

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Usama Tahir
 *               bio:
 *                 type: string
 *                 example: Web developer and instructor
 *               avatar:
 *                 type: string
 *                 example: https://example.com/avatar.png
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
router.put(
  "/update",
  auth,
  validate(updateProfileSchema),
  userController.updateProfile
);

/**
 * @swagger
 * /users/change-password:
 *   put:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: oldpassword123
 *               newPassword:
 *                 type: string
 *                 example: newpassword456
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 */
router.put(
  "/change-password",
  auth,
  validate(changePasswordSchema),
  userController.changePassword
);

export default router;
