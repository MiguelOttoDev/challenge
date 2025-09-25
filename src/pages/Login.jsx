import { useState } from "react";
import { FaUser, FaLock, FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario || !senha || !perfil) {
      toast.error("Por favor, preencha todos os campos.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Salvar no localStorage
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("perfil", perfil);

    toast.success("Login realizado com sucesso! Redirecionando...", {
      position: "top-right",
      autoClose: 2000,
      onClose: () => {
        if (perfil === "admin" || perfil === "supermercado" || perfil === "operador") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500 p-4 rounded-full text-white text-2xl">
            <FaShoppingCart />
          </div>
        </div>

        <h2 className="text-center text-2xl font-semibold">Sistema Supermercado</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Faça login para acessar o sistema
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Perfil</label>
            <select
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
            >
              <option value="">Selecione seu perfil</option>
              <option value="admin">Administrador</option>
              <option value="supermercado">Supermercado</option>
              <option value="operador">Operador</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
