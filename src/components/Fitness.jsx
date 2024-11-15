import React, { useState, useEffect } from "react";
import AddCustomWorkout from "./AddCustomWorkout";

// Fetch workout data from API
const fetchWorkoutData = async () => {
  try {
    const response = await fetch(
      "https://sharunraj.github.io/fitnessApi.github.io/FitnessAPI.json"
    );
    const data = await response.json();
    return data.map((workout) => ({
      name: workout.workoutName,
      calories: workout.caloriesBurned,
      id: workout.workoutId,
      type: workout.workoutType,
      duration: workout.duration,
      reps: workout.reps,
      sets: workout.sets,
    }));
  } catch (error) {
    console.error("Error fetching workout data:", error);
    return [];
  }
};

const Fitness = () => {
  const [workoutOptions, setWorkoutOptions] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [workoutList, setWorkoutList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  // Fetch workout options when the component mounts
  useEffect(() => {
    const loadWorkoutData = async () => {
      const workouts = await fetchWorkoutData();
      setWorkoutOptions(workouts);
    };
    loadWorkoutData();
  }, []);

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

  const saveFitnessLog = () => {
    // Save logic goes here (e.g., localStorage or backend)
    alert("Fitness log saved!");
  };

  return (
    <div className="min-h-screen bg-transparent text-white py-10 font-poppins">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-Quaternary">
          Daily Workout Tracker
        </h2>

        {/* Add Workout Section */}
        <div className="bg-Grey bg-opacity-40 backdrop-blur-lg shadow-md rounded-lg p-6 mb-8 border border-Quaternary">
          <h3 className="text-xl font-semibold mb-4 text-Secondary">
            Add Workout
          </h3>
          <div className="flex items-center space-x-4">
            <select
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-Quaternary focus:border-Quaternary text-Grey"
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
        <div className="bg-Grey bg-opacity-40 backdrop-blur-lg shadow-xl rounded-lg p-6 mb-8 border border-Quaternary">
          <h3 className="text-xl font-semibold mb-4 text-Secondary">
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
                  <span className="font-medium text-white">{workout.name}</span>
                  <span className="text-gray-400">
                    {workout.calories} kcal | {workout.duration} min
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Total Summary */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-lg font-semibold text-white">
              Total Calories Burned
            </span>
            <span className="text-lg font-bold text-Quaternary">
              {totalCalories} kcal
            </span>
          </div>

          {/* Save Log Button */}
          <button
            onClick={saveFitnessLog}
            className="mt-6 w-full bg-Quaternary text-white font-semibold px-4 py-2 rounded-md hover:bg-Quaternary transition"
          >
            Save Fitness Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
