import { Router } from "express";
import { chat } from "./chatController";
import { isAuthenticated } from "../../middleware/auth";

const router = Router();

router.post("", isAuthenticated, chat);

export default router;
