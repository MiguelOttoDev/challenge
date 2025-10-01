import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [usuario, setUsuario] = useState("");
  const [perfil, setPerfil] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    const role = localStorage.getItem("perfil");
    setUsuario(user || "Usuário Desconhecido");
    setPerfil(role || "Perfil Desconhecido");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("perfil");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 flex flex-wrap items-center justify-between text-white shadow-md">
      <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
        <h1 className="text-xl font-semibold">{`Caixa - ${perfil}`}</h1>
        <p className="text-sm">Registro de vendas e atendimento ao cliente</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl" />
          <span className="font-semibold">{usuario}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent text-white hover:text-gray-200 border border-white py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Sair</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
