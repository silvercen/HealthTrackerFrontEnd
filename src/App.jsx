import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Fitness from "./components/Fitness";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Diet from "./components/Diet";
import WellBeing from "./components/WellBeing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
function App() {
  return (
    <>
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/wellbeing" element={<WellBeing />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
    </>
  );
}

export default App;
