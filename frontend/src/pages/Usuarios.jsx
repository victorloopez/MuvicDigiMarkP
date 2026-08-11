import React, { useEffect, useState } from "react";
import "../styles/estilos.css";

function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("Administrador");


  const cargarUsuarios = () => {

    fetch("https://muvicdigimarkp-production.up.railway.app/api/usuarios")

      .then((res)=>res.json())

      .then((data)=>{

        if(Array.isArray(data)){
          setUsuarios(data);
        }else{
          setUsuarios([]);
        }

      })

      .catch((err)=>{

        console.error(
          "Error al cargar usuarios:",
          err
        );

        setUsuarios([]);

      });

  };



  useEffect(()=>{

    cargarUsuarios();

  },[]);





  const handleAgregar = (e)=>{

    e.preventDefault();



    if(!nombre || !email || !rol){

      alert("Complete todos los campos");

      return;

    }



    fetch("https://muvicdigimarkp-production.up.railway.app/api/usuarios",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        nombre,
        email,
        rol

      })

    })

    .then(res=>res.json())

    .then(()=>{

      alert(
        "Usuario registrado correctamente"
      );


      setNombre("");
      setEmail("");
      setRol("Administrador");


      cargarUsuarios();


    })


    .catch(err=>{

      console.error(
        "Error al agregar:",
        err
      );

      alert(
        "Error al registrar usuario"
      );

    });


  };







  const handleEditar = (
    id,
    nombreActual,
    emailActual,
    rolActual
  )=>{


    const nuevoNombre = prompt(
      "Modificar nombre:",
      nombreActual
    );


    const nuevoEmail = prompt(
      "Modificar correo:",
      emailActual
    );


    const nuevoRol = prompt(
      "Modificar rol (Administrador, Empleado o Cliente):",
      rolActual
    );



    if(
      !nuevoNombre ||
      !nuevoEmail ||
      !nuevoRol
    ){

      return;

    }




    fetch(
      `https://muvicdigimarkp-production.up.railway.app/api/usuarios/${id}`,
      {

        method:"PUT",

        headers:{
          "Content-Type":"application/json"
        },


        body:JSON.stringify({

          nombre:nuevoNombre,

          email:nuevoEmail,

          rol:nuevoRol

        })

      }

    )


    .then(()=>{

      alert(
        "Usuario actualizado correctamente"
      );


      cargarUsuarios();


    })


    .catch(err=>{

      console.error(
        "Error al editar:",
        err
      );


      alert(
        "Error al actualizar usuario"
      );


    });


  };







  const handleEliminar=(id)=>{


    if(
      window.confirm(
        "¿Desea eliminar este usuario?"
      )
    ){


      fetch(
        `https://muvicdigimarkp-production.up.railway.app/api/usuarios/${id}`,
        {
          method:"DELETE"
        }
      )


      .then(()=>{

        alert(
          "Usuario eliminado correctamente"
        );


        cargarUsuarios();

      })


      .catch(err=>{

        console.error(
          "Error al eliminar:",
          err
        );


      });


    }


  };









  return (

    <div className="container">


      <div className="page-header">

        <h1>
          Módulo de Usuarios
        </h1>

      </div>






      <form

        onSubmit={handleAgregar}

        style={{

          background:"#fff",

          padding:"20px",

          borderRadius:"10px",

          marginBottom:"25px",

          display:"grid",

          gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",

          gap:"15px",

          boxShadow:
          "0 2px 8px rgba(0,0,0,.08)"

        }}

      >



        <div>

          <label>
            Nombre Completo
          </label>


          <input

            type="text"

            value={nombre}

            onChange={
              e=>setNombre(e.target.value)
            }

            placeholder="Juan Pérez"

            style={{
              width:"100%",
              padding:"10px"
            }}

          />

        </div>





        <div>

          <label>
            Correo Electrónico
          </label>


          <input

            type="email"

            value={email}

            onChange={
              e=>setEmail(e.target.value)
            }

            placeholder="juan@muvic.com"

            style={{
              width:"100%",
              padding:"10px"
            }}

          />

        </div>






        <div>

          <label>
            Rol
          </label>


          <select

            value={rol}

            onChange={
              e=>setRol(e.target.value)
            }


            style={{

              width:"100%",

              padding:"10px"

            }}

          >

            <option value="Administrador">
              Administrador
            </option>


            <option value="Empleado">
              Empleado
            </option>


            <option value="Cliente">
              Cliente
            </option>


          </select>


        </div>






        <button

          type="submit"

          className="btn-action"

          style={{

            background:"#ff6b00",

            alignSelf:"end"

          }}

        >

          + Guardar Usuario

        </button>



      </form>









      <table className="modules-list">


        <thead>

          <tr>

            <th>ID</th>

            <th>Nombre</th>

            <th>Email</th>

            <th>Rol</th>

            <th>Acciones</th>


          </tr>


        </thead>






        <tbody>


        {

        usuarios.length===0

        ?

        (

          <tr>

            <td colSpan="5">

              No hay usuarios registrados.

            </td>

          </tr>

        )


        :

        usuarios.map((u)=>(


          <tr key={u.id}>


            <td>
              {u.id}
            </td>


            <td>
              {u.nombre}
            </td>


            <td>
              {u.email}
            </td>


            <td>

              <strong>
                {u.rol}
              </strong>

            </td>


            <td>


              <button

                className="btn-action"

                style={{

                  background:"#007bff",

                  marginRight:"10px"

                }}


                onClick={()=>


                  handleEditar(

                    u.id,

                    u.nombre,

                    u.email,

                    u.rol

                  )


                }


              >

                Editar

              </button>





              <button

                className="btn-action"

                style={{

                  background:"#dc3545"

                }}


                onClick={()=>handleEliminar(u.id)}

              >

                Eliminar

              </button>



            </td>


          </tr>


        ))


        }



        </tbody>


      </table>



    </div>

  );


}


export default Usuarios;
