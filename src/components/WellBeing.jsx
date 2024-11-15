import React, { useState } from "react";

const WellBeing = () => {
  const [sleepHours, setSleepHours] = useState("");
  const [mood, setMood] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (sleepHours && mood) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Well-being Tracker
        </h2>

        {!submitted ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">
              How are you feeling today?
            </h3>

            {/* Sleep Hours Input */}
            <div className="mb-4">
              <label
                htmlFor="sleepHours"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                How many hours did you sleep last night?
              </label>
              <input
                type="number"
                id="sleepHours"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter hours"
              />
            </div>

            {/* Mood Input */}
            <div className="mb-6">
              <label
                htmlFor="mood"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                How are you feeling today?
              </label>
              <select
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your mood</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Neutral">Neutral</option>
                <option value="Stressed">Stressed</option>
                <option value="Relaxed">Relaxed</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Thank you for sharing!
            </h3>
            <p className="text-lg text-gray-600 mb-2">
              You slept {sleepHours} hours last night.
            </p>
            <p className="text-lg text-gray-600">
              You are feeling{" "}
              <span className="font-semibold text-indigo-600">{mood}</span>{" "}
              today.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellBeing;
