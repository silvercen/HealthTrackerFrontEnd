import React from "react";
import { useNavigate } from "react-router-dom";
import IconGym from "../assets/IconGym";
import IconFoodOutline from "../assets/IconFoodOutline";
import IconMentalHealthFill from "../assets/IconMentalHealthFill";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to HealthTrackerApp
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Track your fitness, diet, and mental well-being in one place.
          </p>
          <div className="mt-8 space-x-4">
            <button
              className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
              onClick={() => navigate(`/signup`)}
            >
              Sign Up
            </button>
            <button
              className="bg-transparent border-2 border-white text-white font-semibold px-6 py-2 rounded-md hover:bg-white hover:text-indigo-600 transition"
              onClick={() => navigate(`/login`)}
            >
              Login
            </button>
          </div>
        </div>
      </header>
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Fitness Tracking */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition">
              <div className="relative h-56">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                  src="https://via.placeholder.com/400x250?text=Fitness+Tracking"
                  alt="Fitness Tracking"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-600 flex items-center space-x-2">
                  <IconGym />
                  <span>Fitness Tracking</span>
                </h3>
                <p className="mt-2 text-gray-600">
                  Log your workouts, set fitness goals, and track your progress
                  with personalized insights.
                </p>
              </div>
            </div>

            {/* Card 2 - Diet Management */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition">
              <div className="relative h-56">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                  src="https://via.placeholder.com/400x250?text=Diet+Management"
                  alt="Diet Management"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-600 flex items-center space-x-2">
                  <IconFoodOutline />
                  <span>Diet Management</span>
                </h3>
                <p className="mt-2 text-gray-600">
                  Maintain a balanced diet with calorie tracking and meal
                  recommendations tailored to your goals.
                </p>
              </div>
            </div>

            {/* Card 3 - Well-being Insights */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition">
              <div className="relative h-56">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                  src="https://via.placeholder.com/400x250?text=Well-being+Insights"
                  alt="Well-being Insights"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-600 flex items-center space-x-2">
                  <IconMentalHealthFill />
                  <span>Well-being Insights</span>
                </h3>
                <p className="mt-2 text-gray-600">
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
