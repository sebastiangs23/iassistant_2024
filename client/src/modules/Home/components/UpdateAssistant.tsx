import React, { useEffect } from "react";
import IAssistant from "../../../interfaces/IAssistances";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_LOCAL;

interface EditAssistantModalProps {
  assistant: IAssistant | null;
  onClose: () => void;
  onSave: (updatedAssistant: IAssistant) => void;
}

const EditAssistantModal: React.FC<EditAssistantModalProps> = ({
  assistant,
  onClose,
  onSave,
}) => {
  const [name, setName] = React.useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (assistant) {
      setName(assistant.name);
    }
  }, [assistant]);

  async function handleSave() {
    try {
      if (assistant) {
        onSave({ ...assistant, name });

        let data = {
          _id: assistant._id,
          name,
        };

        const response = await axios.put(`${api}/assistants/update`, { data });

        console.log(response.data);

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
          notify();
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
        }

        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
       <ToastContainer />
      <div className="bg-gray-800 w-1/3 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
          Editar Asistente
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mt-4 bg-gray-700 text-white rounded-lg"
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 ml-5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAssistantModal;
