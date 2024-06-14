import { Router } from "express";
import userRoutes from "./userRoutes.mjs";
import expenseRoutes from "./expenseRoutes.mjs";
import authRoutes from "./authRoutes.mjs"
import investRoutes from "./investRoutes.mjs";
import loanRoutes from "./loanRoutes.mjs";
import { verifyJwt } from "../middleware/verifyJwt.mjs";
import UserDataRoutes from './UserDataRoutes.mjs';
import chatGTPRoutes from './chatGPTRoutes.mjs'
 
const router = Router();


router.use(userRoutes);
router.use(authRoutes);
router.use(UserDataRoutes);
router.use(chatGTPRoutes);
router.use( verifyJwt , expenseRoutes);
router.use(investRoutes);
router.use(loanRoutes);



export default router;