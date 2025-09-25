import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [usuario, setUsuario] = useState("");
  const [perfil, setPerfil] = useState("");

  useEffect(() => {
    // Carregar as informações do usuário e perfil do localStorage
    const user = localStorage.getItem("usuario");
    const role = localStorage.getItem("perfil");
    setUsuario(user || "Usuário Desconhecido");
    setPerfil(role || "Perfil Desconhecido");
  }, []);

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center text-white">
      <div className="flex items-center">
        <FaUserCircle className="text-3xl mr-3" />
        <span className="font-semibold text-lg">{usuario}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-3">{perfil}</span>
        <button className="bg-transparent text-white hover:text-gray-200 border border-white py-1 px-4 rounded-lg">
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
