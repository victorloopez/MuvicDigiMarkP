import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/estilos.css";


function Login(){


const navigate = useNavigate();


const [correo,setCorreo]=useState("");

const [password,setPassword]=useState("");





const ingresar=(e)=>{


e.preventDefault();



if(!correo || !password){


alert("Complete todos los campos");

return;


}




fetch(
"https://muvicdigimarkp-production.up.railway.app/api/login",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email:correo,

password:password

})


}

)


.then(res=>res.json())


.then(data=>{



if(data.mensaje){


alert(data.mensaje);

return;


}




// Guardar usuario logueado


localStorage.setItem(

"usuario",

JSON.stringify(data)

);





// Separación por roles


if(data.rol==="Administrador"){


navigate("/dashboard");


}


else{


navigate("/portal-cliente");


}




})


.catch(err=>{


console.error(
"Error login:",
err
);


alert(
"No se pudo conectar con el servidor"
);


});




};







return(


<div className="login-container">


<div className="login-card">



<h1>

Muvic DigiMark

</h1>



<p>

Ingreso al sistema

</p>




<form onSubmit={ingresar}>



<input

type="email"

placeholder="Correo electrónico"

value={correo}

onChange={
e=>setCorreo(e.target.value)
}

/>




<input

type="password"

placeholder="Contraseña"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>




<button>

Ingresar

</button>




</form>



</div>


</div>


);


}


export default Login;
