import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, BarChart2, ArrowRight, Star, MessageSquare, Trash2, Edit } from "lucide-react";
import API from "../utils/api";
import { getAuthToken } from "../utils/authTokenStore";

const TestimonialModal = ({ isOpen, onClose, onSubmit, isSubmitting, newTestimonial, setNewTestimonial, newRating, setNewRating, isEditing }) => {
  if (!isOpen) return null;

  const modalTitle = isEditing ? "Edit Your Testimonial" : "Leave a Testimonial";
  const submitButtonText = isEditing ? (isSubmitting ? "Updating..." : "Update Testimonial") : (isSubmitting ? "Submitting..." : "Submit Testimonial");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
      <div className="relative bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 w-full max-w-lg mx-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-2xl font-bold text-white mb-4">{modalTitle}</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Your Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer transition-colors ${
                    star <= newRating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                  }`}
                  onClick={() => setNewRating(star)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Your Testimonial</label>
            <textarea
              value={newTestimonial}
              onChange={(e) => setNewTestimonial(e.target.value)}
              className="w-full h-32 p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Share your experience with TrustByte..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [testimonials, setTestimonials] = useState([]);
  const [myTestimonial, setMyTestimonial] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(4);
  const [message, setMessage] = useState('');

  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Organize Your World, One Task at a Time.";
  const typingSpeed = 10;

  const API_URL = API.defaults.baseURL.replace("/api", "");

  useEffect(() => {
    let timeout;
    if (!isTypingComplete) {
      if (typedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, typingSpeed);
      } else {
        setIsTypingComplete(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [typedText, isTypingComplete, fullText]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchUserDataAndTestimonials = async () => {
      setIsLoading(true);
      const token = getAuthToken();
      setIsAuthenticated(!!token);

      if (token) {
        try {
          const { data } = await API.get("/auth/me");
          setCurrentUserId(data._id);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setIsAuthenticated(false);
        }
      }

      try {
        const { data } = await API.get(`/testimonials?page=${currentPage}&limit=${limit}`);
        setTestimonials(Array.isArray(data.testimonials) ? data.testimonials : []);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDataAndTestimonials();
  }, [currentPage, limit]);

  useEffect(() => {
    if (currentUserId && testimonials.length > 0) {
      const userReview = testimonials.find(t => t.user._id === currentUserId);
      setMyTestimonial(userReview);
      if (userReview) {
        setNewTestimonial(userReview.text);
        setNewRating(userReview.rating);
      }
    } else {
      setMyTestimonial(null);
    }
  }, [currentUserId, testimonials]);

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!newTestimonial || newRating === 0) {
      setMessage("Please write a testimonial and give a star rating.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await API.post("/testimonials", {
        text: newTestimonial,
        rating: newRating,
      });
      const response = await API.get(`/testimonials?page=${currentPage}&limit=${limit}`);
      setTestimonials(Array.isArray(response.data.testimonials) ? response.data.testimonials : []);
      setTotalPages(response.data.totalPages);

      setNewTestimonial("");
      setNewRating(0);
      setIsEditing(false);
      setMyTestimonial(data);
      setIsModalOpen(false);
      setMessage("Testimonial submitted successfully!");
    } catch (error) {
      console.error("Failed to submit testimonial:", error);
      setMessage(error.response?.data?.msg || "Failed to submit testimonial. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleTestimonialEdit = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleTestimonialUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await API.put(`/testimonials/${myTestimonial._id}`, {
        text: newTestimonial,
        rating: newRating,
      });
      setMyTestimonial(data);
      setTestimonials(testimonials.map(t => t._id === data._id ? data : t));
      setIsEditing(false);
      setIsModalOpen(false);
      setMessage("Testimonial updated successfully!");
    } catch (error) {
      console.error("Failed to update testimonial:", error);
      setMessage("Failed to update testimonial. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleTestimonialDelete = async () => {
    if (window.confirm("Are you sure you want to delete your testimonial?")) {
      try {
        await API.delete(`/testimonials/${myTestimonial._id}`);
        setMyTestimonial(null);
        setTestimonials(testimonials.filter(t => t._id !== myTestimonial._id));
        setMessage("Testimonial deleted successfully.");
      } catch (error) {
        console.error("Failed to delete testimonial:", error);
        setMessage("Failed to delete testimonial. Please try again.");
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans mt-[64px]">
      {message && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg bg-gray-800 text-white border border-gray-700">
          <p>{message}</p>
        </div>
      )}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {typedText.split(',')[0]}
            </span>
            {typedText.split(',')[1]}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            TrustByte is the simple, beautiful way to manage your tasks, boost your productivity, and achieve your goals effortlessly.
          </p>
          {!isAuthenticated && (
            <Link
              to="/tasks"
              className="mt-10 inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Get Started for Free <ArrowRight size={20} className="ml-2" />
            </Link>
          )}
        </div>
      </section>
      
      <section className="py-20 px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Features Built for You</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
            <CheckCircle size={48} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Effortless Organization</h3>
            <p className="text-gray-400">Easily create, manage, and complete tasks with a clean and intuitive interface.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
            <Clock size={48} className="text-pink-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Time Management</h3>
            <p className="text-gray-400">Stay on top of deadlines and prioritize your work to maximize your time.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
            <BarChart2 size={48} className="text-teal-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Track Your Progress</h3>
            <p className="text-gray-400">Visualize your achievements and feel motivated as you check off completed tasks.</p>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 md:px-8 bg-gray-950">
        <h2 className="text-4xl font-bold text-center text-white mb-12">What Our Users Say</h2>
        
        {isLoading ? (
          <div className="text-center text-gray-400">Loading testimonials...</div>
        ) : testimonials.length > 0 ? (
          <>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div key={t._id} className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.user.profileImage ? `${API_URL}/${t.user.profileImage}` : "https://via.placeholder.com/150"}
                      alt={t.user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-white">{t.user.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(t.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic leading-relaxed">"{t.text}"</p>
                  {isAuthenticated && t.user._id === currentUserId && (
                    <div className="mt-4 flex gap-4">
                      <button
                        onClick={handleTestimonialEdit}
                        className="flex items-center gap-1 text-purple-400 hover:text-purple-600 transition-colors"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={handleTestimonialDelete}
                        className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-full font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-lg font-bold text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-full font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-400">No testimonials found. Be the first to add one!</div>
        )}

        {isAuthenticated && !myTestimonial && (
          <div className="text-center mt-12">
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Add Your Testimonial <MessageSquare size={20} className="ml-2" />
            </button>
          </div>
        )}

        {!isAuthenticated && (
          <div className="text-center mt-12">
            <p className="text-lg text-gray-400">Want to share your experience?</p>
            <Link to="/login" className="text-purple-400 hover:underline font-bold">
              Log in to leave a testimonial!
            </Link>
          </div>
        )}
      </section>

      <TestimonialModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={isEditing ? handleTestimonialUpdate : handleTestimonialSubmit}
        isSubmitting={isSubmitting}
        newTestimonial={newTestimonial}
        setNewTestimonial={setNewTestimonial}
        newRating={newRating}
        setNewRating={setNewRating}
        isEditing={isEditing}
      />
    </div>
  );
}