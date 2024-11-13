import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const [tmpEmail, setTmpEmail] = useState("");
  const [tmpPassword, setTmpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const authData = {
    email: tmpEmail,
    password: tmpPassword,
    role: {
      roleId: "1",
      roleName: "USER",
    },
  };

  const register = async (auth) => {
    try {
      const response = await fetch("http://localhost:9088/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      });

      const responseText = await response.text();

      if (responseText === "User saved successfully") {
        return true;
      } else if (responseText === "User already exists") {
        setError("User with email already exists");
        return false;
      } else {
        setError("Failed to register user");
        return false;
      }
    } catch (e) {
      console.error("Error registering user:", e);
      setError("Failed to register user");
      return false;
    }
  };

const setUserId = async (email) => {
  try {
    const response = await fetch(`http://localhost:9088/auth/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    let userId;

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      userId = data.userId; // assuming API response has a userId field
    } else {
      // If not JSON, assume it's plain text
      userId = await response.text();
    }

    if (userId) {
      sessionStorage.setItem("userId", userId);
      return true;
    }
    setError("Failed to retrieve user ID");
    return false;
  } catch (error) {
    console.error("Error occurred while setting user ID:", error.message);
    setError("Failed to set user ID");
    return false;
  }
};

  const handleSignup = async (e) => {
    e.preventDefault();

    if (tmpPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const registrationSuccess = await register(authData);

    if (registrationSuccess) {
      const userIdSet = await setUserId(tmpEmail);
      if (userIdSet) {
        login();
        console.log("Signup successful and logged in");
        navigate(`/dashboard`);
      } else {
        console.log("User registered but failed to set user ID");
        navigate(`/login`);
      }
    } else {
      console.log("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-indigo-500 focus:border-indigo-500"
              value={tmpEmail}
              onChange={(e) => setTmpEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-indigo-500 focus:border-indigo-500"
              value={tmpPassword}
              onChange={(e) => setTmpPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-indigo-500 focus:border-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-500 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
