import { useState, useEffect } from "react";
import API from "../utils/api";
import { CheckCircle, Award, Hourglass, Sparkles, Frown,} from "lucide-react";

export default function ProgressPage() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
      setCompletedTasks(data.filter((task) => task.completed));
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage({ type: "error", text: "Please log in to view your progress." });
      } else {
        setMessage({ type: "error", text: "Something went wrong while fetching tasks." });
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const remainingCount = totalTasks - completedCount;

  const getStatusContent = () => {
    if (totalTasks === 0) {
      return (
        <div className="text-center py-12">
          <Frown size={100} className="text-gray-600 mx-auto animate-pulse" />
          <h3 className="text-2xl font-bold text-white mt-6">No Tasks Found</h3>
          <p className="text-gray-400 mt-2">Start by adding your first task to begin your journey!</p>
        </div>
      );
    } else if (completedCount === 0 && totalTasks > 0) {
      return (
        <div className="text-center py-12">
          <Hourglass size={100} className="text-pink-500 mx-auto animate-spin-slow" />
          <h3 className="text-2xl font-bold text-white mt-6">You're on the right track!</h3>
          <p className="text-gray-400 mt-2">No completed tasks yet. Let's get started and check off the first one!</p>
        </div>
      );
    } else if (completedCount > 0 && remainingCount > 0) {
      return (
        <div className="text-center py-12">
          <Sparkles size={100} className="text-yellow-400 mx-auto animate-bounce-slow" />
          <h3 className="text-2xl font-bold text-white mt-6">Great progress!</h3>
          <p className="text-gray-400 mt-2">You've completed {completedCount} out of {totalTasks} tasks. Keep going, you're so close!</p>
        </div>
      );
    } else if (remainingCount === 0 && totalTasks > 0) {
      return (
        <div className="text-center py-12">
          <Award size={100} className="text-purple-400 mx-auto animate-fade-in-up" />
          <h3 className="text-2xl font-bold text-white mt-6">All tasks completed!</h3>
          <p className="text-gray-400 mt-2">You've finished everything. Great job! Time to relax or add new goals.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-12 bg-gray-900 text-white font-sans mt-[64px]">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white">Your Progress</h2>
          <p className="text-lg text-gray-400 mt-2">A summary of your hard work and achievements.</p>
        </header>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg shadow-md text-white ${message.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
            {message.text}
          </div>
        )}

        {getStatusContent()}

        {completedTasks.length > 0 && (
          <section className="mt-12">
            <h3 className="text-3xl font-bold text-white mb-6">Completed Tasks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTasks.map((t) => (
                <div key={t._id} className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                  <div className="flex items-start gap-4">
                    <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-semibold line-through text-gray-400">{t.title}</h4>
                      {t.description && <p className="text-sm text-gray-500 mt-1">{t.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}