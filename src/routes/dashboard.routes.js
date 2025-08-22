import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { getDashboard } from '../controllers/dashboard.controller.js';

const router = Router();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get user dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                 stats:
 *                   type: object
 *                   properties:
 *                     notifications:
 *                       type: number
 *                       example: 3
 *                     messages:
 *                       type: number
 *                       example: 1
 *                     lastLoginAt:
 *                       type: string
 *                       format: date-time
 */
router.get('/', auth, getDashboard);

export default router;
