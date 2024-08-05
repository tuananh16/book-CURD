import express from "express";
import {
  createBookController,
  getAllBookController,
  detailBookController,
  deleteBookController,
  updateBookController,
} from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkAdminMiddleware from "../middleware/checkAdMiddleware.js";

const router = express.Router();

router.put("/update/:id", checkAdminMiddleware, updateBookController);

router.delete("/delete/:id", checkAdminMiddleware, deleteBookController);

router.get("/:id", detailBookController);

router.post("/", checkAdminMiddleware, createBookController);

router.get("/", authMiddleware, getAllBookController);

export default router;
