import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaComments, FaCalendarAlt } from "react-icons/fa";
import "../styles/estilos.css";

function Comentarios() {

  const { id } = useParams();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [comentarios, setComentarios] = useState([]);

  const [comentario, setComentario] = useState("");

  const cargarComentarios = () => {

    fetch(`https://muvicdigimarkp-production.up.railway.app/api/comentarios/${id}`)
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setComentarios(data);
        } else {
          setComentarios([]);
        }

      })
      .catch(err => console.log(err));

  };

  useEffect(() => {

    cargarComentarios();

  }, [id]);

  const guardarComentario = (e) => {

    e.preventDefault();

    if (!comentario) {
      alert("Escriba un comentario");
      return;
    }

    fetch("https://muvicdigimarkp-production.up.railway.app/api/comentarios", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        proyecto_id: id,

        autor: usuario.nombre,

        comentario

      })

    })

      .then(res => res.json())

      .then(() => {

        setComentario("");

        cargarComentarios();

      });

  };

  const inicial = (nombre) => {

    if (!nombre) return "?";

    return nombre.charAt(0).toUpperCase();

  };

  return (

    <div className="container">

      <div className="page-header">

        <h1>

          <FaComments />

          {" "}Comentarios del Proyecto

        </h1>

        <p>

          Aquí puedes comunicarte con el equipo de Muvic DigiMark.

        </p>

      </div>

      <form

        onSubmit={guardarComentario}

        style={{

          background: "#fff",

          padding: "25px",

          borderRadius: "10px",

          marginBottom: "30px"

        }}

      >

        <h2>Nuevo comentario</h2>

        <input

          type="text"

          value={usuario.nombre}

          disabled

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "15px"

          }}

        />

        <textarea

          placeholder="Escribe tu comentario..."

          value={comentario}

          onChange={e => setComentario(e.target.value)}

          style={{

            width: "100%",

            height: "120px",

            padding: "12px"

          }}

        />

        <button

          className="btn-action"

          style={{

            marginTop: "15px",

            background: "#ff6b00"

          }}

        >

          Publicar comentario

        </button>

      </form>

      <h2>

        Comentarios ({comentarios.length})

      </h2>

      {

        comentarios.length === 0 ?

          <div

            style={{

              background: "#fff",

              padding: "25px",

              borderRadius: "10px",

              textAlign: "center"

            }}

          >

            No existen comentarios para este proyecto.

          </div>

          :

          comentarios.map(c => (

            <div

              key={c.id}

              style={{

                background: "#fff",

                padding: "20px",

                borderRadius: "10px",

                marginBottom: "15px"

              }}

            >

              <div

                style={{

                  display: "flex",

                  alignItems: "center",

                  gap: "15px"

                }}

              >

                <div

                  style={{

                    width: "45px",

                    height: "45px",

                    borderRadius: "50%",

                    background: "#0d233a",

                    color: "#fff",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    fontWeight: "bold"

                  }}

                >

                  {inicial(c.autor)}

                </div>

                <div>

                  <h3>{c.autor}</h3>

                  <small>

                    <FaCalendarAlt />

                    {" "}

                    {new Date(c.fecha).toLocaleString()}

                  </small>

                </div>

              </div>

              <p style={{ marginTop: "15px" }}>

                {c.comentario}

              </p>

            </div>

          ))

      }

    </div>

  );

}

export default Comentarios;
