import React, { useEffect, useState } from "react";
import "../styles/estilos.css";

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const cargarServicios = () => {
    fetch("https://muvicdigimarkp-production.up.railway.app/api/servicios")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServicios(data);
        else setServicios([]);
      })
      .catch((err) => {
        console.error("Error al cargar servicios:", err);
        setServicios([]);
      });
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  const handleAgregar = (e) => {
    e.preventDefault();

    if (!nombre || !precio) {
      alert("Por favor complete todos los campos");
      return;
    }

    fetch("https://muvicdigimarkp-production.up.railway.app/api/servicios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error en el servidor: ${res.status}`);
        return res.json();
      })
      .then(() => {
        alert("Servicio registrado correctamente");

        setNombre("");
        setPrecio("");
        cargarServicios();
      })
      .catch((err) => {
        console.error("Error al agregar:", err);
        alert("Error al registrar el servicio");
      });
  };

  const handleEditar = (id, nombreActual, precioActual) => {
    const nuevoNombre = prompt("Modificar Nombre del Servicio:", nombreActual);
    const nuevoPrecio = prompt("Modificar Precio ($):", precioActual);

    if (!nuevoNombre || !nuevoPrecio) return;

    fetch(`https://muvicdigimarkp-production.up.railway.app/api/servicios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nuevoNombre,
        precio: parseFloat(nuevoPrecio),
      }),
    })
      .then(() => {
        alert("Servicio actualizado correctamente");
        cargarServicios();
      })
      .catch((err) => {
        console.error("Error al editar:", err);
        alert("Error al actualizar el servicio");
      });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Está seguro de eliminar este servicio?")) {
      fetch(`https://muvicdigimarkp-production.up.railway.app/api/servicios/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Servicio eliminado correctamente");
          cargarServicios();
        })
        .catch((err) => {
          console.error("Error al eliminar:", err);
          alert("Error al eliminar el servicio");
        });
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Módulo de Servicios</h1>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleAgregar}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          display: "flex",
          gap: "15px",
          alignItems: "flex-end",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ flex: 2 }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Descripción del Servicio
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            placeholder="Ej. Diseño Web Responsivo"
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Precio Unitario (COP)
          </label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            placeholder="500000"
          />
        </div>

        <button
          type="submit"
          className="btn-action"
          style={{ backgroundColor: "#ff6b00", padding: "11px 25px" }}
        >
          + Guardar Servicio
        </button>
      </form>

      {/* Tabla */}
      <table className="modules-list" style={{ width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#0d233a", color: "#fff" }}>
            <th style={{ padding: "12px", width: "10%" }}>ID</th>
            <th style={{ padding: "12px", textAlign: "left", width: "45%" }}>
              Línea de Servicio
            </th>
            <th style={{ padding: "12px", textAlign: "left", width: "25%" }}>
              Tarifa Base
            </th>
            <th style={{ padding: "12px", textAlign: "center", width: "20%" }}>
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {servicios.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: "20px", textAlign: "center", color: "#666" }}>
                No hay servicios registrados.
              </td>
            </tr>
          ) : (
            servicios.map((s) => (
              <tr key={s.id} className="module-card">
                <td className="module-cell" style={{ textAlign: "center" }}>
                  {s.id}
                </td>

                <td className="module-cell" style={{ fontWeight: "bold" }}>
                  {s.nombre}
                </td>

                <td className="module-cell" style={{ color: "#28a745", fontWeight: "600" }}>
                  ${parseFloat(s.precio).toLocaleString("es-CO")}
                </td>

                <td className="module-cell" style={{ textAlign: "center" }}>
                  <button
                    className="btn-action"
                    style={{ backgroundColor: "#007bff", marginRight: "10px" }}
                    onClick={() => handleEditar(s.id, s.nombre, s.precio)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-action"
                    style={{ backgroundColor: "#dc3545" }}
                    onClick={() => handleEliminar(s.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Servicios;
