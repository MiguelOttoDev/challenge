import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl text-gray-700 mt-4">Página Não Encontrada</p>
        <p className="text-lg text-gray-500 mt-2">A página que você está procurando não existe.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
        >
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
}

export default NotFound;
