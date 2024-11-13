import React, { useContext, useEffect, useState } from "react";
import IconHeartbeat from "../assets/IconHeartBeat";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState();
  const { isLoggedIn } = useAuth();

  async function letterCheck() {
    const response = await fetch(
      "http://localhost:9088/user/" + sessionStorage.getItem(`email`),
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const user = await response.json();
    return user.userName.charAt(0).toUpperCase();
  }

  useEffect(() => {
    if (isLoggedIn === true) {
      let letter = letterCheck();
      setContent(
        <div
          className="h-8 w-8 rounded-full border-2 border-white hover:border-Quaternary cursor-pointer bg-Secondary"
          style={{ textAlign: "center" }}
        >
          {letter}
        </div>
      );
    } else {
      setContent(
        <img
          className="h-8 w-8 rounded-full border-2 border-white hover:border-Quaternary cursor-pointer"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
        />
      );
    }
  }, [isLoggedIn]);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Fitness", path: "/fitness" },
    { name: "Diet", path: "/diet" },
    { name: "Wellbeing", path: "/wellbeing" },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-Quaternary text-white px-3 py-2 rounded-md text-sm font-medium"
      : "text-Secondary hover:bg-Quaternary hover:text-white px-3 py-2 rounded-md text-sm font-medium";

  return (
    <nav className="bg-Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo and App Name */}
          <div className="flex items-center" onClick={() => navigate(`/`)}>
            <IconHeartbeat
              style={{ width: "24px", height: "24px", color: "#ff0000" }}
            />
            <span
              className="text-Secondary ml-2 text-lg font-semibold"
              style={{ cursor: "default" }}
            >
              HealthTrackerApp
            </span>
          </div>

          {/* Centered Navigation Links */}
          <div className="flex items-center justify-center space-x-4 flex-grow">
            {navLinks.map((link) => (
              <a
                key={link.name}
                onClick={() => navigate(link.path)}
                className={isActive(link.path)}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Profile Section on the Right */}
          <div className="relative ml-auto">{content}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
