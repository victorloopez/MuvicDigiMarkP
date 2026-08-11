import React, { useEffect, useState } from "react";
import "../styles/estilos.css";

function Historial() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch("https://muvicdigimarkp-production.up.railway.app/api/historial")
      .then((res) => res.json())
      .then((data) => setHistorial(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Historial del Sistema</h1>
        <p>Registro de actividades realizadas en los proyectos.</p>
      </div>

      <table className="modules-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Módulo</th>
            <th>Acción</th>
            <th>Descripción</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {historial.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No hay registros.
              </td>
            </tr>
          ) : (
            historial.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.modulo}</td>
                <td>{h.accion}</td>
                <td>{h.descripcion}</td>
                <td>{new Date(h.fecha).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Historial;
