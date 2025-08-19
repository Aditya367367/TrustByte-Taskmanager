"use client";
import { Facebook, Twitter, Instagram, Linkedin, Rocket, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-gray-300 py-12 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 flex items-center gap-2">
              <Rocket size={32} /> TrustByte
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Supercharge your productivity. TrustByte helps you organize your life, track your progress, and achieve your goals with a simple, elegant interface.
            </p>
          </div>

          
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="/" className="hover:text-purple-400 transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="/tasks" className="hover:text-purple-400 transition-colors duration-200">My Tasks</a>
              </li>
              <li>
                <a href="/about" className="hover:text-purple-400 transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-purple-400 transition-colors duration-200">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Contact & Follow</h4>
            <ul className="space-y-3 text-gray-400 text-sm mb-6">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-400" />
                <span>123 Productivity Lane, Task City</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-purple-400" />
                <a href="mailto:support@TrustByte.app" className="hover:text-purple-400">support@TrustByte.app</a>
              </li>
            </ul>
            <div className="flex gap-4">
              <a href="fb" aria-label="Facebook" className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform duration-200">
                <Facebook size={20} />
              </a>
              <a href="twit" aria-label="Twitter" className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform duration-200">
                <Twitter size={20} />
              </a>
              <a href="instagram" aria-label="Instagram" className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform duration-200">
                <Instagram size={20} />
              </a>
              <a href="linkedin" aria-label="LinkedIn" className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

       
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} TrustByte. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}