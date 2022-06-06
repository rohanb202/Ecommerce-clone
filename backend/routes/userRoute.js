import express from "express";
import {
  authUser,
  getUser,
  registerUser,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUser);

export default router;
