import React, { useState, useEffect } from "react";
import AddCustomWorkout from "./AddCustomWorkout";

// Mock workout data to simulate fetching from an API
const workoutOptions = [
  { name: "Running", calories: 500 },
  { name: "Cycling", calories: 400 },
  { name: "Swimming", calories: 600 },
  { name: "Weightlifting", calories: 300 },
  { name: "Yoga", calories: 200 },
];

const Fitness = () => {
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [workoutList, setWorkoutList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  // Handle adding a workout to the list
  const addWorkout = () => {
    if (!selectedWorkout) return;

    const workout = workoutOptions.find((w) => w.name === selectedWorkout);
    setWorkoutList([...workoutList, workout]);
    setSelectedWorkout("");
  };

  // Handle adding a custom workout
  const addCustomWorkout = (workout) => {
    setWorkoutList([...workoutList, workout]);
  };

  // Calculate total calories whenever workoutList changes
  useEffect(() => {
    const total = workoutList.reduce(
      (sum, workout) => sum + workout.calories,
      0
    );
    setTotalCalories(total);
  }, [workoutList]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Daily Workout Tracker
        </h2>

        {/* Add Custom Workout Section */}
        <AddCustomWorkout onAddCustomWorkout={addCustomWorkout} />

        {/* Add Workout Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Add Workout
          </h3>
          <div className="flex items-center space-x-4">
            <select
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedWorkout}
              onChange={(e) => setSelectedWorkout(e.target.value)}
            >
              <option value="">Select a workout</option>
              {workoutOptions.map((workout, index) => (
                <option key={index} value={workout.name}>
                  {workout.name}
                </option>
              ))}
            </select>
            <button
              onClick={addWorkout}
              className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Workout List and Total Calories Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Workout Summary
          </h3>
          {workoutList.length === 0 ? (
            <p className="text-gray-500">No workouts added yet.</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {workoutList.map((workout, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 border-b border-gray-200"
                >
                  <span className="font-medium text-gray-800">
                    {workout.name}
                  </span>
                  <span className="text-gray-600">{workout.calories} kcal</span>
                </li>
              ))}
            </ul>
          )}
          {/* Total Calories */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-lg font-semibold text-gray-700">
              Total Calories Burned
            </span>
            <span className="text-lg font-bold text-indigo-600">
              {totalCalories} kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
