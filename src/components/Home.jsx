import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconGym from "../assets/IconGym";
import IconFoodOutline from "../assets/IconFoodOutline";
import IconMentalHealthFill from "../assets/IconMentalHealthFill";
import IconHeartbeat from "../assets/IconHeartBeat";
import { useAuth } from "./AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [currentImage, setCurrentImage] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  const images = [
    "/gym.jpeg",
    "/diet.jpeg",
    "/sleep.jpeg",
  ];

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/dashboard`);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("opacity-0"); // Fade out current image
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setFadeClass("opacity-100"); // Fade in the next image
      }, 500); // Match with the fade-out duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Background Gradient */}
      <header className="relative z-10 text-Secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left flex items-center">
          {/* Left Side - Text Section */}
          <div className="w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins">
              Get Fit,
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins">
              Get Strong,
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins">
              Get <span className="text-Quaternary">Healthy!</span>
            </h1>

            <p className="mt-4 text-lg md:text-x1 font-poppins font-semibold">
              Track your fitness, diet, and mental well-being in one place.
            </p>

            <div className="mt-8 space-x-4">
              <button
                className="bg-white text-Primary font-semibold px-6 py-2 rounded-full shadow-md hover:text-Quaternary hover:bg-gray-200 transition"
                onClick={() => navigate(`/signup`)}
              >
                Sign Up
              </button>
              <button
                className="bg-transparent border-2 border-white text-white font-semibold px-6 py-2 rounded-full hover:bg-Quaternary  transition"
                onClick={() => navigate(`/login`)}
              >
                Login
              </button>
            </div>
          </div>

          {/* Right Side - Image Slider Section */}
          <div className="w-1/2">
            <div className="relative h-full w-full">
              <img
                src={images[currentImage]}
                alt="Fitness"
                className={`h-full w-full object-cover rounded-lg shadow-lg transition-opacity duration-500 ${fadeClass}`}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="pb-16 relative z-10 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <h2 className="text-3xl font-bold text-Secondary text-center mb-8">
              <div className="flex items-center justify-center space-x-2">
                <IconHeartbeat
                  style={{ width: "40px", height: "40px", color: "#ff0000" }}
                />
                <span className="text-Secondary text-4xl font-geist font-semibold">
                  Vitalis
                </span>
              </div>
            <p className=" pt-1 font-poppins font-normal text-lg">The Complete Health Tracker</p>
            </h2>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Fitness Tracking */}
            <div className="bg-Grey bg-opacity-40 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden group transition">
              <div className="relative h-56">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                  src="/fitness_image.jpeg"
                  alt="Fitness Tracking"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-Quaternary flex items-center space-x-2">
                  <IconGym />
                  <span>Fitness Tracking</span>
                </h3>
                <p className="mt-2 text-Secondary">
                  Log your workouts, set fitness goals, and track your progress
                  with personalized insights.
                </p>
              </div>
            </div>

            {/* Card 2 - Diet Management */}
            <div className="bg-Grey bg-opacity-40 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden group transition">
              <div className="relative h-56">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                  src="/diet_image.jpeg"
                  alt="Diet Management"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-Quaternary flex items-center space-x-2">
                  <IconFoodOutline />
                  <span>Diet Management</span>
                </h3>
                <p className="mt-2 text-Secondary">
                  Maintain a balanced diet with calorie tracking and meal
                  recommendations tailored to your goals.
                </p>
              </div>
            </div>

            {/* Card 3 - Well-being Insights */}
            <div className="bg-Grey bg-opacity-40 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden group transition">
              <div className="relative h-56">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                  src="/sleep_image.jpg"
                  alt="Well-being Insights"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-Quaternary flex items-center space-x-2">
                  <IconMentalHealthFill />
                  <span>Well-being Insights</span>
                </h3>
                <p className="mt-2 text-Secondary">
                  Monitor your mental health with mood tracking and self-care
                  reminders to ensure holistic wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Importance Section */}
      <section className="py-16 relative z-10 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center bg-Grey bg-opacity-40 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
            {/* Left Side - Text */}
            <div className="w-full md:w-1/2 p-8">
              <h2 className="text-3xl font-bold text-Quaternary mb-4">
                Why Choose Us?
              </h2>
              <p className="text-lg text-Secondary mb-6">
                Our app is your one-stop solution for achieving and maintaining
                a healthier lifestyle. Whether you're tracking your fitness,
                managing your diet, or focusing on mental well-being, we provide
                tools and insights to empower your journey.
              </p>
              <p className="text-lg text-Secondary">
                With personalized recommendations, holistic tracking, and
                seamless integration, you can stay motivated and on track to
                achieve your health goals.
              </p>
              <button
                className="mt-6 border-2 border-Quaternary text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-Quaternary transition"
                onClick={() => navigate(`/signup`)}
              >
                Start Your Journey Today
              </button>
            </div>

            {/* Right Side - Image */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-8">
              <img
                src="/thumbsup.jpeg"
                alt="Importance of Our App"
                className="max-w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
