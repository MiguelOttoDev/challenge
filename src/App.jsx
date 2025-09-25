import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/contact" element={<h1>Contato</h1>} />
        <Route path="*" element={<h1>Página 404</h1>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
