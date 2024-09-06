import { Router } from "express";
import { sendEmailController } from "../controllers/sendEmailController.js";

const router = Router();

router.post(
  "/send-message",
  sendEmailController
);

export default router;