import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
  ArcElement
);

const Dashboard = () => {
  // Dummy data
  const fitnessData = {
    totalWorkouts: 20,
    totalCaloriesBurned: 1500,
    recentWorkouts: [
      { name: "Running", duration: "30 mins", caloriesBurned: 300 },
      { name: "Cycling", duration: "45 mins", caloriesBurned: 400 },
      { name: "Yoga", duration: "60 mins", caloriesBurned: 200 },
    ],
    workoutHistory: [
      300, 400, 500, 600, 700, 800, 750, 600, 500, 400, 300, 600,
    ], // Calories burned over months
    workoutTypes: ["Running", "Cycling", "Yoga"], // For Pie chart
    workoutCalories: [300, 400, 200], // Calories burned for each workout type
  };

  const dietData = {
    totalCaloriesConsumed: 2200,
    meals: [
      { meal: "Breakfast", calories: 500 },
      { meal: "Lunch", calories: 800 },
      { meal: "Dinner", calories: 700 },
      { meal: "Snacks", calories: 200 },
    ],
    dailyCalories: [2000, 2200, 2300, 2100, 2400, 2500, 2200, 2100], // Daily calorie consumption for the last 8 days
    mealLabels: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    mealCalories: [500, 800, 700, 200], // Calories for each meal type
  };

  const wellbeingData = {
    hoursOfSleep: 7.5,
    waterIntake: 2.5, // Liters
    mood: "Good",
    weeklySleep: [7, 7.5, 8, 6.5, 7, 7.5, 8], // Hours of sleep for the last 7 days
    sleepMood: [
      "Good",
      "Good",
      "Excellent",
      "Fair",
      "Good",
      "Good",
      "Excellent",
    ], // Mood for pie chart
    sleepMoodCounts: [2, 1, 4], // Count of mood types (Good, Fair, Excellent)
  };

  // Fitness Chart: Line Chart for Calories Burned Over Time
  const fitnessChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Calories Burned",
        data: fitnessData.workoutHistory,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  // Diet Chart: Bar Chart for Daily Calorie Consumption
  const dietChartData = {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
    ],
    datasets: [
      {
        label: "Calories Consumed",
        data: dietData.dailyCalories,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Wellbeing Chart: Line Chart for Sleep Hours Over a Week
  const wellbeingChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Hours of Sleep",
        data: wellbeingData.weeklySleep,
        fill: true,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        tension: 0.4,
      },
    ],
  };

  // Fitness Pie Chart: Workout Type Distribution
  const fitnessPieChartData = {
    labels: fitnessData.workoutTypes,
    datasets: [
      {
        data: fitnessData.workoutCalories,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Diet Pie Chart: Meal Calories Distribution
  const dietPieChartData = {
    labels: dietData.mealLabels,
    datasets: [
      {
        data: dietData.mealCalories,
        backgroundColor: ["#FF9F40", "#36A2EB", "#4BC0C0", "#FFCD56"],
        hoverBackgroundColor: ["#FF9F40", "#36A2EB", "#4BC0C0", "#FFCD56"],
      },
    ],
  };

  // Wellbeing Pie Chart: Mood Distribution
  const wellbeingPieChartData = {
    labels: ["Good", "Fair", "Excellent"],
    datasets: [
      {
        data: wellbeingData.sleepMoodCounts,
        backgroundColor: ["#FF9F40", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF9F40", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="min-h-screen font-poppins  p-8">
      <h1 className="text-3xl font-bold text-center text-Quaternary mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Fitness Section */}
        <div className="bg-Grey  bg-opacity-40 backdrop-blur-lg  p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-Quaternary mb-4">
            Fitness Overview
          </h2>
          <div className="mb-4 text-Secondary">
            <p className="font-semibold text-lg">
              Total Workouts: {fitnessData.totalWorkouts}
            </p>
            <p className="font-semibold text-lg">
              Total Calories Burned: {fitnessData.totalCaloriesBurned} kcal
            </p>
          </div>
          <h3 className="text-xl font-semibold text-Quaternary mb-2">
            Recent Workouts
          </h3>
          <ul>
            {fitnessData.recentWorkouts.map((workout, index) => (
              <li key={index} className="mb-2 text-Secondary">
                <p>
                  <strong>{workout.name}</strong> - {workout.duration},{" "}
                  {workout.caloriesBurned} kcal burned
                </p>
              </li>
            ))}
          </ul>
          {/* Fitness Line Graph */}
          <Line data={fitnessChartData} options={{ responsive: true }} />
          {/* Fitness Pie Chart */}
          <h3 className="text-xl font-semibold text-Quaternary mt-6 mb-4">
            Workout Type Distribution
          </h3>
          <Pie data={fitnessPieChartData} options={{ responsive: true }} />
        </div>

        {/* Diet Section */}
        <div className="bg-Grey  bg-opacity-40 backdrop-blur-lg  p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-Quaternary mb-4">
            Diet Overview
          </h2>
          <p className="font-semibold text-Secondary text-lg mb-4">
            Total Calories Consumed: {dietData.totalCaloriesConsumed} kcal
          </p>
          <h3 className="text-xl font-semibold text-Quaternary mb-2">Meals</h3>
          <ul>
            {dietData.meals.map((meal, index) => (
              <li key={index} className="mb-2 text-Secondary">
                <p>
                  <strong>{meal.meal}</strong> - {meal.calories} kcal
                </p>
              </li>
            ))}
          </ul>
          {/* Diet Bar Graph */}
          <Bar data={dietChartData} options={{ responsive: true }} />
          {/* Diet Pie Chart */}
          <h3 className="text-xl font-semibold text-Quaternary mt-6 mb-4">
            Meal Calorie Distribution
          </h3>
          <Pie data={dietPieChartData} options={{ responsive: true }} />
        </div>

        {/* Wellbeing Section */}
        <div className="bg-Grey bg-opacity-40 backdrop-blur-lg  p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-Quaternary mb-4">
            Wellbeing Overview
          </h2>
          <p className="font-semibold text-Secondary text-lg mb-4">
            Hours of Sleep: {wellbeingData.hoursOfSleep} hours
          </p>
          <p className="font-semibold text-Secondary text-lg mb-4">
            Water Intake: {wellbeingData.waterIntake} liters
          </p>
          <h3 className="text-xl font-semibold text-Quaternary mb-2">
            Weekly Sleep
          </h3>
          {/* Wellbeing Line Graph */}
          <Line data={wellbeingChartData} options={{ responsive: true }} />
          {/* Wellbeing Pie Chart */}
          <h3 className="text-xl font-semibold text-Quaternary mt-6 mb-4">
            Sleep Mood Distribution
          </h3>
          <Pie data={wellbeingPieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
