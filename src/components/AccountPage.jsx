import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after logout

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("accountInfo");

  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Email fetched automatically
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [journey, setJourney] = useState("Maintainance");

  // Function to simulate fetching logged-in user email
  useEffect(() => {
    const loggedInEmail = "user@example.com"; // Simulated email
    setEmail(loggedInEmail);
  }, []);

  // Navigate hook
  const navigate = useNavigate();

  // Handle form submit for account info update
  const handleAccountUpdateSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      age,
      weight,
      height,
      journey,
    });
    alert("Account Updated Successfully");

    // Switch back to account info tab after update
    setActiveTab("accountInfo");
  };

  // Handle form submit for deleting account
  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Account Deleted");
      alert("Account Deleted Successfully");
    }
  };

  // Handle user logout
  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, state, etc.)
    alert("Logged Out Successfully");

    // Redirect to the home page after logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="w-full p-8 flex flex-col items-center">
        <h1 className="text-3xl text-Secondary font-semibold mb-8">
          Account Settings
        </h1>
        <div className="w-full max-w-3xl p-8 bg-Grey border border-Quaternary bg-opacity-40 backdrop-blur-lg shadow-xl rounded-lg">
          {activeTab === "accountInfo" && (
            <div>
              <h2 className="text-2xl text-Secondary font-semibold mb-6">
                Account Information
              </h2>
              <p className="text-lg text-Secondary">Email: {email}</p>
              <p className="text-lg text-Secondary">Name: {name}</p>
              <p className="text-lg text-Secondary">Age: {age}</p>
              <p className="text-lg text-Secondary">Weight: {weight} kg</p>
              <p className="text-lg text-Secondary">Height: {height} cm</p>
              <p className="text-lg text-Secondary">Journey: {journey}</p>

              {/* Update Settings Button */}
              <button
                onClick={() => setActiveTab("updateSettings")}
                className="w-full bg-Quaternary text-white font-semibold py-2 rounded-md hover:bg-Quaternary transition mt-6"
              >
                Update Account Information
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition mt-4"
              >
                Logout
              </button>
              {/* Delete Account Button */}
              <button
                onClick={() => setActiveTab("deleteAccount")}
                className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition mt-4"
              >
                Delete Account
              </button>

            </div>
          )}

          {activeTab === "updateSettings" && (
            <div>
              <h2 className="text-2xl text-Secondary font-semibold mb-6">
                Update Settings
              </h2>
              <form onSubmit={handleAccountUpdateSubmit}>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-Secondary">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium text-Secondary">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your age"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium text-Secondary">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your weight"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium text-Secondary">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your height"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium text-Secondary">
                    Your Journey
                  </label>
                  <select
                    value={journey}
                    onChange={(e) => setJourney(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="Maintainance">Maintainance</option>
                    <option value="WeightLoss">WeightLoss</option>
                    <option value="WeightGain">WeightGain</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-Quaternary text-white font-semibold py-2 rounded-md hover:bg-Quaternary transition"
                >
                  Update Information
                </button>
              </form>
            </div>
          )}

          {activeTab === "deleteAccount" && (
            <div>
              <h2 className="text-2xl text-Secondary font-semibold mb-6">
                Delete Account
              </h2>
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition"
              >
                Delete My Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
