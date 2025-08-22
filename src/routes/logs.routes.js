import { Router } from 'express';
import { readLogs } from "../controllers/logs.controller.js";
import { auth } from '../middlewares/auth.js';
const router = Router();
/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get application logs
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get("/", auth, readLogs);

export default router;
