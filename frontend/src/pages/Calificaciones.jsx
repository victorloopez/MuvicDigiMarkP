import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/estilos.css";

function Calificaciones() {

  const { id } = useParams();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [calificaciones, setCalificaciones] = useState([]);

  const [puntuacion, setPuntuacion] = useState(5);

  const cargarCalificaciones = () => {

    fetch(`http://localhost:4000/api/calificaciones/${id}`)
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setCalificaciones(data);
        } else {
          setCalificaciones([]);
        }

      })
      .catch(console.error);

  };

  useEffect(() => {

    cargarCalificaciones();

  }, [id]);

  const guardarCalificacion = (e) => {

    e.preventDefault();

    fetch("http://localhost:4000/api/calificaciones", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        proyecto_id: id,

        puntuacion

      })

    })

    .then(res => res.json())

    .then(() => {

      alert("Gracias por calificar el proyecto.");

      cargarCalificaciones();

    });

  };

  const promedio = () => {

    if (calificaciones.length === 0) return 0;

    let suma = 0;

    calificaciones.forEach(c => {

      suma += c.puntuacion;

    });

    return (suma / calificaciones.length).toFixed(1);

  };

  return (

    <div className="container">

      <div className="page-header">

        <h1>

          Calificación del Proyecto

        </h1>

      </div>

      <form

        onSubmit={guardarCalificacion}

        style={{

          background:"#fff",

          padding:"25px",

          borderRadius:"10px",

          marginBottom:"25px"

        }}

      >

        <label>

          Cliente

        </label>

        <input

          value={usuario.nombre}

          disabled

          style={{

            width:"100%",

            padding:"10px",

            marginBottom:"15px"

          }}

        />

        <label>

          Seleccione una calificación

        </label>

        <select

          value={puntuacion}

          onChange={e=>setPuntuacion(e.target.value)}

          style={{

            width:"100%",

            padding:"10px",

            marginTop:"10px",

            marginBottom:"20px"

          }}

        >

          <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
          <option value="4">⭐⭐⭐⭐ Muy Bueno</option>
          <option value="3">⭐⭐⭐ Bueno</option>
          <option value="2">⭐⭐ Regular</option>
          <option value="1">⭐ Malo</option>

        </select>

        <button

          className="btn-action"

          style={{

            background:"#ffc107",

            color:"#000"

          }}

        >

          Guardar Calificación

        </button>

      </form>

      <div

        style={{

          background:"#fff",

          padding:"20px",

          borderRadius:"10px",

          marginBottom:"20px",

          textAlign:"center"

        }}

      >

        <h2>

          Promedio del proyecto

        </h2>

        <h1>

          ⭐ {promedio()} / 5

        </h1>

      </div>

      <table className="modules-list">

        <thead>

          <tr>

            <th>ID</th>

            <th>Calificación</th>

          </tr>

        </thead>

        <tbody>

          {

            calificaciones.length===0 ?

            <tr>

              <td colSpan="2">

                No existen calificaciones.

              </td>

            </tr>

            :

            calificaciones.map(c=>(

              <tr key={c.id}>

                <td>{c.id}</td>

                <td>{"⭐".repeat(c.puntuacion)}</td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default Calificaciones;