import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const [tmpEmail, setTmpEmail] = useState("");
  const [tmpPassword, setTmpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {login} = useAuth()
  const auth = {
    email: tmpEmail,
    password: tmpPassword,
    role: {
      roleId: "1",
      roleName: "USER"
    }
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
  }
  async function setUserId()
  {
    try
    {
      await fetch("http://localhost:9088/auth/"+auth.email, {
        method: "GET"
      })
     .then((response) => response.text())
     .then((userId) => {
       console.log(userId)
       sessionStorage.setItem("userId", userId)
     })
     return true
    }
    catch (error)
    {
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
    if(auth.email !== "" && auth.password !== "")
    {
      if(await register(auth) === true)
      {
        if(await setUserId() === true)
        {
          console.log("Signup successful and logged in");
          login()
          navigate(`/dashboard`)
        }
        else
        {
          console.log("Signup successful");
          navigate(`/login`)
        }
      }
      else
      {
        console.log("Signup failed");
      }
    } else {
      console.log("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-Grey bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-Secondary">
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-Secondary">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-Quaternary focus:border-Quaternary"
              value={tmpEmail}
              onChange={(e) => setTmpEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-Secondary">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-Quaternary focus:border-Quaternary"
              value={tmpPassword}
              onChange={(e) => setTmpPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-Secondary">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-Quaternary focus:border-Quaternary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-Grey shadow-lg bg-opacity-40 backdrop-blur-lg text-Secondary font-semibold py-2 rounded hover:bg-Quaternary transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
