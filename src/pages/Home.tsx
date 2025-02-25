import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-black mb-4">Welcome to the Dashboard</h1>

      <div className="space-x-4">
        <Link to="/users" className="px-4 py-2 bg-blue text-white rounded-lg shadow-md">
          Users
        </Link>
        <Link to="/products" className="px-4 py-2 bg-yellow text-black rounded-lg shadow-md">
          Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
