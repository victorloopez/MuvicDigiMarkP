import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/estilos.css";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const cerrarSesion = () => {

    localStorage.removeItem("usuario");

    navigate("/login");

  };

  return (

    <nav className="navbar">

      {/* MARCA */}

      <div className="navbar-brand">

        Muvic DigiMark

      </div>

      {/* MENU */}

      <ul className="navbar-links">

        {

          usuario?.rol === "Administrador" && (

            <>

              <li>

                <Link
                  className={
                    location.pathname === "/dashboard"
                    ? "active-link"
                    : ""
                  }
                  to="/dashboard"
                >

                  📊 Dashboard

                </Link>

              </li>

              <li>

                <Link
                  className={
                    location.pathname === "/inicio"
                    ? "active-link"
                    : ""
                  }
                  to="/inicio"
                >

                  🏠 Inicio

                </Link>

              </li>

              <li>

                <Link
                  className={
                    location.pathname === "/usuarios"
                    ? "active-link"
                    : ""
                  }
                  to="/usuarios"
                >

                  👥 Usuarios

                </Link>

              </li>

              <li>

                <Link
                  className={
                    location.pathname === "/clientes"
                    ? "active-link"
                    : ""
                  }
                  to="/clientes"
                >

                  🏢 Clientes

                </Link>

              </li>

              <li>

                <Link
                  className={
                    location.pathname === "/servicios"
                    ? "active-link"
                    : ""
                  }
                  to="/servicios"
                >

                  🛠 Servicios

                </Link>

              </li>

              <li>

                <Link
                  className={
                    location.pathname === "/proyectos"
                    ? "active-link"
                    : ""
                  }
                  to="/proyectos"
                >

                  📁 Proyectos

                </Link>

              </li>

            </>

          )

        }

        {

          usuario?.rol === "Cliente" && (

            <>

              <li>

                <Link
                  className={
                    location.pathname === "/portal-cliente"
                    ? "active-link"
                    : ""
                  }
                  to="/portal-cliente"
                >

                  🏠 Inicio

                </Link>

              </li>

              <li>

                <Link
                  className={
                    location.pathname === "/portal-cliente"
                    ? "active-link"
                    : ""
                  }
                  to="/portal-cliente"
                >

                  📁 Mis proyectos

                </Link>

              </li>

              <li>

                <Link
                  className={
                    location.pathname === "/mis-comentarios"
                    ? "active-link"
                    : ""
                  }
                  to="/mis-comentarios"
                >

                  💬 Comentarios

                </Link>

              </li>

              <li>

                <Link
                  className={
                    location.pathname === "/mis-calificaciones"
                    ? "active-link"
                    : ""
                  }
                  to="/mis-calificaciones"
                >

                  ⭐ Calificaciones

                </Link>

              </li>

            </>

          )

        }

      </ul>

      {/* PARTE DERECHA */}

      <div className="navbar-actions">

        <div className="navbar-user">

          👤

          <span>

            {usuario?.nombre}

          </span>

          <small>

            ({usuario?.rol})

          </small>

        </div>

        <button

          className="navbar-icon"

          onClick={cerrarSesion}

          title="Cerrar sesión"

        >

          🚪

        </button>

      </div>

    </nav>

  );

}

export default Navbar;