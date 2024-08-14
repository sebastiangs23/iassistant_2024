import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../style/index.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import loginAudio from "../../../assets/sounds/approve_sound.mp3";
import errorAudio from "../../../assets/sounds/fail_sound.mp3";
const api = import.meta.env.VITE_API_LOCAL;

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  /*__________________________
    |  REQUEST TO THE SERVER  */
  async function loginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${api}/users/${inputs.email}/${inputs.password}`
      );

      if (response.data.status === "success") {
        const notify = () =>
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
          });
        
        navigate("/home")
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("id_user", response.data.id_user);
        notify();
        playSound(response.data.status);

      } else if (response.data.status === "error") {
        const notify = () =>
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
          });

        notify();
        playSound(response.data.status);
      }
    } catch (error) {
      console.log(error);
      const notify = () =>
        toast.error("error", {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });

      notify();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  /*______________
  |  FUNCTIONS  */
  function playSound(type: string) {
    switch (type) {
      case "success": {
        const audio = new Audio(loginAudio);
        audio.play();
        break;
      }
      case "error": {
        const audio = new Audio(errorAudio);
        audio.play();
        break;
      }
    }
  }

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>

        <form className="space-y-4" onSubmit={loginUser}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
