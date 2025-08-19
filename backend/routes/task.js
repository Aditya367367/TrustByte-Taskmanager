import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", auth, getTasks);
router.post("/", auth, upload.single("image"), createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;