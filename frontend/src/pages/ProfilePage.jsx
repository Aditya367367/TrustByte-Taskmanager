import { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Info } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    dateOfBirth: "",
    profileImage: null,
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = API.defaults.baseURL.replace("/api", "");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/auth/me");
        setUser(data);
        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          profileImage: null,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setMessage({ type: "error", text: "Please log in to view your profile." });
        setLoading(false);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("bio", formData.bio);
    data.append("dateOfBirth", formData.dateOfBirth);
    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      const response = await API.put("/auth/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(response.data.user);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error("Failed to update profile:", error);
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-12 bg-gray-900 text-white font-sans mt-[64px]">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white">My Profile</h2>
          <p className="text-lg text-gray-400 mt-2">Manage your personal information and profile picture.</p>
        </header>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg shadow-md text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message.text}
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <img
              src={user.profileImage ? `${API_URL}/${user.profileImage}` : "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
            />
            <div>
              <h3 className="text-3xl font-bold">{user.name}</h3>
              <p className="text-lg text-gray-400 mt-1">{user.email}</p>
              {user.bio && <p className="text-gray-300 italic mt-2">"{user.bio}"</p>}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
              <div className="relative">
                <Info size={20} className="absolute left-3 top-4 text-gray-500" />
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                  rows="3"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-300 mb-1">Profile Image</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleFileChange}
                className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}