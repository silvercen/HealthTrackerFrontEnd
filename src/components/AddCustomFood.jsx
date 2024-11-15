import React, { useState } from "react";

const AddCustomFood = ({ addCustomFood }) => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");

  // Handle adding a custom food item
  const handleSubmit = () => {
    if (!foodName || !calories) return;

    const newFood = {
      name: foodName,
      calories: parseInt(calories),
    };

    addCustomFood(newFood);
    setFoodName("");
    setCalories("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Add Custom Food
      </h3>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indogo-500"
          placeholder="Enter calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 transition"
        >
          Add Custom Food
        </button>
      </div>
    </div>
  );
};

export default AddCustomFood;
