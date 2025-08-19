import express from "express";
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonialController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", auth, addTestimonial);
router.put("/:id", auth, updateTestimonial);
router.delete("/:id", auth, deleteTestimonial);

export default router;