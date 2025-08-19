import Testimonial from "../models/Testimonial.js";
import User from "../models/User.js";

export const getTestimonials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalTestimonials = await Testimonial.countDocuments();
    const totalPages = Math.ceil(totalTestimonials / limit);

    const testimonials = await Testimonial.find()
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ testimonials, currentPage: page, totalPages, totalTestimonials });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const addTestimonial = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const existingTestimonial = await Testimonial.findOne({ user: req.user.id });
    if (existingTestimonial) {
      return res.status(400).json({ msg: "User has already submitted a testimonial." });
    }
    const newTestimonial = new Testimonial({
      user: req.user.id,
      text,
      rating,
    });
    await newTestimonial.save();
    
    const populatedTestimonial = await Testimonial.findById(newTestimonial._id).populate("user", "name profileImage");
    
    res.status(201).json(populatedTestimonial);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const testimonial = await Testimonial.findOne({ _id: req.params.id, user: req.user.id });

    if (!testimonial) {
      return res.status(404).json({ msg: "Testimonial not found or user not authorized" });
    }

    testimonial.text = text || testimonial.text;
    testimonial.rating = rating || testimonial.rating;

    await testimonial.save();
    
    const populatedTestimonial = await Testimonial.findById(testimonial._id).populate("user", "name profileImage");

    res.json(populatedTestimonial);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!testimonial) {
      return res.status(404).json({ msg: "Testimonial not found or user not authorized" });
    }

    res.json({ msg: "Testimonial removed successfully" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};