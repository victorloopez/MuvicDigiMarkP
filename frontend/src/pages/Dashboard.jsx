import React, { useEffect, useState } from "react";

import {
  FaUsers,
  FaBuilding,
  FaTools,
  FaFolderOpen,
  FaChartLine,
  FaClock,
} from "react-icons/fa";

import "../styles/estilos.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";



function Dashboard() {


  const [datos, setDatos] = useState({

    usuarios: 0,
    clientes: 0,
    servicios: 0,
    proyectos: 0,
    comentarios: 0,
    historial: 0,
    promedio: 0,

  });



  const [actividades, setActividades] = useState([]);





  useEffect(() => {



    // Cargar datos generales

    fetch("http://localhost:4000/api/dashboard")

      .then((res)=>res.json())

      .then((data)=>{

        setDatos(data);

      })

      .catch((err)=>{

        console.error(
          "Error cargando dashboard:",
          err
        );

      });





    // Cargar historial reciente


    fetch("http://localhost:4000/api/historial")

      .then((res)=>res.json())

      .then((data)=>{


        if(Array.isArray(data)){


          setActividades(
            data.slice(0,5)
          );


        }


      })

      .catch((err)=>{


        console.error(
          "Error cargando historial:",
          err
        );


      });



  }, []);






  const datosGrafica=[


    {
      nombre:"Usuarios",
      cantidad:datos.usuarios
    },


    {
      nombre:"Clientes",
      cantidad:datos.clientes
    },


    {
      nombre:"Servicios",
      cantidad:datos.servicios
    },


    {
      nombre:"Proyectos",
      cantidad:datos.proyectos
    },


    {
      nombre:"Comentarios",
      cantidad:datos.comentarios
    },


    {
      nombre:"Historial",
      cantidad:datos.historial
    }


  ];





  const colores=[

    "#0d6efd",
    "#198754",
    "#fd7e14",
    "#6f42c1",
    "#20c997",
    "#dc3545"

  ];







return (

<div className="container">



<div className="page-header">


<h1>
Dashboard
</h1>


<p>
Resumen general del sistema Muvic DigiMark.
</p>


</div>






{/* TARJETAS */}



<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(230px,1fr))",

gap:"20px",

marginTop:"30px"

}}

>




<div className="module-card-large">

<FaUsers size={45} color="#0d6efd"/>

<h3>
Usuarios
</h3>

<h1>
{datos.usuarios}
</h1>

<p>
Usuarios registrados
</p>

</div>






<div className="module-card-large">

<FaBuilding size={45} color="#198754"/>

<h3>
Clientes
</h3>

<h1>
{datos.clientes}
</h1>

<p>
Clientes registrados
</p>

</div>






<div className="module-card-large">

<FaTools size={45} color="#fd7e14"/>

<h3>
Servicios
</h3>

<h1>
{datos.servicios}
</h1>

<p>
Servicios disponibles
</p>

</div>







<div className="module-card-large">

<FaFolderOpen size={45} color="#6f42c1"/>

<h3>
Proyectos
</h3>

<h1>
{datos.proyectos}
</h1>

<p>
Proyectos registrados
</p>

</div>







<div className="module-card-large">

<FaChartLine size={45} color="#20c997"/>

<h3>
Comentarios
</h3>

<h1>
{datos.comentarios}
</h1>

<p>
Total registrados
</p>

</div>







<div className="module-card-large">

<FaChartLine size={45} color="#ffc107"/>

<h3>
Calificación
</h3>

<h1>
⭐ {datos.promedio}
</h1>

<p>
Promedio clientes
</p>

</div>







<div className="module-card-large">

<FaClock size={45} color="#dc3545"/>

<h3>
Historial
</h3>

<h1>
{datos.historial}
</h1>

<p>
Acciones registradas
</p>

</div>




</div>









{/* GRAFICAS */}



<div

style={{

marginTop:"35px",

background:"#fff",

padding:"25px",

borderRadius:"10px",

boxShadow:"0 3px 10px rgba(0,0,0,.08)"

}}

>


<h2>

<FaChartLine/>

 Estadísticas generales

</h2>





<div

style={{

display:"grid",

gridTemplateColumns:"2fr 1fr",

gap:"25px",

marginTop:"30px"

}}

>





<div>


<h3>
Cantidad por módulo
</h3>



<ResponsiveContainer width="100%" height={320}>


<BarChart data={datosGrafica}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="nombre"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="cantidad"

fill="#0d6efd"

radius={[8,8,0,0]}

/>


</BarChart>


</ResponsiveContainer>


</div>








<div>


<h3>
Distribución
</h3>



<ResponsiveContainer width="100%" height={320}>


<PieChart>


<Pie

data={datosGrafica}

dataKey="cantidad"

nameKey="nombre"

outerRadius={110}

label

>


{

datosGrafica.map((item,index)=>(

<Cell

key={index}

fill={colores[index]}

/>


))

}



</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>





</div>





<p style={{marginTop:"25px"}}>


El sistema administra actualmente


<strong>
{" "}{datos.usuarios}
</strong>

usuarios,


<strong>
{" "}{datos.clientes}
</strong>

clientes,


<strong>
{" "}{datos.servicios}
</strong>

servicios,


<strong>
{" "}{datos.proyectos}
</strong>

proyectos,


<strong>
{" "}{datos.comentarios}
</strong>

comentarios y una valoración promedio de


<strong>
{" "}⭐ {datos.promedio}
</strong>.



</p>



</div>









{/* ACTIVIDAD RECIENTE */}



<div

style={{

marginTop:"25px",

background:"#fff",

padding:"25px",

borderRadius:"10px",

boxShadow:"0 3px 10px rgba(0,0,0,.08)"

}}

>



<h2>

<FaClock/>

 Actividad reciente

</h2>





{

actividades.length===0


?


<p>
No hay actividades registradas.
</p>



:


actividades.map((a)=>(


<div

key={a.id}

style={{

background:"#f8f9fa",

padding:"15px",

borderRadius:"8px",

marginBottom:"12px"

}}

>


<h4 style={{margin:"0"}}>

{a.modulo}

</h4>



<p>

<strong>
{a.accion}
</strong>

{" - "}

{a.descripcion}

</p>



<small>

{new Date(a.fecha).toLocaleString()}

</small>



</div>


))


}



</div>





</div>


);


}


export default Dashboard;