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
  const [reportData,setReportData] = useState([]);
  const { isLoggedIn } = useAuth();
  // const [mockFitnessData, setMockFitnessData] = useState([]);
  // const [mockDietData, setMockDietData] = useState([]);
  // const [mockSleepData, setMockSleepData] = useState([]);

  const [fitnessWeekData, setFitnessWeekData] = useState([]);
  const [dietWeekData, setDietWeekData] = useState([]);
  const [sleepWeekData, setSleepWeekData] = useState([]);

  // Fetch user data from userService
  const fetchUserData = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found in session storage.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9088/user/${userId}/get-details`, // Use userId here directly
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const data = await response.json();
      setUserInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    const userId = sessionStorage.getItem("userId"); // Use userId here directly
    if (!userId) {
      setError("User ID not found in session storage.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [fitnessRes, dietRes, wellbeingRes] = await Promise.all([
        fetch(`http://localhost:9088/health/fitness/${userId}/get-workout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }),
        fetch(`http://localhost:9088/diet/${userId}/get-diet`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }),
        fetch(`http://localhost:9088/wellbeing/${userId}`, {
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

  const getLastWeekDates = () => {
    const today = new Date();
    const formatDate = (date) => {
      return date.toISOString().split("T")[0] + "T00:00:00";
    };
    const lastWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - i - 1);
      return formatDate(date);
    }).reverse();
    return { startDate: lastWeek[0], endDate: lastWeek[6] };
  };

  const { startDate, endDate } = getLastWeekDates();

const fetchReportData = async () => {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    setError("User ID not found in session storage.");
    setLoading(false);
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:9088/report/get-report/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch report data: ${response.statusText}`);
    }

    const data = await response.json();

    // Map Fitness Week Data
    setFitnessWeekData(
      data.fitness.map((item) => ({
        date: item.fitnessDate.split("T")[0], // Extract date part (YYYY-MM-DD)
        caloriesBurned: item.totalCaloriesBurned,
      }))
    );

    // Map Diet Week Data
    setDietWeekData(
      data.diet.map((item) => ({
        date: item.dietDate.split("T")[0], // Extract date part (YYYY-MM-DD)
        caloriesConsumed: item.totalCaloriesConsumed,
      }))
    );

    // Map Sleep Week Data
    setSleepWeekData(
      data.wellbeing.map((item) => ({
        date: item.wellbeingDate, // Already in YYYY-MM-DD format
        sleepHours: item.sleepTime,
        mood: item.mood,
      }))
    );
  } catch (error) {
    console.error("Error fetching report data:", error);
    setError("Failed to load weekly data. Please try again later.");
  }
};


  useEffect(() => {
    fetchUserData();
    fetchData();
    fetchReportData();
  }, [isLoggedIn]);

  console.log("Fitness Data:", fitnessData);
  console.log("Diet Data:", dietData);
  console.log("Wellbeing Data:", wellbeingData);

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

  // Prepare data for charts
  const fitnessChartData = {
    labels: fitnessWeekData ? fitnessWeekData.map((data) => data.date) : [],
    datasets: [
      {
        label: "Calories Burned",
        data: fitnessWeekData
          ? fitnessWeekData.map((data) => data.caloriesBurned)
          : [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dietChartData = {
    labels: dietWeekData ? dietWeekData.map((data) => data.date) : [],
    datasets: [
      {
        label: "Calories Consumed",
        data: dietWeekData ? dietWeekData.map((data) => data.caloriesConsumed) : [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const wellbeingChartData = {
    labels: sleepWeekData ? sleepWeekData.map((data) => data.date) : [],
    datasets: [
      {
        label: "Sleep Hours",
        data: sleepWeekData ? sleepWeekData.map((data) => data.sleepHours) : [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  console.log("Fitness week Data:", fitnessWeekData);
  console.log("Diet week Data:", dietWeekData);
  console.log("Wellbeing week Data:", sleepWeekData);
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
      <h1 className="text-4xl underline font-bold  text-center text-Quaternary mb-8">
        Dashboard
      </h1>
      {/* User Info Section */}
      <div className="bg-Grey bg-opacity-40 backdrop-blur-lg text-Secondary p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center">
        {/* User Details */}
        <div className="flex-1">
          <h2 className="text-5xl text-Quaternary font-medium mb-4">
            {userInfo.userName}
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
      <div className="grid grid-cols-1 font-poppins md:grid-cols-3 gap-4">
        {/* Fitness Section */}
        <div className="bg-White bg-Grey bg-opacity-40 backdrop-blur-lg border-2 border-Quaternary p-4 rounded-lg shadow-md">
          <h3 className="text-4xl font-semibold text-Quaternary mb-2">
            Fitness Details
          </h3>
          {fitnessData?.workoutList?.length > 0 ? (
            <ul className="text-Secondary">
              {fitnessData.workoutList.map((workout, index) => (
                <li key={index}>
                  <p>
                    <strong>Workout:</strong> {workout.workoutName} (
                    {workout.workoutType})
                  </p>
                  <p>
                    <strong>Calories Burned:</strong> {workout.caloriesBurned}{" "}
                    kcal
                  </p>
                </li>
              ))}
              <li className="font-bold text-2xl">
                Total Calories Burned:{" "}
                <span className="text-Quaternary">
                  {fitnessData.totalCaloriesBurned}
                </span>{" "}
                kcal
              </li>
            </ul>
          ) : (
            <p className="text-Secondary">No workouts logged today.</p>
          )}
        </div>

        {/* Diet Section */}
        <div className="bg-White bg-Grey bg-opacity-40 backdrop-blur-lg border-2 border-Quaternary p-4 rounded-lg shadow-md">
          <h3 className="text-4xl font-semibold text-Quaternary mb-2">
            Diet Details
          </h3>
          {dietData?.foodList?.length > 0 ? (
            <ul className="text-Secondary">
              {dietData.foodList.map((food, index) => (
                <li key={index}>
                  <p>
                    <strong>Food:</strong> {food.foodName}
                  </p>
                  <p>
                    <strong>Weight:</strong> {food.foodGrams}gm
                  </p>
                  <p>
                    <strong>Protein:</strong> {food.foodProtein}gm
                  </p>
                  <p>
                    <strong>Fats:</strong> {food.foodFat}gm
                  </p>
                  <p>
                    <strong>Calories Consumed:</strong> {food.avgCalories}
                    kcal
                  </p>
                </li>
              ))}
              <li className="font-bold text-2xl">
                Total Calories Consumed:{" "}
                <span className="text-Quaternary">
                  {dietData.totalCaloriesConsumed}{" "}
                </span>
                kcal
              </li>
            </ul>
          ) : (
            <p className="text-Secondary">No meals logged today.</p>
          )}
        </div>

        {/* Wellbeing Section */}
        <div className="bg-White bg-Grey bg-opacity-40 backdrop-blur-lg border-2 border-Quaternary p-4 rounded-lg shadow-md">
          <h3 className="text-4xl font-semibold text-Quaternary mb-2">
            Wellbeing Details
          </h3>
          <p className="text-Secondary">
            <strong>Mood:</strong> {wellbeingData?.mood || "Not logged"}
          </p>
          <p className="text-Secondary">
            <strong>Sleep Time:</strong>{" "}
            {wellbeingData?.sleepTime || "Not logged"} hrs
          </p>
        </div>
      </div>
      {/* Calorie Balance Section */}
      <div className="bg-White bg-Grey bg-opacity-40 backdrop-blur-lg border-2 border-Quaternary p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-4xl font-semibold text-Quaternary mb-2">
          Calorie Balance
        </h3>
        {dietData && fitnessData ? (
          <div className="text-Secondary">
            <p>
              <strong>Total Calories Consumed:</strong>{" "}
              <span className="text-Quaternary">
                {dietData.totalCaloriesConsumed}
              </span>{" "}
              kcal
            </p>
            <p>
              <strong>Total Calories Burned:</strong>{" "}
              <span className="text-Quaternary">
                {fitnessData.totalCaloriesBurned}
              </span>{" "}
              kcal
            </p>
            <p>
              <strong>Net Calories:</strong>{" "}
              <span className="text-Quaternary">
                {dietData.totalCaloriesConsumed -
                  fitnessData.totalCaloriesBurned}
              </span>{" "}
              kcal
            </p>
            <p>
              <strong>Maintenance Calories:</strong>{" "}
              <span className="text-Quaternary">
                {caloriesRequired.toFixed(1)}
              </span>{" "}
              kcal
            </p>
            <p className="mt-4">
              <strong>Result:</strong>{" "}
              {(() => {
                const netCalories =
                  dietData.totalCaloriesConsumed -
                  fitnessData.totalCaloriesBurned;
                if (netCalories > caloriesRequired) {
                  return (
                    <span className="text-Quaternary font-bold">
                      You are in a calorie surplus.{" "}
                      {userInfo.journey === "Weight Loss"
                        ? "This may hinder weight loss."
                        : userInfo.journey === "Weight Gain"
                        ? "Great for gaining weight!"
                        : "You may gain weight."}
                    </span>
                  );
                } else if (netCalories < caloriesRequired) {
                  return (
                    <span className="text-Quaternary font-bold">
                      You are in a calorie deficit.{" "}
                      {userInfo.journey === "Weight Loss"
                        ? "This is ideal for weight loss!"
                        : userInfo.journey === "Weight Gain"
                        ? "This may hinder weight gain."
                        : "You may lose weight."}
                    </span>
                  );
                } else {
                  return (
                    <span className="text-Quaternary font-bold">
                      You are meeting your maintenance calories.{" "}
                      {userInfo.journey === "Weight Loss"
                        ? "Consider reducing your calories for weight loss."
                        : userInfo.journey === "Weight Gain"
                        ? "Consider increasing your calories for weight gain."
                        : "You are maintaining your weight."}
                    </span>
                  );
                }
              })()}
            </p>
          </div>
        ) : (
          <p className="text-Secondary">Calorie data is not available.</p>
        )}
      </div>
      <h1 className="text-3xl underline font-semibold mt-6 text-center text-Quaternary mb-8">
        Dashboard - Weekly Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fitness Chart */}
        <div className="bg-White bg-Grey bg-opacity-40 backdrop-blur-lg  p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-Quaternary mb-4">
            Weekly Fitness Report
          </h2>
          <Bar data={fitnessChartData} options={{ responsive: true }} />
        </div>

        {/* Diet Chart */}
        <div className="bg-White bg-Grey bg-opacity-40 backdrop-blur-lg  p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-Quaternary mb-4">
            Weekly Diet Report
          </h2>
          <Line data={dietChartData} options={{ responsive: true }} />
        </div>

        {/* Sleep Chart */}
        <div className="bg-White bg-Grey bg-opacity-40 backdrop-blur-lg  p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-Quaternary mb-4">
            Weekly Sleep Report
          </h2>
          <Bar data={wellbeingChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
