import React, { useState, useEffect } from "react";
import AddCustomFood from "./AddCustomFood";

// Mock food data to simulate fetching from an API
const foodOptions = [
  { name: "Apple", calories: 95 },
  { name: "Banana", calories: 105 },
  { name: "Salad", calories: 150 },
  { name: "Chicken Breast", calories: 165 },
  { name: "Rice", calories: 205 },
];

const Diet = () => {
  const [selectedFood, setSelectedFood] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  // Handle adding a food item to the list
  const addFood = () => {
    if (!selectedFood) return;

    const food = foodOptions.find((f) => f.name === selectedFood);
    setFoodList([...foodList, food]);
    setSelectedFood("");
  };

  // Add custom food item
  const addCustomFood = (customFood) => {
    setFoodList([...foodList, customFood]);
  };

  // Calculate total calories whenever foodList changes
  useEffect(() => {
    const total = foodList.reduce((sum, food) => sum + food.calories, 0);
    setTotalCalories(total);
  }, [foodList]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8  text-indigo-600">
          Daily Diet Tracker
        </h2>

        {/* Add Food Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Add Food Item
          </h3>
          <div className="flex items-center space-x-4">
            <select
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              <option value="">Select a food item</option>
              {foodOptions.map((food, index) => (
                <option key={index} value={food.name}>
                  {food.name}
                </option>
              ))}
            </select>
            <button
              onClick={addFood}
              className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Add Custom Food Section */}
        <AddCustomFood addCustomFood={addCustomFood} />

        {/* Food List and Total Calories Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Food Summary
          </h3>
          {foodList.length === 0 ? (
            <p className="text-gray-500">No food items added yet.</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {foodList.map((food, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 border-b border-gray-200"
                >
                  <span className="font-medium text-gray-800">{food.name}</span>
                  <span className="text-gray-600">{food.calories} kcal</span>
                </li>
              ))}
            </ul>
          )}
          {/* Total Calories */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-lg font-semibold text-gray-700">
              Total Calories Consumed
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

export default Diet;
