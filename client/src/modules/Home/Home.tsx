import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "./components/MultiStep";
import EditAssistantModal from "./components/UpdateAssistant";
import ConversationModal from "./components/ConversationModal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const api = import.meta.env.VITE_API_LOCAL;

import IAssistants from "../../interfaces/IAssistances";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [assistants, setassistants] = useState<IAssistants[]>([]);
  const [selectedAssistant, setSelectedAssistant] =
    useState<IAssistants | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [conversation, setConversation] = useState<
    { role: "user" | "system"; content: string }[]
  >([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssistant(null);
  };

  const openEditModal = (assistant: IAssistants) => {
    setSelectedAssistant(assistant);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAssistant(null);
  };

  const handleSaveEdit = (updatedAssistant: IAssistants) => {
    setassistants((prev) =>
      prev.map((item) =>
        item._id === updatedAssistant._id ? updatedAssistant : item
      )
    );
  };

  const handleDelete = async (assistantId: string) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este asistente?")
    ) {
      try {
        const response = await axios.delete(`${api}/assistants/delete/${assistantId}`);

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

          getAssistants();
      } catch (error) {
        console.log("Error al eliminar el asistente:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      console.log("No encoentro el token");
      navigate("/");
    }

    getAssistants();
  }, []);

  /*_________________________
    |  REQUEST TO THE SERVER  */
  async function getAssistants() {
    try {
      const id_user = localStorage.getItem("id_user");
      const response = await axios.get(`${api}/assistants/${id_user}`);

      setassistants(response.data.assistants);
    } catch (error) {
      console.log(error);
    }
  }

  async function askAssistant() {
    try {
      const currentQuestion = question.trim();
      setQuestion("");

      if (!currentQuestion) {
        console.log("La pregunta está vacía. No se enviará la solicitud.");
        return;
      }

      if (!selectedAssistant || !selectedAssistant._id) {
        console.log(
          "No hay un asistente seleccionado. No se enviará la solicitud."
        );
        return;
      }

      let data;
      if (!conversation || conversation.length === 0) {
        data = {
          _id: selectedAssistant._id,
          initial: currentQuestion,
        };
      } else {
        data = {
          _id: selectedAssistant._id,
          initial: currentQuestion,
          conversationHistory: conversation,
        };
      }

      const response = await axios.post(`${api}/assistants/chat`, data);

      setConversation((prev) => [
        ...(prev || []), //Parchar el bug
        { role: "user", content: currentQuestion },
        { role: "system", content: response.data.system },
      ]);
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  }

  const handleAssistantClick = async (assistant: IAssistants) => {
    try {
      setSelectedAssistant(assistant);
      setIsModalOpen(true);

      setConversation(assistant.conversation);
    } catch (error) {
      console.log("Error al obtener la conversación:", error);
    }
  };

  const handleChange = (e: any) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <ToastContainer />

      {/* ASISTENTES SIDEBAR */}
      <div className="w-1/4 bg-gray-800 p-4 space-y-4">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
          IAsistentes
        </h2>

        <ul className="space-y-2">
          {assistants &&
            assistants.map((item) => {
              return (
                <li
                  key={item._id}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer flex justify-between items-center"
                >
                  <span onClick={() => handleAssistantClick(item)}>
                    {item.name}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                    >
                      Borrar
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>

      {/* PRINCIPAL */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
          Crea y personaliza tu propi@ asistente!
        </h1>
        <p className="mt-4 text-lg">Haz click aquí.</p>
        <button
          onClick={openModal}
          className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg"
        >
          Crear Asistente
        </button>
      </div>

      {/* MODAL CONVERSACIÓN */}
      {isModalOpen && selectedAssistant && (
        <ConversationModal
          isOpen={isModalOpen}
          assistantName={selectedAssistant.name}
          conversation={conversation}
          question={question}
          onClose={closeModal}
          onChange={handleChange}
          onSubmit={askAssistant}
        />
      )}

      {/* MODAL EDICIÓN */}
      {isEditModalOpen && selectedAssistant && (
        <EditAssistantModal
          assistant={selectedAssistant}
          onClose={closeEditModal}
          onSave={handleSaveEdit}
        />
      )}

      {/* MODAL MULTISTEPPER */}
      {isModalOpen && !selectedAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 w-2/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
              IAssistant
            </h2>
            <MultiStepForm closeModal={closeModal} refresh={getAssistants} />
          </div>
        </div>
      )}
    </div>

  );
};

export default Home;
