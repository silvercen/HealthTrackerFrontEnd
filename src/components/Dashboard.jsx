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
    ],
    workoutTypes: ["Running", "Cycling", "Yoga"],
    workoutCalories: [300, 400, 200],
  };

  const dietData = {
    totalCaloriesConsumed: 2200,
    meals: [
      { meal: "Breakfast", calories: 500 },
      { meal: "Lunch", calories: 800 },
      { meal: "Dinner", calories: 700 },
      { meal: "Snacks", calories: 200 },
    ],
    dailyCalories: [2000, 2200, 2300, 2100, 2400, 2500, 2200, 2100],
    mealLabels: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    mealCalories: [500, 800, 700, 200],
  };

  const wellbeingData = {
    hoursOfSleep: 7.5,
    waterIntake: 2.5,
    mood: "Good",
    weeklySleep: [7, 7.5, 8, 6.5, 7, 7.5, 8],
    sleepMood: [
      "Good",
      "Good",
      "Excellent",
      "Fair",
      "Good",
      "Good",
      "Excellent",
    ],
    sleepMoodCounts: [2, 1, 4],
  };

  const maintenanceCalories = 1800;

  const weeklyAverageCaloriesConsumed = (
    dietData.dailyCalories.reduce((a, b) => a + b, 0) /
    dietData.dailyCalories.length
  ).toFixed(1);
  const weeklyAverageCaloriesBurned = (
    fitnessData.workoutHistory.reduce((a, b) => a + b, 0) /
    fitnessData.workoutHistory.length
  ).toFixed(1);
  const weeklyAverageSleep = (
    wellbeingData.weeklySleep.reduce((a, b) => a + b, 0) /
    wellbeingData.weeklySleep.length
  ).toFixed(1);

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
    <div className="min-h-screen font-poppins p-8">
      <h1 className="text-3xl font-bold text-center text-Quaternary mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Fitness Section */}
        <div className="bg-Grey bg-opacity-40 backdrop-blur-lg p-6 rounded-lg shadow-md">
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
          <Line data={fitnessChartData} options={{ responsive: true }} />
          <h3 className="text-xl font-semibold text-Quaternary mt-6 mb-4">
            Workout Type Distribution
          </h3>
          <Pie data={fitnessPieChartData} options={{ responsive: true }} />
        </div>

        {/* Diet Section */}
        <div className="bg-Grey bg-opacity-40 backdrop-blur-lg p-6 rounded-lg shadow-md">
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
          <Bar data={dietChartData} options={{ responsive: true }} />
          <h3 className="text-xl font-semibold text-Quaternary mt-6 mb-4">
            Meal Calorie Distribution
          </h3>
          <Pie data={dietPieChartData} options={{ responsive: true }} />
        </div>

        {/* Wellbeing Section */}
        <div className="bg-Grey bg-opacity-40 backdrop-blur-lg p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-Quaternary mb-4">
            Wellbeing Overview
          </h2>
          <p className="font-semibold text-Secondary text-lg mb-4">
            Average Hours of Sleep: {wellbeingData.hoursOfSleep} hrs
          </p>
          <p className="font-semibold text-Secondary text-lg mb-4">
            Mood: {wellbeingData.mood}
          </p>
          <Line data={wellbeingChartData} options={{ responsive: true }} />
          <h3 className="text-xl font-semibold text-Quaternary mt-6 mb-4">
            Mood Distribution
          </h3>
          <Pie data={wellbeingPieChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-Grey bg-opacity-40 backdrop-blur-lg text-Secondary mt-8 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Weekly Summary</h2>
        <p className="font-medium">
          Average Daily Calories Consumed: {weeklyAverageCaloriesConsumed} kcal
          (
          <span className="text-Quaternary">
            {weeklyAverageCaloriesConsumed > maintenanceCalories
              ? "Above"
              : "Below"}{" "}
            Maintenance
          </span>
          )
        </p>
        <p className="font-medium">
          Average Daily Calories Burned: {weeklyAverageCaloriesBurned} kcal
        </p>
        <p className="font-medium">
          Average Daily Sleep: {weeklyAverageSleep} hrs
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
