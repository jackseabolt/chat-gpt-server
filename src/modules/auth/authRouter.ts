import { Router } from "express";
import { wrapExpressRoute } from "../../utils/express";
import * as controller from "./authController";

const router = Router();

router.post("/signup", wrapExpressRoute(controller.signUp));
router.post("/login", wrapExpressRoute(controller.logIn));

export default router;
