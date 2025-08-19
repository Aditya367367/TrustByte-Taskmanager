import express from "express";
import { signup, login, me, updateProfile } from "../controllers/authController.js";
import auth from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); 

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, me);
router.put("/profile", auth, upload.single("profileImage"), updateProfile); 

export default router;