import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Fitness from "./components/Fitness";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Diet from "./components/Diet";
import WellBeing from "./components/WellBeing";
import AccountPage from "./components/AccountPage";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/Error";
import ScrollToTop from "./components/ScrollTop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <div className="relative min-h-screen overflow-hidden bg-black">
          <div
            className="absolute inset-0 w-[450px] h-[450px] bg-gradient-to-b from-blue-700 to-teal-700 rounded-full"
            style={{ filter: "blur(200px)", zIndex: 0 }}
          ></div>
          <div
            className="absolute inset-0 w-[450px] h-[450px] bg-gradient-to-b from-purple-500 to-pink-400 rounded-full"
            style={{
              filter: "blur(200px)",
              left: "50rem",
              top: "30rem",
              zIndex: 0,
            }}
          ></div>

          <Router>
            <ScrollToTop/>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/fitness" element={<Fitness />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/diet" element={<Diet />} />
              <Route path="/wellbeing" element={<WellBeing />} />
              <Route
                path="/bad-request"
                element={<ErrorPage />}
                state={{ errorType: "bad-request" }}
              />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
