import { useEffect, useState } from "react";
import "../styles/estilos.css";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const cargarClientes = () => {
    fetch("https://muvicdigimarkp-production.up.railway.app/api/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => {
        console.error("Error al cargar clientes:", err);
        alert("Error al cargar los clientes");
      });
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleAgregar = (e) => {
    e.preventDefault();

    if (!nombre || !email) {
      return alert("Por favor complete todos los campos");
    }

    fetch("https://muvicdigimarkp-production.up.railway.app/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Cliente registrado correctamente");
        setNombre("");
        setEmail("");
        cargarClientes();
      })
      .catch((err) => {
        console.error("Error al agregar:", err);
        alert("Error al registrar el cliente");
      });
  };

  const handleEditar = (id, nombreActual, emailActual) => {
    const nuevoNombre = prompt(
      "Modificar Nombre Comercial:",
      nombreActual
    );

    const nuevoEmail = prompt(
      "Modificar Correo Corporativo:",
      emailActual
    );

    if (!nuevoNombre || !nuevoEmail) return;

    fetch(`https://muvicdigimarkp-production.up.railway.app/api/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nuevoNombre,
        email: nuevoEmail,
      }),
    })
      .then(() => {
        alert("Cliente actualizado correctamente");
        cargarClientes();
      })
      .catch((err) => {
        console.error("Error al editar:", err);
        alert("Error al actualizar el cliente");
      });
  };

  const handleEliminar = (id) => {
    if (confirm("¿Está seguro de eliminar esta empresa cliente?")) {
      fetch(`https://muvicdigimarkp-production.up.railway.app/api/clientes/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Cliente eliminado correctamente");
          cargarClientes();
        })
        .catch((err) => {
          console.error("Error al eliminar:", err);
          alert("Error al eliminar el cliente");
        });
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Módulo de Clientes</h1>
      </div>

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
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "600" }}>
            Nombre de Empresa / Cliente
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Vibel Store"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "600" }}>
            Email de Contacto
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contacto@empresa.com"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn-action"
          style={{
            backgroundColor: "#ff6b00",
            padding: "11px 25px",
          }}
        >
          + Guardar Cliente
        </button>
      </form>

      <table
        className="modules-list"
        style={{ width: "100%" }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#0d233a",
              color: "#fff",
            }}
          >
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px", textAlign: "left" }}>
              Cliente / Marca
            </th>
            <th style={{ padding: "12px", textAlign: "left" }}>
              Email Corporativo
            </th>
            <th style={{ padding: "12px", textAlign: "center" }}>
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((c) => (
            <tr key={c.id} className="module-card">
              <td
                className="module-cell"
                style={{
                  textAlign: "center",
                  width: "10%",
                }}
              >
                {c.id}
              </td>

              <td
                className="module-cell"
                style={{
                  fontWeight: "bold",
                  width: "35%",
                }}
              >
                {c.nombre}
              </td>

              <td
                className="module-cell"
                style={{ width: "35%" }}
              >
                {c.email}
              </td>

              <td
                className="module-cell"
                style={{
                  textAlign: "center",
                  width: "20%",
                }}
              >
                <button
                  className="btn-action"
                  style={{
                    backgroundColor: "#007bff",
                    marginRight: "10px",
                  }}
                  onClick={() =>
                    handleEditar(
                      c.id,
                      c.nombre,
                      c.email
                    )
                  }
                >
                  Editar
                </button>

                <button
                  className="btn-action"
                  style={{
                    backgroundColor: "#dc3545",
                  }}
                  onClick={() =>
                    handleEliminar(c.id)
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;
