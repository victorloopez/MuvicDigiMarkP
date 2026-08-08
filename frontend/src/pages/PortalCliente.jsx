import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/estilos.css";

function PortalCliente() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const navigate = useNavigate();

  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {

    if (!usuario) return;

    fetch(`http://localhost:4000/api/proyectos/cliente/${usuario.id}`)
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setProyectos(data);
        } else {
          setProyectos([]);
        }

      })
      .catch(err => console.error(err));

  }, [usuario]);

  return (

    <div className="main-wrapper">

      <section className="hero-section">

        <div className="hero-content">

          <h1>Bienvenido a Muvic DigiMark</h1>

          <h2>Portal del Cliente</h2>

          <p className="company-description">

            Hola <strong>{usuario?.nombre}</strong>

            <br />

            Aquí podrás consultar el estado de tus proyectos,
            revisar su avance y comunicarte con nuestro equipo.

          </p>

        </div>

      </section>

      <section className="dashboard-container">

        <h2 className="section-title">
          Mis Proyectos
        </h2>

        <div className="modules-grid">

          {

            proyectos.length === 0 ?

            (

              <div className="module-card-large">

                <h3>No tienes proyectos asignados.</h3>

              </div>

            )

            :

            proyectos.map((p) => (

              <div
                className="module-card-large"
                key={p.id}
              >

                <div className="module-icon-large">
                  📁
                </div>

                <h3>{p.nombre}</h3>

                <p>{p.descripcion}</p>

                <hr />

                <p>

                  <strong>Estado:</strong> {p.estado}

                </p>

                <p>

                  <strong>Avance:</strong> {p.avance}%

                </p>

                <p>

                  <strong>Fecha inicio:</strong>{" "}
                  {p.fecha_inicio || "No definida"}

                </p>

                <p>

                  <strong>Fecha entrega:</strong>{" "}
                  {p.fecha_entrega || "No definida"}

                </p>

<button
  className="btn-action"
  style={{
    marginTop:"15px",
    background:"#198754"
  }}
  onClick={() => window.location.href = `/comentarios/${p.id}`}
>
  Ver Comentarios
</button>

                <button
  className="btn-action"
  style={{
    marginTop:"10px",
    background:"#ff9800"
  }}
  onClick={() => window.location.href = `/calificaciones/${p.id}`}
>
  Calificar Proyecto
</button>

              </div>

            ))

          }

        </div>

      </section>

      <section className="hero-section">

        <div className="hero-content">

          <h2>Muvic DigiMark</h2>

          <p className="company-description">

            Marketing Digital y Desarrollo de Software.

            <br />

            📍 Bogotá, Colombia

            <br />

            📧 contacto@muvicdigimark.com

            <br />

            📱 Facebook | Instagram | LinkedIn

          </p>

        </div>

      </section>

    </div>

  );

}

export default PortalCliente;