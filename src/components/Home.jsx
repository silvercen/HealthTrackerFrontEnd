import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconGym from "../assets/IconGym";
import IconFoodOutline from "../assets/IconFoodOutline";
import IconMentalHealthFill from "../assets/IconMentalHealthFill";
import { useAuth } from "./AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/fitness_image.jpeg",
    "/diet_image.jpeg",
    "/sleep_image.jpg",
  ];

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/dashboard`);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Background Gradient */}
      <header className="relative z-10 bg-gradient-to-r from-Tertiary to-Primary text-Secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left font-geist">
          <h1 className="text-4xl md:text-5xl font-bold">Get Fit,</h1>
          <h1 className="text-4xl md:text-5xl font-bold">Get Strong,</h1>
          <h1 className="text-4xl md:text-5xl font-bold">Get Healthy!</h1>

          <p className="mt-4 text-lg md:text-x1">
            Track your fitness, diet, and mental well-being in one place.
          </p>

          <div className="mt-8 space-x-4">
            <button
              className="bg-white text-Primary font-semibold px-6 py-2 rounded-md shadow-md hover:text-Quaternary hover:bg-gray-200 transition"
              onClick={() => navigate(`/signup`)}
            >
              Sign Up
            </button>
            <button
              className="bg-transparent border-2 border-white text-white font-semibold px-6 py-2 rounded-md hover:bg-Quaternary hover:text-Primary transition"
              onClick={() => navigate(`/login`)}
            >
              Login
            </button>
          </div>
        </div>

        {/* Image Slider Section */}
        <div className="absolute top-0 right-0 h-full w-1/2">
          <div className="relative h-full w-full">
            <img
              src={images[currentImage]}
              alt="Fitness"
              className="h-full w-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-Secondary text-center mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Fitness Tracking */}
            <div className="bg-Grey rounded-lg shadow-lg overflow-hidden group transition">
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
            <div className="bg-Grey rounded-lg shadow-lg overflow-hidden group transition">
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
            <div className="bg-Grey rounded-lg shadow-lg overflow-hidden group transition">
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
    </div>
  );
};

export default Home;
