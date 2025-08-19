"use client";
import { Award, Target, Users ,Zap} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans mt-[64px] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          About TrustByte
        </h1>

        {/* Mission Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 mb-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-white mb-4 flex items-center gap-2">
              <Target size={28} className="text-purple-400" /> Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              At TrustByte, our mission is to simplify productivity. We believe that managing your tasks should be a seamless and enjoyable experience, not a chore. We've built an app that is intuitive, fast, and visually pleasing, helping you stay organized and focused on your goals, big or small.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" 
              alt="People working together"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
          <div className="p-8 rounded-xl border-t-4 border-purple-500 bg-gray-800 shadow-lg">
            <Users size={48} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Simplicity</h3>
            <p className="text-gray-400">A clean, minimalist design that gets out of your way and lets you focus.</p>
          </div>
          <div className="p-8 rounded-xl border-t-4 border-pink-500 bg-gray-800 shadow-lg">
            <Award size={48} className="text-pink-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Reliability</h3>
            <p className="text-gray-400">Robust performance and secure data storage you can count on.</p>
          </div>
          <div className="p-8 rounded-xl border-t-4 border-teal-500 bg-gray-800 shadow-lg">
            <Zap size={48} className="text-teal-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Innovation</h3>
            <p className="text-gray-400">Continuously improving to bring you the best productivity features.</p>
          </div>
        </section>

        {/* Team Section (Optional) */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">Our Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are a small but passionate team dedicated to building tools that empower individuals to live more organized and productive lives.
          </p>
        </section>
      </div>
    </div>
  );
}