import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Fitness from "./components/Fitness";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Diet from "./components/Diet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/diet" element={<Diet />} />

          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
