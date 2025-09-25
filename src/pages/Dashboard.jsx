import AdminDashboard from "../components/AdminDashboard";
import SupermercadoDashboard from "../components/SupermercadoDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";  // Importando ícones

function Dashboard() {
  const [perfil, setPerfil] = useState("");
  const [usuario, setUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const perfil = localStorage.getItem("perfil");
    const usuario = localStorage.getItem("usuario");

    if (!perfil || !usuario) {
      navigate("/login"); // Redirecionar para login caso não haja perfil
    }

    setPerfil(perfil);
    setUsuario(usuario);
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Navbar />
      
      {/* Renderização condicional com base no perfil */}
      {perfil === "admin" && <AdminDashboard />}
      {perfil === "supermercado" && <SupermercadoDashboard />}
      {perfil === "funcionario" && <EmployeeDashboard />}
    </div>
  );
}

export default Dashboard