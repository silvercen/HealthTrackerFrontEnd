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
    <div className="min-h-screen bg-transparent text-white py-10 font-poppins">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-Quaternary">
          Daily Workout Tracker
        </h2>

        {/* Add Workout Section */}
        <div className="bg-Grey bg-opacity-40 backdrop-blur-lg shadow-md rounded-lg p-6 mb-8 border border-Quaternary">
          <h3 className="text-xl font-semibold mb-4 text-white">Add Workout</h3>
          <div className="flex items-center space-x-4">
            <select
              className="border border-Grey  rounded-md p-2 w-full  text-Grey focus:ring-Quaternary focus:border-Quaternary"
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
              className="bg-Quaternary text-white font-semibold px-4 py-2 rounded-md hover:bg-Quaternary transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Add Custom Workout Section */}
        <AddCustomWorkout onAddCustomWorkout={addCustomWorkout} />

        {/* Workout List and Total Calories Section */}
        <div className="bg-Grey shadow-lg bg-opacity-40 backdrop-blur-lg rounded-lg p-6 border border-Quaternary">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Workout Summary
          </h3>
          {workoutList.length === 0 ? (
            <p className="text-gray-500">No workouts added yet.</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {workoutList.map((workout, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 border-b border-Grey"
                >
                  <span className="font-medium text-white">{workout.name}</span>
                  <span className="text-gray-400">{workout.calories} kcal</span>
                </li>
              ))}
            </ul>
          )}
          {/* Total Calories */}
          <div className="flex justify-between items-center pt-4 border-t border-Grey">
            <span className="text-lg font-semibold text-white">
              Total Calories Burned
            </span>
            <span className="text-lg font-bold text-Quaternary">
              {totalCalories} kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
