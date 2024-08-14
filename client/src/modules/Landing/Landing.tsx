import React, { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Landing: React.FC = () => {

    const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
          IAssistant
        </h2>
        <h4 className="text-xl font-semibold text-teal-400 tracking-wide border-b-2 border-teal-400 pb-2">
          Bienvenido
        </h4>

        <h4 className="text-xl font-semibold text-teal-400 pb-2">
          Crea tu asistente con inteligencia artificial y entrenalo!
        </h4>

        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${isSignIn ? "bg-teal-500 text-white" : "bg-gray-600 text-gray-200"} hover:bg-teal-600`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 rounded ${!isSignIn ? "bg-teal-500 text-white" : "bg-gray-600 text-gray-200"} hover:bg-teal-600`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {isSignIn ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default Landing;
