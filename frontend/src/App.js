import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer";
import ProtectedRoute from "./utils/ProtectedRoute";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Progress from "./pages/Progress";
import Profilepage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route 
          path="/login" 
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          } 
        />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<HomePage/>} />
         <Route path="/contact" element={<ContactPage/>} />
         <Route path="/about" element={<AboutPage/>} />
         <Route path="/progress" element={<Progress />} />
         <Route path="profile" element={<Profilepage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
