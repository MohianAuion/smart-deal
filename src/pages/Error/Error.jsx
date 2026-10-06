import React from "react";
import { Link } from "react-router";
import { FaShoppingBag, FaHome, FaArrowLeft } from "react-icons/fa";

const Error = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-5">
      <div className="text-center max-w-lg">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-3xl bg-yellow-100 flex items-center justify-center">
            <FaShoppingBag className="text-5xl text-yellow-500" />
          </div>
        </div>

        {/* Error Number */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-gray-800">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-3">
          Oops! This deal is missing.
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-4 leading-relaxed">
          Looks like the page you're looking for has gone out of stock,
          moved somewhere else, or never existed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">

          <Link
            to="/"
            className="btn bg-yellow-400 hover:bg-yellow-500 border-none text-gray-900 px-6"
          >
            <FaHome />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-outline px-6"
          >
            <FaArrowLeft />
            Go Back
          </button>

        </div>

        {/* Brand */}
        <p className="mt-10 text-sm text-gray-400">
          Smart Deal — Find it. Buy it. Love it.
        </p>

      </div>
    </div>
  );
};

export default Error;