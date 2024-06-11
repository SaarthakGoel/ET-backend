import { Router } from "express";
import userRoutes from "./userRoutes.mjs";
import expenseRoutes from "./expenseRoutes.mjs";
import authRoutes from "./authRoutes.mjs"
import investRoutes from "./investRoutes.mjs";
import loanRoutes from "./loanRoutes.mjs";
import { verifyJwt } from "../middleware/verifyJwt.mjs";

const router = Router();

router.use(userRoutes);
router.use(authRoutes);
router.use(investRoutes);
router.use(loanRoutes);
router.use( verifyJwt , expenseRoutes);



export default router;