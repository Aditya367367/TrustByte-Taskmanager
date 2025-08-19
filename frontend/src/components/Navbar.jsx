import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";
import { getAuthToken, clearAuth } from "../utils/authTokenStore";
import { Menu, X, User } from "lucide-react";

import Logo from "./logo"; 

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const { data } = await API.get("/auth/me");
      setUser(data);
    } catch {
      clearAuth();
      setUser(null);
    }
  };

  const token = getAuthToken();

  useEffect(() => {
    fetchUser();
  }, [token]); 

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    navigate("/login");
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleProgressClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };
  
  // FIX: Conditionally check if baseURL exists before calling .replace()
  const API_URL = API.defaults.baseURL ? API.defaults.baseURL.replace("/api", "") : "";

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-[50px] bg-gray-900 shadow-lg">
      <nav className="flex justify-between items-center px-4 md:px-12 py-4">
        <Link to="/" className="text-white font-bold text-xl uppercase flex items-center gap-2">
          <Logo size={40} className="rounded-full"/> TrustByte
        </Link>

        <ul className="hidden md:flex gap-8 text-white font-medium text-sm uppercase items-center">
          <li className="hover:text-gray-400 transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-gray-400 transition">
            <Link to="/tasks">Tasks</Link>
          </li>
          <li className="hover:text-gray-400 transition">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-gray-400 transition">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="hover:text-gray-400 transition">
            <Link to="/progress" onClick={handleProgressClick}>Progress</Link>
          </li>
        </ul>

        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                {user.profileImage ? (
                  <img src={`${API_URL}/${user.profileImage}`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover" />
                ) : (
                  <User size={32} className="text-white border-2 border-purple-500 rounded-full p-1" />
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-full font-medium uppercase hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-purple-600 text-white rounded-full font-medium uppercase hover:bg-purple-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-pink-600 text-white rounded-full font-medium uppercase hover:bg-pink-700 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleDrawer} className="text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-y-0 right-0 w-full md:w-1/2 bg-gray-900 bg-opacity-95 shadow-xl transition-transform duration-300 ease-in-out z-50 transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-white text-lg font-bold">Menu</h2>
          <button onClick={toggleDrawer} className="text-white">
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4 text-white font-medium text-lg bg-gray-900 uppercase">
          <li>
            <Link to="/" onClick={toggleDrawer}>Home</Link>
          </li>
          <li>
            <Link to="/tasks" onClick={toggleDrawer}>Tasks</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleDrawer}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleDrawer}>Contact</Link>
          </li>
          <li>
            <Link to="/progress" onClick={(e) => { handleProgressClick(e); toggleDrawer(); }}>Progress</Link>
          </li>
          <li className="mt-4 border-t border-gray-700 pt-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={toggleDrawer}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-2"
                >
                  {user.profileImage ? (
                    <img src={`${API_URL}/${user.profileImage}`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover" />
                  ) : (
                    <User size={32} className="text-white border-2 border-purple-500 rounded-full p-1" />
                  )}
                  {user.email && <span className="text-sm">{user.email}</span>}
                </Link>
                <button
                  onClick={() => { handleLogout(); toggleDrawer(); }}
                  className="w-full text-left px-4 py-2 bg-red-600 text-white rounded-full font-medium uppercase hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleDrawer}
                  className="block px-4 py-2 text-center bg-purple-600 text-white rounded-full font-medium uppercase hover:bg-purple-700 transition mb-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleDrawer}
                  className="block px-4 py-2 text-center bg-pink-600 text-white rounded-full font-medium uppercase hover:bg-pink-700 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}