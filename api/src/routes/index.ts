import { Router } from "express";
import userRoutes from "./users/index.js";
import assisntanceRoutes from "./assinstants/index.js";

const router = Router();

/*__________
|  USERS  */
router.use('/users', userRoutes);   

/*_____________
|  CHAT-GPT  */
router.use('/assistants', assisntanceRoutes);

export default router;