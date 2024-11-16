import React, { useState, useEffect } from "react";
import AddCustomFood from "./AddCustomFood";
import { Navigate, useNavigate } from "react-router-dom";
import { parse } from "postcss";

// Fetch food data from API

const fetchFoodData = async () => {
  try {
    const response = await fetch(
      "https://sharunraj.github.io/foodApi.github.io/FoodAPI.json"
    );
    const data = await response.json();
    return data.map((food) => ({
      name: food.foodName,
      caloriesPer100g: food.avgCalories,
      proteinPer100g: food.foodProtein,
      fatPer100g: food.foodFat,
    }));
  } catch (error) {
    console.error("Error fetching food data:", error);
    Navigate('/bad-request', {state: {errorType: 'bad-request'}});
    return []; 
  }
};

const Diet = () => {
  const navigate = useNavigate();
  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [grams, setGrams] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalSugar, setTotalSugar] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  // Fetch food options when the component mounts
  useEffect(() => {
    const loadFoodData = async () => {
      const foods = await fetchFoodData();
      setFoodOptions(foods);
    };
    loadFoodData();
  }, []);

  // Handle adding a food item to the list with portion size in grams
  const addFood = async () => {
    if (!selectedFood || !grams) return;

    const food = foodOptions.find((f) => f.name === selectedFood);
    const calories = (parseFloat(grams) * food.caloriesPer100g) / 100;
    const protein = (parseFloat(grams) * food.proteinPer100g) / 100;
    const fat = (parseFloat(grams) * food.fatPer100g) / 100;
    const sugar = (parseFloat(grams) * food.sugarPer100g)/100;

    const foodWithDetails = {
      name: food.name,
      grams: parseInt(grams),
      calories: Math.round(calories),
      protein: Math.round(protein * 10) / 10,
      fat: Math.round(fat * 10) / 10,
      sugar: Math.round(sugar * 10) / 10,
    };

    setFoodList([...foodList, foodWithDetails]);
    await addEachFood()
    setSelectedFood("");
    setGrams("");
  };

  // Add custom food item
  const addCustomFood = (customFood) => {
    setFoodList([...foodList, customFood]);
  };

  // Calculate totals whenever foodList changes
  useEffect(() => {
    const totalCalories = foodList.reduce(
      (sum, food) => sum + food.calories,
      0
    );
    const totalProtein = foodList.reduce((sum, food) => sum + food.protein, 0);
    const totalFat = foodList.reduce((sum, food) => sum + food.fat, 0);
    const totalSugar = foodList.reduce((sum, food) => sum + food.sugar, 0);

    setTotalCalories(totalCalories);
    setTotalProtein(totalProtein);
    setTotalFat(totalFat);
    setTotalSugar(totalSugar);
  }, [foodList]);

  const addEachFood = async() => {
    await fetch('http://localhost:9088/diet/'+sessionStorage.getItem('userId')+'/add-food/'+selectedFood, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      }
    });
  }

  const saveFoodLog = async () => {
    // Save logic goes here, e.g., sending foodList data to a backend or saving locally
    const response = await fetch('http://localhost:9088/diet/'+sessionStorage.getItem('userId')+'/save-diet',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      },
    })
    if(await response.json() === null)
    {
      navigate('/bad-request')
    }
    else
    {
      navigate('/')
    }
    alert("Food log saved!");
  };

  return (
    <div className="min-h-screen font-poppins py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-Quaternary">
          Daily Diet Tracker
        </h2>

        {/* Add Food Section */}
        <div className="bg-Grey border border-Quaternary bg-opacity-40 backdrop-blur-lg shadow-xl rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-Secondary">
            Add Food Item
          </h3>
          <div className="flex items-center space-x-4">
            <select
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-Quaternary focus:border-Quaternary text-Grey"
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

            {selectedFood && (
              <input
                type="number"
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-Quaternary focus:border-Quaternary text-Grey"
                placeholder="Enter weight in grams"
                value={grams}
                onChange={(e) => setGrams(e.target.value)}
              />
            )}

            <button
              onClick={addFood}
              className="bg-Quaternary text-white font-semibold px-4 py-2 rounded-md hover:bg-Quaternary transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Add Custom Food Section */}
        <AddCustomFood addCustomFood={addCustomFood} />

        {/* Food List and Total Calories Section */}
        <div className="bg-Grey border border-Quaternary bg-opacity-40 backdrop-blur-lg shadow-xl rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold mb-4 text-white">
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
                  <span className="font-medium text-white">
                    {food.name} ({food.grams}g)
                  </span>
                  <span className="text-gray-400">
                    {food.calories} kcal, {food.protein}g protein, {food.fat}g
                    fat
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Total Summary */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-lg font-semibold text-white">
              Total Calories Consumed
            </span>
            <span className="text-lg font-bold text-Quaternary">
              {totalCalories} kcal
            </span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-semibold text-white">
              Total Protein
            </span>
            <span className="text-lg font-bold text-Quaternary">
              {totalProtein} g
            </span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-semibold text-white">Total Fat</span>
            <span className="text-lg font-bold text-Quaternary">
              {totalFat} g
            </span>
          </div>
          <button
            onClick={saveFoodLog}
            className="mt-6 w-full bg-Quaternary text-white font-semibold px-4 py-2 rounded-md hover:bg-Quaternary transition"
          >
            Save Food Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diet;
