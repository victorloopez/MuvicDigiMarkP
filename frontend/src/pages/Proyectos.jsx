import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/estilos.css";


function Proyectos() {


  const [proyectos,setProyectos]=useState([]);

const [nombre,setNombre]=useState("");

const [descripcion,setDescripcion]=useState("");

const [clienteId,setClienteId]=useState("");

const [estado,setEstado]=useState("En desarrollo");

const [avance,setAvance]=useState(0);

const [fechaInicio,setFechaInicio]=useState("");

const [fechaEntrega,setFechaEntrega]=useState("");

const [clientes,setClientes]=useState([]);

  const [calificaciones,setCalificaciones]=useState({});


  const navigate=useNavigate();




  const cargarProyectos=()=>{


    fetch("https://muvicdigimarkp-production.up.railway.app/api/proyectos")

    .then(res=>res.json())

    .then(data=>{


      if(Array.isArray(data)){


        setProyectos(data);


        cargarCalificaciones(data);


      }
      else{

        setProyectos([]);

      }


    })

    .catch(err=>{

      console.error(err);

      setProyectos([]);

    });


  };






  

  const cargarClientes=()=>{

    fetch("https://muvicdigimarkp-production.up.railway.app/api/clientes")
    .then(res=>res.json())
    .then(data=>{
      if(Array.isArray(data)) setClientes(data);
    });

  };

const cargarCalificaciones=(lista)=>{


    const valores={};



    lista.forEach((p)=>{


      fetch(
        `https://muvicdigimarkp-production.up.railway.app/api/calificaciones/${p.id}`
      )

      .then(res=>res.json())

      .then(data=>{


        if(data.length>0){


          const promedio=

          data.reduce(
            (a,b)=>a+b.puntuacion,
            0
          )
          /
          data.length;



          valores[p.id]=promedio.toFixed(1);


        }
        else{


          valores[p.id]=0;


        }



        setCalificaciones({...valores});



      });



    });



  };





  useEffect(()=>{


    cargarProyectos();
    cargarClientes();

  },[]);





  const mostrarEstrellas=(valor)=>{


    const cantidad=Math.round(valor);


    return "⭐".repeat(cantidad)
    +
    "☆".repeat(5-cantidad);


  };







  const handleAgregar=(e)=>{

e.preventDefault();

if(
!nombre ||
!descripcion ||
!clienteId
){

alert("Complete todos los campos");

return;

}

fetch(
"https://muvicdigimarkp-production.up.railway.app/api/proyectos",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

nombre,

descripcion,

cliente_id:clienteId,

estado,

avance,

fecha_inicio:fechaInicio,

fecha_entrega:fechaEntrega

})

}

)

.then(res=>res.json())

.then(()=>{

alert("Proyecto registrado");

setNombre("");

setDescripcion("");

setClienteId("");

setEstado("En desarrollo");

setAvance(0);

setFechaInicio("");

setFechaEntrega("");

cargarProyectos();

});

};


  const handleEditar=(id,nombreActual,descActual)=>{


    const nuevoNombre=prompt(
      "Modificar nombre:",
      nombreActual
    );


    const nuevaDesc=prompt(
      "Modificar descripción:",
      descActual
    );



    if(!nuevoNombre || !nuevaDesc)
      return;




    fetch(
      `https://muvicdigimarkp-production.up.railway.app/api/proyectos/${id}`,
      {

        method:"PUT",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          nombre:nuevoNombre,

          descripcion:nuevaDesc

        })

      }

    )

    .then(()=>{

      alert("Proyecto actualizado");

      cargarProyectos();

    });



  };






  const handleEliminar=(id)=>{


    if(window.confirm("¿Eliminar proyecto?")){


      fetch(
        `https://muvicdigimarkp-production.up.railway.app/api/proyectos/${id}`,
        {
          method:"DELETE"
        }
      )

      .then(()=>{


        alert("Proyecto eliminado");

        cargarProyectos();


      });


    }


  };






return (

<div className="container">



<div className="page-header">

<h1>
Módulo de Proyectos
</h1>

</div>





<form
onSubmit={handleAgregar}
style={{
background:"#fff",
padding:"20px",
borderRadius:"8px",
marginBottom:"20px",
display:"flex",
gap:"15px",
alignItems:"flex-end"
}}
>



<div style={{flex:1}}>

<label>
Nombre del Proyecto
</label>


<input

value={nombre}

onChange={
e=>setNombre(e.target.value)
}

placeholder="Ej. Página Web Empresa"

style={{
width:"100%",
padding:"10px"
}}

/>

</div>





<div style={{flex:1}}>

<label>
Descripción / Estado
</label>


<input

value={descripcion}

onChange={
e=>setDescripcion(e.target.value)
}

placeholder="Ej. Finalizado"

style={{
width:"100%",
padding:"10px"
}}

/>

</div>

<div style={{flex:1}}>

<label>
Cliente
</label>

<select

value={clienteId}

onChange={e=>setClienteId(e.target.value)}

style={{
width:"100%",
padding:"10px"
}}

>

<option value="">
Seleccione un cliente
</option>

{
clientes.map((c)=>(

<option
key={c.id}
value={c.id}
>

{c.nombre}

</option>

))
}

</select>

</div>
<div style={{flex:1}}>

<label>Estado</label>

<select
value={estado}
onChange={e=>setEstado(e.target.value)}
style={{
width:"100%",
padding:"10px"
}}
>

<option>En desarrollo</option>
<option>En revisión</option>
<option>Finalizado</option>

</select>

</div>
<div style={{flex:1}}>

<label>Avance (%)</label>

<input
type="number"
min="0"
max="100"
value={avance}
onChange={e=>setAvance(e.target.value)}
style={{
width:"100%",
padding:"10px"
}}
/>

</div>
<div style={{flex:1}}>

<label>Fecha inicio</label>

<input
type="date"
value={fechaInicio}
onChange={e=>setFechaInicio(e.target.value)}
style={{
width:"100%",
padding:"10px"
}}
/>

</div>
<div style={{flex:1}}>

<label>Fecha entrega</label>

<input
type="date"
value={fechaEntrega}
onChange={e=>setFechaEntrega(e.target.value)}
style={{
width:"100%",
padding:"10px"
}}
/>

</div>
<button
className="btn-action"
style={{
background:"#ff6b00"
}}
>
+ Guardar Proyecto

</button>



</form>







<table
className="modules-list"
style={{width:"100%"}}
>


<thead>

<tr
style={{
background:"#0d233a",
color:"#fff"
}}
>

<th>ID</th>
<th>Proyecto</th>
<th>Cliente</th>
<th>Estado</th>
<th>Avance</th>
<th>Inicio</th>
<th>Entrega</th>
<th>Valoración</th>
<th>Acciones</th>


</tr>

</thead>





<tbody>


{
proyectos.length===0

?

<tr>

<td colSpan="5">

No hay proyectos registrados.

</td>

</tr>


:


proyectos.map(p=>(



<tr key={p.id}>

<td>{p.id}</td>

<td>
<strong>{p.nombre}</strong>
<br/>
<small>{p.descripcion}</small>
</td>

<td>{p.cliente_id}</td>

<td>{p.estado}</td>

<td>{p.avance}%</td>

<td>{p.fecha_inicio}</td>

<td>{p.fecha_entrega}</td>





<td
style={{
textAlign:"center"
}}
>


{

calificaciones[p.id]

?

<>

<div>
{mostrarEstrellas(
Number(calificaciones[p.id])
)}
</div>

<small>
{calificaciones[p.id]} / 5
</small>

</>

:

"Sin calificar"


}


</td>





<td
style={{
textAlign:"center"
}}
>


<button
className="btn-action"
style={{
background:"#007bff"
}}
onClick={()=>handleEditar(
p.id,
p.nombre,
p.descripcion
)}
>

Editar

</button>



<button
className="btn-action"
style={{
background:"#c8192b"
}}
onClick={()=>handleEliminar(p.id)}
>

Eliminar

</button>



<button
className="btn-action"
style={{
background:"#148e55"
}}
onClick={()=>navigate(`/comentarios/${p.id}`)}
>

Comentarios

</button>



<button
className="btn-action"
style={{
background:"#ffc107",
color:"#000"
}}
onClick={()=>navigate(`/calificaciones/${p.id}`)}
>

⭐ Calificar

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


export default Proyectos;
