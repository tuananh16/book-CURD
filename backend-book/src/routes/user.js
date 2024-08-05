import express from "express";
import {
  getAllUserController,
  registerUserController,
  loginUserController,
  userRefreshTokenController,
  user,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllUser", getAllUserController);

router.post("/register", registerUserController);

router.post("/refreshToken", userRefreshTokenController);

router.post("/login", loginUserController);

router.get("/", authMiddleware, user);

export default router;
