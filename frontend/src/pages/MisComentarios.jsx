import React, { useEffect, useState } from "react";
import "../styles/estilos.css";

function MisComentarios() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {

    fetch(`http://localhost:4000/api/proyectos/cliente/${usuario.id}`)
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setProyectos(data);
        } else {
          setProyectos([]);
        }

      })
      .catch(console.error);

  }, [usuario.id]);

  return (

    <div className="container">

      <div className="page-header">

        <h1>
          Mis Comentarios
        </h1>

        <p>
          Consulta y accede a los comentarios de tus proyectos.
        </p>

      </div>

      {
        proyectos.length === 0 ?

        <div
          style={{
            background:"#fff",
            padding:"20px",
            borderRadius:"10px",
            textAlign:"center"
          }}
        >

          No tienes proyectos registrados.

        </div>

        :

        <table className="modules-list">

          <thead>

            <tr>

              <th>Proyecto</th>

              <th>Estado</th>

              <th>Acción</th>

            </tr>

          </thead>

          <tbody>

            {

              proyectos.map((p)=>(

                <tr key={p.id}>

                  <td>{p.nombre}</td>

                  <td>{p.estado}</td>

                  <td>

                    <button

                      className="btn-action"

                      style={{

                        background:"#198754"

                      }}

                      onClick={()=>

                        window.location.href=`/comentarios/${p.id}`

                      }

                    >

                      Ver comentarios

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      }

    </div>

  );

}

export default MisComentarios;