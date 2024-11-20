import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar, Line, Pie } from "react-chartjs-2";
import IconGym from "../assets/IconGym";
import IconFoodOutline from "../assets/IconFoodOutline";
import IconMentalHealthFill from "../assets/IconMentalHealthFill";
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
import { useAuth } from "./AuthContext";

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
  const [userInfo, setUserInfo] = useState(null);
  const [fitnessData, setFitnessData] = useState(null);
  const [dietData, setDietData] = useState(null);
  const [wellbeingData, setWellbeingData] = useState(null);
  const [todaysLog, setTodaysLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  // Fetch user data from userService
const fetchData = async () => {
  const userId = sessionStorage.getItem("userId");
  try {
    setLoading(true);

    const [fitnessRes, dietRes, wellbeingRes] = await Promise.all([
      fetch(`https://localhost:9088/health/fitness/${userId}/get-workout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      fetch(`https://localhost:9088/diet/${userId}/get-diet`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      fetch(`https://localhost:9088/wellbeing/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
    ]);

    if (!fitnessRes.ok || !dietRes.ok || !wellbeingRes.ok) {
      throw new Error("Failed to fetch data from one or more services.");
    }

    const [fitnessData, dietData, wellbeingData] = await Promise.all([
      fitnessRes.json(),
      dietRes.json(),
      wellbeingRes.json(),
    ]);

    setFitnessData(fitnessData);
    setDietData(dietData);
    setWellbeingData(wellbeingData);

    // Directly access the first available log (if any)
    const todaysWorkout =
      fitnessData.logs?.[0]?.workout || "No workout logged.";
    const todaysFood = dietData.logs?.[0]?.food || "No meals logged.";
    const todaysMood = wellbeingData.logs?.[0]?.mood || "No mood logged.";

    setTodaysLog({
      workout: todaysWorkout,
      food: todaysFood,
      mood: todaysMood,
    });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchUserData();
    fetchData();
  }, [isLoggedIn]);

  // Render logic
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Calculate BMR and calories required
  const calculateBMR = () => {
    if (!userInfo) return 0;
    const { weight, height, age, gender } = userInfo;
    if (gender === "Male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const bmr = userInfo ? calculateBMR() : 0;

  const caloriesRequired = userInfo
    ? (() => {
        switch (userInfo.journey) {
          case "Weight Loss":
            return Math.max(1200, bmr * 0.8); // Ensure a safe calorie floor of 1200
          case "Weight Gain":
            return bmr * 1.2;
          case "Maintenance":
          default:
            return bmr;
        }
      })()
    : 0;

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // const fitnessData = {
  //   totalWorkouts: 20,
  //   totalCaloriesBurned: 1500,
  //   recentWorkouts: [
  //     { name: "Running", duration: "30 mins", caloriesBurned: 300 },
  //     { name: "Cycling", duration: "45 mins", caloriesBurned: 400 },
  //     { name: "Yoga", duration: "60 mins", caloriesBurned: 200 },
  //   ],
  //   workoutHistory: [
  //     300, 400, 500, 600, 700, 800, 750, 600, 500, 400, 300, 600,
  //   ],
  //   workoutTypes: ["Running", "Cycling", "Yoga"],
  //   workoutCalories: [300, 400, 200],
  // };

  // const dietData = {
  //   totalCaloriesConsumed: 2200,
  //   meals: [
  //     { meal: "Breakfast", calories: 500 },
  //     { meal: "Lunch", calories: 800 },
  //     { meal: "Dinner", calories: 700 },
  //     { meal: "Snacks", calories: 200 },
  //   ],
  //   dailyCalories: [2000, 2200, 2300, 2100, 2400, 2500, 2200, 2100],
  //   mealLabels: ["Breakfast", "Lunch", "Dinner", "Snacks"],
  //   mealCalories: [500, 800, 700, 200],
  // };

  // const wellbeingData = {
  //   hoursOfSleep: 7.5,
  //   waterIntake: 2.5,
  //   mood: "Good",
  //   weeklySleep: [7, 7.5, 8, 6.5, 7, 7.5, 8],
  //   sleepMood: [
  //     "Good",
  //     "Good",
  //     "Excellent",
  //     "Fair",
  //     "Good",
  //     "Good",
  //     "Excellent",
  //   ],
  //   sleepMoodCounts: [2, 1, 4],
  // };

  // Utility to format the date (YYYY-MM-DD)
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Today's date
  const todayDate = formatDate(new Date());

  // Mock data for daily activity
  const dailyLogs = [
    {
      date: "2024-11-18", // Update to match today's date
      workout: "Running - 30 mins",
      food: "Breakfast - 500 kcal, Lunch - 800 kcal, Dinner - 700 kcal",
      mood: "Excellent",
    },
    {
      date: "2024-11-17",
      workout: "Cycling - 45 mins",
      food: "Snacks - 200 kcal",
      mood: "Good",
    },
    {
      date: "2024-11-16",
      workout: "Yoga - 60 mins",
      food: "Dinner - 700 kcal",
      mood: "Fair",
    },
  ];

  // Find today's log
  // const todaysLog = dailyLogs.find((log) => log.date === todayDate);

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
  // Mock user data
  // const userInfo = {
  //   username: "John Doe",
  //   age: 30,
  //   weight: 70, // in kg
  //   height: 175, // in cm
  //   gender: "Male", // "Male" or "Female"
  //   journey: "Weight Loss", // "Maintenance", "Weight Loss", "Weight Gain"
  // };

  // Calculate BMR
  // const calculateBMR = () => {
  //   const { weight, height, age, gender } = userInfo;
  //   if (gender === "Male") {
  //     return 10 * weight + 6.25 * height - 5 * age + 5;
  //   } else {
  //     return 10 * weight + 6.25 * height - 5 * age - 161;
  //   }
  // };

  // const bmr = calculateBMR();

  // // Adjust BMR based on journey type
  // const caloriesRequired = (() => {
  //   switch (userInfo.journey) {
  //     case "Weight Loss":
  //       return Math.max(1200, bmr * 0.8); // Ensure a safe calorie floor of 1200
  //     case "Weight Gain":
  //       return bmr * 1.2;
  //     case "Maintenance":
  //     default:
  //       return bmr;
  //   }
  // })();

  // Check if user details are incomplete
  const isUserDetailsComplete =
    userInfo &&
    userInfo.weight &&
    userInfo.height &&
    userInfo.age &&
    userInfo.gender &&
    userInfo.journey;

  if (!isUserDetailsComplete) {
    return (
      <div className="min-h-screen font-poppins p-8 text-center">
        <h1 className="text-3xl text-Quaternary font-bold mb-4">
          Complete Your Profile
        </h1>
        <p className="text-Secondary text-lg">
          Please update your account details in the{" "}
          <Link
            to="/account"
            className="text-Quaternary font-medium underline hover:text-primary"
          >
            Account Page
          </Link>{" "}
          to access your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-poppins p-8">
      <h1 className="text-5xl underline font-bold  text-center text-Quaternary mb-8">
        Dashboard
      </h1>
      {/* User Info Section */}
      <div className="bg-Grey bg-opacity-40 backdrop-blur-lg text-Secondary p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center">
        {/* User Details */}
        <div className="flex-1">
          <h2 className="text-5xl text-Quaternary font-medium mb-4">
            {userInfo.username}
          </h2>

          <p className="mb-2">
            <strong className="text-2xl font-medium pr-2">Age:</strong>{" "}
            <span className="text-2xl">{userInfo.age} years</span>
          </p>
          <p className="mb-2">
            <strong className="text-2xl font-medium pr-2">Weight:</strong>
            <span className="text-2xl"> {userInfo.weight} </span>
            kg
          </p>
          <p className="mb-2">
            <strong className="text-2xl font-medium pr-2">Height:</strong>{" "}
            <span className="text-2xl">{userInfo.height} </span>
            cm
          </p>
          <p className="mb-2">
            <strong className="text-2xl font-medium pr-2">Gender:</strong>{" "}
            <span className="text-2xl">{userInfo.gender}</span>
          </p>
          <p className="mb-2">
            <strong className="text-2xl font-medium pr-2">Journey:</strong>{" "}
            <span className="text-2xl">{userInfo.journey}</span>
          </p>
          <p className="mt-4">
            <strong className="text-2xl font-medium pr-2">
              Maintenance Calories:
            </strong>{" "}
            <span className="text-2xl">{caloriesRequired.toFixed(1)} kcal</span>
          </p>
        </div>

        {/* User Image */}
        <div className="flex-1 flex justify-center mt-6 md:mt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="rounded-full text-Secondary bg-opacity-40 shadow-lg w-48 h-48 object-cover border-4 border-Quaternary"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Today's Activity Section */}
      {/* Today's Activity Section */}
      <div className="bg-Grey bg-opacity-40 backdrop-blur-lg mt-8 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-Quaternary mb-4">
          Today's Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Workout Card */}
          <div className="bg-White border-2 border-Quaternary hover:scale-105 transition p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-Quaternary mb-2">
              Workout
            </h3>
            <p className="text-Secondary">{todaysLog?.workout}</p>
          </div>

          {/* Diet Card */}
          <div className="bg-White border-2 hover:scale-105 transition border-Quaternary p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-Quaternary mb-2">Diet</h3>
            <p className="text-Secondary">{todaysLog?.food}</p>
          </div>

          {/* Mood Card */}
          <div className="bg-White p-4 border-2 hover:scale-105 transition border-Quaternary rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-Quaternary mb-2">Mood</h3>
            <p className="text-Secondary">{todaysLog?.mood}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-8 md:grid-cols-3 gap-8">
        {/* Fitness Section */}
        <div className="bg-Grey hover:scale-105 transition bg-opacity-40 backdrop-blur-lg p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-Quaternary mb-4 flex items-center space-x-2">
            Fitness Overview <IconGym />
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
          {/* <h3 className="text-xl font-semibold text-Quaternary mt-6 mb-4">
            Workout Type Distribution
          </h3> */}
          {/* <Pie data={fitnessPieChartData} options={{ responsive: true }} /> */}
        </div>

        {/* Diet Section */}
        <div className="bg-Grey bg-opacity-40 hover:scale-105 transition backdrop-blur-lg p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-Quaternary mb-4 flex items-center space-x-2">
            Diet Overview <IconFoodOutline />
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
          {/* <h3 className="text-xl font-semibold text-Quaternary mt-6 mb-4">
            Meal Calorie Distribution
          </h3> */}
          {/* <Pie data={dietPieChartData} options={{ responsive: true }} /> */}
        </div>

        {/* Wellbeing Section */}
        <div className="bg-Grey bg-opacity-40 hover:scale-105 transition backdrop-blur-lg p-6 rounded-lg shadow-md ">
          <h2 className="text-2xl font-semibold text-Quaternary mb-4 flex items-center space-x-2 ">
            Wellbeing Overview <IconMentalHealthFill />
          </h2>
          <p className="font-semibold text-Secondary text-lg mb-4">
            Average Hours of Sleep: {wellbeingData.hoursOfSleep} hrs
          </p>
          <p className="font-semibold text-Secondary text-lg mb-4">
            Mood: {wellbeingData.mood}
          </p>
          <Line data={wellbeingChartData} options={{ responsive: true }} />
          {/* <h3 className="text-xl font-semibold text-Quaternary mt-6 mb-4">
            Mood Distribution
          </h3> */}
          {/* <Pie data={wellbeingPieChartData} options={{ responsive: true }} /> */}
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
