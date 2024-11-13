import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const {login} = useAuth();
  const [auth, setAuth] = useState({
    email: "",
    password: ""
  });

  async function logIn()
  {
    let Token = "";
    try
    {
      await fetch("http://localhost:9088/auth/validate/user", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(auth)
      })
      .then((response) => response.text())
      .then((token) => {
        Token = token;
        sessionStorage.setItem("token", token)
        login()
        return true
      })
      return false
    }
    catch (error)
    {
      console.error("Error occurred while logging in:", error.message);
      setError("Failed to login user");
    }
    return false
  }

  async function setUserId()
  {
    try
    {
      await fetch("http://localhost:9088/auth/"+auth.email, {
        method: "GET",
        headers: { "Content-Type": "application/json"}
      })
     .then((response) => response.json())
     .then((userId) => {
       sessionStorage.setItem("userId", userId)
       return true
     })
     return false
    }
    catch (error)
    {
      console.error("Error occurred while setting user ID:", error.message);
      setError("Failed to set user ID");
    }
    return false
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if(await logIn() === true && await setUserId() === true)
    {
      navigate('/dashboard')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-500 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
