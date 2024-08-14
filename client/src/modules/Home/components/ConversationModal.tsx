import React, { useState } from "react";

interface ConversationModalProps {
  isOpen: boolean;
  assistantName: string;
  conversation: { role: "user" | "system"; content: string }[];
  question: string;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({
  isOpen,
  assistantName,
  conversation,
  question,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 w-2/3 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
          Conversación con {assistantName}
        </h2>
        <div className="bg-gray-700 p-4 mt-4 h-64 overflow-y-auto rounded-lg">
          {conversation &&
            conversation.map((msg, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded-lg max-w-xs ${
                  msg.role === "user"
                    ? "bg-teal-500 ml-auto text-right"
                    : "bg-gray-600 mr-auto text-left"
                }`}
              >
                {msg.content}
              </div>
            ))}
        </div>

        <input
          onChange={onChange}
          type="text"
          value={question}
          placeholder="Preguntame algo.."
          className="w-full p-2 mt-4 bg-gray-700 text-white rounded-lg"
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg"
          >
            Cerrar
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2 ml-5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;
