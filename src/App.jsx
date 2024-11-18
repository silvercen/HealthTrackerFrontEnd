import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import { motion } from "framer-motion"; // Import motion from Framer Motion
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

function App() {
  return (
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
          <ScrollToTop />
          <Navbar />
          <PageTransition />
        </Router>
      </div>
    </AuthProvider>
  );
}

// Component to handle page transition
const PageTransition = () => {
  const location = useLocation();

  // Variants for page transition animation
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const transitionConfig = {
    duration: 0.5,
    ease: "easeInOut",
  };

  return (
    <motion.div
      key={location.pathname} // Trigger animation when the route changes
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={transitionConfig}
    >
      <Routes location={location}>
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
    </motion.div>
  );
};

export default App;
