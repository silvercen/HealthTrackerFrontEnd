import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Signup = () => {
  const navigate = useNavigate()
  const [tmpEmail, setTmpEmail] = useState("");
  const [tmpPassword, setTmpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useAuth()
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    role: {
      roleId: "1",
      roleName: "USER"
    }
  });

  async function register(auth)
  {
    try {
      console.log(auth)
      let response = await fetch('http://localhost:9088/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auth)
      })

      let responseText = await response.text()

      if(responseText === 'User saved successfully')
      {
        response = await fetch('http://localhost:9088/auth/validate/user',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(auth)
        })

        let responseToken = await response.text()
        console.log(responseToken)

        if(responseToken!=null)
        {
          sessionStorage.setItem('token',responseToken)
          sessionStorage.setItem('email',auth.email)
          login()
          return true
        }
        setError("Failed to register user");
        return false;
        
      }
      else if(responseText==='User already exists')
      {
        setError("User with email already exists");
        return false;
      }
      return false
    }
    catch (e) {
      console.error("Error registering user:", e);
      setError("Failed to register user");
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (tmpPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setAuth(prevAuth => ({
      ...prevAuth,
      email: tmpEmail,
      password: tmpPassword
    }))

    if(auth.email !== "" && auth.password !== "")
    {
      if(await register(auth) === true)
      {
        console.log("Signup successful and logged in");
        navigate('/')
      }
      else
      {
        console.log("Signup failed");
      }
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
