import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
