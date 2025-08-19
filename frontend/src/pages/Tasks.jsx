import { useState, useEffect, useCallback } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Plus, Check, RotateCcw, Trash2, ClipboardList, X } from "lucide-react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const API_URL = API.defaults.baseURL.replace("/api", "");

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      if (err.response?.status === 401) {
        showMessage("error", "⚠️ Please log in to view your tasks.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        showMessage("error", "Something went wrong while fetching tasks.");
      }
    }
  }, [navigate]);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showMessage("error", "Task title is required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await API.post("/tasks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setDescription("");
      setImage(null);
      setShowModal(false);
      fetchTasks();
      showMessage("success", "✅ Task added successfully!");
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
      showMessage("error", err.response?.data?.error || "Failed to add task.");
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await API.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
      showMessage(
        "success",
        completed ? "↩ Task marked as pending." : "✔ Task marked as done!"
      );
    } catch (err) {
      if (err.response?.status === 401) {
        showMessage("error", "⚠️ You must log in to update tasks.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      showMessage("success", "🗑 Task deleted successfully!");
    } catch (err) {
      if (err.response?.status === 401) {
        showMessage("error", "⚠️ You must log in to delete tasks.");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen px-4 md:px-8 py-12 bg-gray-900 text-gray-100 mt-[64px] font-sans flex flex-col">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-4xl font-extrabold text-white">
          My Tasks
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2.5 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg transform hover:scale-105 font-medium"
        >
          <Plus size={18} /> Add Task
        </button>
      </header>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg shadow-md text-white transition-opacity duration-500 ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          } animate-slide-down`}
        >
          {message.text}
        </div>
      )}

      <div className="flex-grow flex flex-col items-center justify-center">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-400 py-20">
            <ClipboardList size={80} className="text-gray-600 mb-6" />
            <p className="text-lg font-medium text-white">No tasks yet. Get started by adding your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tasks.map((t) => (
              <div
                key={t._id}
                className="flex flex-col justify-between rounded-2xl bg-gray-800 p-6 shadow-xl border border-gray-700 hover:shadow-2xl hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex-1">
                  <h3
                    className={`text-xl font-semibold leading-tight ${
                      t.completed ? "line-through text-gray-500" : "text-white"
                    }`}
                  >
                    {t.title}
                  </h3>
                  {t.description && (
                    <p className="text-sm text-gray-300 mt-2">{t.description}</p>
                  )}
                </div>

                {t.image && (
                  <div className="w-full h-48 mt-5 rounded-lg overflow-hidden relative border border-gray-700">
                    <img
                      src={
                        t.image.startsWith("http") ? t.image : `${API_URL}${t.image}`
                      }
                      alt={t.title}
                      className="w-full h-full object-cover opacity-0 transition-opacity duration-500 rounded-lg"
                      onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                      onError={(e) => {
                        if (!e.currentTarget.src.includes("/no-image-local.png")) {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/no-image-local.png";
                        }
                      }}
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-5">
                  <button
                    onClick={() => handleToggle(t._id, t.completed)}
                    className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 flex items-center gap-2 transition-colors duration-200 shadow-md text-sm font-medium"
                  >
                    {t.completed ? (
                      <>
                        <RotateCcw size={16} /> Undo
                      </>
                    ) : (
                      <>
                        <Check size={16} /> Done
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors duration-200 shadow-md text-sm font-medium"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 z-50 animate-fade-in">
          <form
            onSubmit={handleAdd}
            className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-gray-700"
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-white text-center">Add New Task</h3>

            <input
              type="text"
              placeholder="Task Title"
              className="w-full border-none bg-gray-700 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description (Optional)"
              className="w-full border-none bg-gray-700 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Task Image (Optional)
            </label>
            <input
              type="file"
              className="w-full mb-6 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg">
              Save Task
            </button>
          </form>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}