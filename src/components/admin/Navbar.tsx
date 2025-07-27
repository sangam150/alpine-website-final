import React from "react";

export default function Navbar() {
  return (
    <header className="h-16 w-full flex items-center justify-end px-6 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-20 md:ml-64">
      <div className="flex items-center space-x-4">
        {/* Placeholder for admin name/email */}
        <span className="font-medium text-gray-700">Admin User</span>
        {/* Optional: Add dark mode toggle here */}
      </div>
    </header>
  );
}
