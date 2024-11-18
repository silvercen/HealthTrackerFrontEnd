import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [tmpEmail, setTmpEmail] = useState("");
  const [tmpPassword, setTmpPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const auth = {
    email: tmpEmail,
    password: tmpPassword,
  };

  async function logIn() {
    let Token = "";
    try {
      await fetch("http://localhost:9088/auth/validate/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      })
        .then((response) => response.text())
        .then((token) => {
          Token = token;
          sessionStorage.setItem("token", token);
        });
      return true;
    } catch (error) {
      console.error("Error occurred while logging in:", error.message);
      setError("Failed to login user");
    }
    return false;
  }

  async function setUserId() {
    try {
      await fetch("http://localhost:9088/auth/" + auth.email, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.text())
        .then((userId) => {
          sessionStorage.setItem("userId", userId);
        });
      return true;
    } catch (error) {
      console.error("Error occurred while setting user ID:", error.message);
      setError("Failed to set user ID");
    }
    return false;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if ((await logIn()) === true) {
      if ((await setUserId()) === true) {
        login();
        console.log(isLoggedIn);
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-Grey  bg-opacity-40 backdrop-blur-lg  p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-Secondary">
          Login
        </h2>

        <form onSubmit={handleLogin}>
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

          <div className="mb-6">
            <label className="block text-Secondary">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-Quaternary focus:border-Quaternary"
              value={tmpPassword}
              onChange={(e) => setTmpPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <p
              className="font-poppins pb-5 text-Quaternary hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              new user? create an account here.
            </p>
          </div>

          <button
            type="submit"
            className="w-full hover:scale-105 bg-Grey shadow-lg bg-opacity-40 backdrop-blur-lg  text-Secondary font-semibold py-2 rounded hover:bg-Quaternary transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
