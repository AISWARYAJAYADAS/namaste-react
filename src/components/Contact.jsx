import React from "react";

export const Contact = () => {
  return (
    // Add horizontal margin classes to the outer container
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:px-8 lg:px-16">
      <div className="bg-white shadow-xl rounded-2xl px-12 py-16 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Contact Us
        </h1>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              className="w-full border border-gray-300 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Message</label>
            <input
              className="w-full border border-gray-300 px-5 py-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message"
              type="text"
            ></input>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3.5 font-semibold hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};