import { Router } from "express";
import userRoutes from "./userRoutes.mjs";
import expenseRoutes from "./expenseRoutes.mjs";
import authRoutes from "./authRoutes.mjs"
import { verifyJwt } from "../middleware/verifyJwt.mjs";

const router = Router();

router.use(userRoutes);
router.use(authRoutes);
router.use( verifyJwt , expenseRoutes);


export default router;