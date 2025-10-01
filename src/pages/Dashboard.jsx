import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import SupermercadoDashboard from "../components/SupermercadoDashboard";
import Operador from "../components/Operador";
import Navbar from "../components/NavBar";

function Dashboard() {
  const [perfil, setPerfil] = useState("");
  const [usuario, setUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const perfil = localStorage.getItem("perfil");
    const usuario = localStorage.getItem("usuario");

    if (!perfil || !usuario) {
      navigate("/login");
    }

    setPerfil(perfil);
    setUsuario(usuario);
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Navbar />

      {perfil === "admin" && <AdminDashboard />}
      {perfil === "supermercado" && <SupermercadoDashboard />}
      {perfil === "operador" && <Operador />}
    </div>
  );
}

export default Dashboard;
