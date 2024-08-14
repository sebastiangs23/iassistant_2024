import React from "react";
import INotificationProps from "../interfaces/interfaces";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification: React.FC<INotificationProps> = ({ type, message }) => {
  const notify = () => {
    switch (type) {
      case "info": {
        toast.info(message, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      }
      case "success": {
        toast.success(message, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      }
      case "warning": {
        toast.warning(message, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      }
      case "error": {
        toast.error(message, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      }
      default: {
        toast(message, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      }
    }
  };

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
};

export default Notification;
