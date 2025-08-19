"use client";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage("");
    setSubmissionStatus(null);

    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus("success");
      setSubmissionMessage("Your message has been sent successfully! We'll get back to you shortly.");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans mt-[64px] py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          We'd love to hear from you! Send us a message or find us using the details below.
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg p-3 text-white border-none focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg p-3 text-white border-none focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg p-3 text-white border-none focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
            {/* Submission message display */}
            {submissionMessage && (
              <div
                className={`mt-6 p-4 rounded-lg text-center font-semibold ${
                  submissionStatus === "success"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {submissionMessage}
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg shadow-inner">
                <Mail size={24} className="text-purple-400" />
                <div>
                  <h4 className="font-semibold text-white">Email Us</h4>
                  <p className="text-gray-300">support@TrustByte.app</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg shadow-inner">
                <Phone size={24} className="text-pink-400" />
                <div>
                  <h4 className="font-semibold text-white">Call Us</h4>
                  <p className="text-gray-300">+91 5555556677</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg shadow-inner">
                <MapPin size={24} className="text-teal-400" />
                <div>
                  <h4 className="font-semibold text-white">Visit Us</h4>
                  <p className="text-gray-300">Mumbai india</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <img 
                src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop" 
                alt="Working on a laptop"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}