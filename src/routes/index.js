import { Router } from 'express';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import logsRoutes from './logs.routes.js';
import userRoutes from "./user.routes.js";
import courseRoutes from "./course.routes.js";

const router = Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/logs', logsRoutes);
router.use('/users', userRoutes);
router.use("/courses", courseRoutes);

export default router;
