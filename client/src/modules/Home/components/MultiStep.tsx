import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";

const api = import.meta.env.VITE_API_LOCAL;

interface MultiStepFormProps {
  closeModal: () => void;
  refresh: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ closeModal, refresh }) => {
  const [idUser, setIdUser] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const id_user = localStorage.getItem("id_user");
    setIdUser(id_user);
  }, []);

  useEffect(() => {
    setAssistant((prevAssistant) => ({
      ...prevAssistant,
      id_user: idUser,
    }));
  }, [idUser]);

  const [step, setStep] = useState(1);
  const [assistant, setAssistant] = useState({
    name: "",
    id_user: idUser,
    speciality: "",
    help: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  /*__________________________
  |  REQUEST TO THE SERVER  */
  async function createAssistant(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      const response = await axios.post(`${api}/assistants`, {
        data: assistant,
      });

      console.log(response.data);
      setShowConfetti(true);

      //Manejar de una mejor manera luego este asyncronismo
      setTimeout(() => {
        setShowConfetti(false);
        closeModal();
        refresh();
      }, 2500); 
    } catch (error) {
      console.log(error);
    }
  }

  /*______________
  |  FUNCTIONS  */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAssistant((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={createAssistant}>
      {showConfetti && <Confetti width={1000} height={600} />}

      <div className="flex justify-end mt-6">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg"
        >
          Cerrar
        </button>
      </div>
      {step === 1 && (
        <div>
          <h3 className="text-xl font-semibold">
            Paso 1: ¿Como quieres que se llame tu asistente?
          </h3>

          <input
            type="text"
            id="name"
            placeholder="Ejemplo: Camilla"
            className="w-full p-2 mt-4 bg-gray-700 text-white rounded-lg"
            value={assistant.name}
            onChange={handleChange}
          />
          <button
            onClick={nextStep}
            className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg"
          >
            Siguiente
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3 className="text-xl font-semibold">
            Paso 2: ¿En que quieres que sea especialista?
          </h3>
          <input
            type="text"
            id="speciality"
            placeholder="Ejemplo: 'Programación'"
            className="w-full p-2 mt-4 bg-gray-700 text-white rounded-lg"
            value={assistant.speciality}
            onChange={handleChange}
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg"
            >
              Atras
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-semibold">
            Paso 3: ¿En que quieres que te ayude?
          </h3>
          <input
            type="text"
            id="help"
            placeholder="Ejemplo: Subir de seniority"
            className="w-full p-2 mt-4 bg-gray-700 text-white rounded-lg"
            value={assistant.help}
            onChange={handleChange}
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg"
            >
              Atras
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <h3 className="text-xl font-semibold">Paso 4</h3>
          <p className="mt-4">Revisa la información y envíala.</p>
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg"
            >
              Atras
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg"
            >
              Crear asistente
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default MultiStepForm;
