import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Inicio from "./pages/Inicio";
import Usuarios from "./pages/Usuarios";
import Clientes from "./pages/Clientes";
import Servicios from "./pages/Servicios";
import Proyectos from "./pages/Proyectos";
import Comentarios from "./pages/Comentarios";
import Calificaciones from "./pages/Calificaciones";
import Historial from "./pages/Historial";
import PortalCliente from "./pages/PortalCliente";

// NUEVAS PÁGINAS CLIENTE
import MisComentarios from "./pages/MisComentarios";
import MisCalificaciones from "./pages/MisCalificaciones";

import "./styles/estilos.css";


// ===============================
// PROTECCIÓN DE RUTAS
// ===============================

function RutaProtegida({ children }) {

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;

}


// ===============================
// APP
// ===============================

function App() {

  const usuario = localStorage.getItem("usuario");

  return (

    <Router>

      <div className="app-viewport-full">

        {
          usuario && <Navbar />
        }

        <main className="app-content">

          <Routes>

            {/* PORTAL CLIENTE */}

            <Route
              path="/portal-cliente"
              element={
                <RutaProtegida>
                  <PortalCliente />
                </RutaProtegida>
              }
            />

            {/* NUEVAS RUTAS CLIENTE */}

            <Route
              path="/mis-comentarios"
              element={
                <RutaProtegida>
                  <MisComentarios />
                </RutaProtegida>
              }
            />

            <Route
              path="/mis-calificaciones"
              element={
                <RutaProtegida>
                  <MisCalificaciones />
                </RutaProtegida>
              }
            />

            {/* LOGIN */}

            <Route
              path="/login"
              element={<Login />}
            />

            {/* SISTEMA */}

            <Route
              path="/dashboard"
              element={
                <RutaProtegida>
                  <Dashboard />
                </RutaProtegida>
              }
            />

            <Route
              path="/inicio"
              element={
                <RutaProtegida>
                  <Inicio />
                </RutaProtegida>
              }
            />

            <Route
              path="/usuarios"
              element={
                <RutaProtegida>
                  <Usuarios />
                </RutaProtegida>
              }
            />

            <Route
              path="/clientes"
              element={
                <RutaProtegida>
                  <Clientes />
                </RutaProtegida>
              }
            />

            <Route
              path="/servicios"
              element={
                <RutaProtegida>
                  <Servicios />
                </RutaProtegida>
              }
            />

            <Route
              path="/proyectos"
              element={
                <RutaProtegida>
                  <Proyectos />
                </RutaProtegida>
              }
            />

            <Route
              path="/comentarios/:id"
              element={
                <RutaProtegida>
                  <Comentarios />
                </RutaProtegida>
              }
            />

            <Route
              path="/calificaciones/:id"
              element={
                <RutaProtegida>
                  <Calificaciones />
                </RutaProtegida>
              }
            />

            <Route
              path="/historial"
              element={
                <RutaProtegida>
                  <Historial />
                </RutaProtegida>
              }
            />

            {/* REDIRECCIÓN */}

            <Route
              path="*"
              element={
                <Navigate
                  to={
                    usuario
                      ? "/dashboard"
                      : "/login"
                  }
                />
              }
            />

          </Routes>

        </main>

      </div>

    </Router>

  );

}

export default App;