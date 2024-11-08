import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side - Logo and App Name */}
            <div className="flex items-center">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="HealthTrackerApp logo"
              />
              <span className="text-black ml-2 text-lg font-semibold">
                HealthTrackerApp
              </span>
            </div>

            {/* Right side - Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#dashboard"
                className="text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#fitness"
                className="text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Fitness
              </a>
              <a
                href="#diet"
                className="text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Diet
              </a>
              <a
                href="#wellbeing"
                className="text-black hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Wellbeing
              </a>

              {/* Profile Photo */}
              <div className="relative">
                <img
                  className="h-8 w-8 rounded-full border-2 border-white hover:border-blue-500 cursor-pointer"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
  
};

export default Navbar;
