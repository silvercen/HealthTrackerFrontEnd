import React, { useState } from "react";

const AddCustomWorkout = ({ onAddCustomWorkout }) => {
  const [workoutName, setWorkoutName] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddCustomWorkout = () => {
    if (!workoutName || !calories) return;

    const newWorkout = {
      name: workoutName,
      calories: parseInt(calories),
    };

    onAddCustomWorkout(newWorkout);

    // Reset form fields
    setWorkoutName("");
    setCalories("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Add Custom Workout
      </h3>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Workout Name"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Calories Burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleAddCustomWorkout}
          className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 transition"
        >
          Add Custom Workout
        </button>
      </div>
    </div>
  );
};

export default AddCustomWorkout;
