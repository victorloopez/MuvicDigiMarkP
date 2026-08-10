const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// ==========================================
// FUNCIÓN HISTORIAL
// ==========================================

function guardarHistorial(modulo, accion, descripcion) {

    db.query(
        "INSERT INTO historial(modulo, accion, descripcion) VALUES(?,?,?)",
        [modulo, accion, descripcion],
        (err) => {
            if (err) {
                console.error("Error guardando historial:", err.message);
            }
        }
    );

}


// ==========================================
// CLIENTES
// ==========================================


app.get("/api/clientes", (req, res) => {

    db.query(
        "SELECT * FROM clientes",
        (err, result) => {

            if (err)
                return res.status(500).json({error: err.message});

            res.json(result);

        }
    );

});



app.post("/api/clientes", (req, res) => {

    const { nombre, email } = req.body;


    db.query(
        "INSERT INTO clientes(nombre,email) VALUES(?,?)",
        [nombre,email],
        (err,result)=>{

            if(err)
                return res.status(500).json({error:err.message});


            guardarHistorial(
                "Clientes",
                "Agregar",
                `Se registró el cliente ${nombre}`
            );


            res.json({
                id:result.insertId,
                nombre,
                email
            });

        }
    );

});



app.put("/api/clientes/:id",(req,res)=>{

    const {id}=req.params;
    const {nombre,email}=req.body;


    db.query(
        "UPDATE clientes SET nombre=?, email=? WHERE id=?",
        [nombre,email,id],
        err=>{

            if(err)
                return res.status(500).json({error:err.message});


            guardarHistorial(
                "Clientes",
                "Editar",
                `Se actualizó el cliente ${nombre}`
            );


            res.json({
                mensaje:"Cliente actualizado"
            });

        }
    );

});



app.delete("/api/clientes/:id",(req,res)=>{

    const {id}=req.params;


    db.query(
        "DELETE FROM clientes WHERE id=?",
        [id],
        err=>{

            if(err)
                return res.status(500).json({error:err.message});


            guardarHistorial(
                "Clientes",
                "Eliminar",
                `Se eliminó el cliente ID ${id}`
            );


            res.json({
                mensaje:"Cliente eliminado"
            });

        }
    );

});


// ==========================================
// PROYECTOS
// ==========================================

// Obtener TODOS los proyectos
app.get("/api/proyectos", (req, res) => {

    db.query(
        `SELECT
            p.*,
            c.nombre AS cliente
         FROM proyectos p
         LEFT JOIN clientes c
         ON p.cliente_id = c.id`,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(result);

        }
    );

});

// Obtener proyectos de un cliente
app.get("/api/proyectos/cliente/:id", (req, res) => {

    const { id } = req.params;

    db.query(
        `SELECT *
         FROM proyectos
         WHERE cliente_id=?`,
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(result);

        }
    );

});

// Crear proyecto
app.post("/api/proyectos", (req, res) => {

    const {

        nombre,
        descripcion,
        cliente_id,
        estado,
        avance,
        fecha_inicio,
        fecha_entrega

    } = req.body;

    db.query(

        `INSERT INTO proyectos
        (nombre,descripcion,cliente_id,estado,avance,fecha_inicio,fecha_entrega)
        VALUES(?,?,?,?,?,?,?)`,

        [

            nombre,
            descripcion,
            cliente_id,
            estado,
            avance,
            fecha_inicio,
            fecha_entrega

        ],

        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            guardarHistorial(
                "Proyectos",
                "Agregar",
                `Se creó el proyecto ${nombre}`
            );

            res.json({
                id: result.insertId,
                nombre,
                descripcion,
                cliente_id,
                estado,
                avance,
                fecha_inicio,
                fecha_entrega
            });

        }

    );

});

// Editar proyecto
app.put("/api/proyectos/:id", (req, res) => {

    const { id } = req.params;

    const {

        nombre,
        descripcion,
        cliente_id,
        estado,
        avance,
        fecha_inicio,
        fecha_entrega

    } = req.body;

    db.query(

        `UPDATE proyectos
         SET nombre=?,
             descripcion=?,
             cliente_id=?,
             estado=?,
             avance=?,
             fecha_inicio=?,
             fecha_entrega=?
         WHERE id=?`,

        [

            nombre,
            descripcion,
            cliente_id,
            estado,
            avance,
            fecha_inicio,
            fecha_entrega,
            id

        ],

        (err) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            guardarHistorial(
                "Proyectos",
                "Editar",
                `Se actualizó el proyecto ${nombre}`
            );

            res.json({
                mensaje: "Proyecto actualizado"
            });

        }

    );

});

// Eliminar proyecto
app.delete("/api/proyectos/:id", (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM proyectos WHERE id=?",
        [id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            guardarHistorial(
                "Proyectos",
                "Eliminar",
                `Se eliminó el proyecto ${id}`
            );

            res.json({
                mensaje: "Proyecto eliminado"
            });

        }
    );

});
// ==========================================
// USUARIOS CON ROLES
// ==========================================


app.get("/api/usuarios",(req,res)=>{

    db.query(
        "SELECT * FROM usuarios",
        (err,result)=>{

            if(err)
                return res.status(500).json({error:err.message});


            res.json(result);

        }
    );

});



app.post("/api/usuarios",(req,res)=>{

    const {
        nombre,
        email,
        rol
    } = req.body;


    const rolUsuario = rol || "Cliente";


    db.query(
        "INSERT INTO usuarios(nombre,email,rol) VALUES(?,?,?)",
        [
            nombre,
            email,
            rolUsuario
        ],
        (err,result)=>{

            if(err)
                return res.status(500).json({error:err.message});


            guardarHistorial(
                "Usuarios",
                "Agregar",
                `Se registró el usuario ${nombre} con rol ${rolUsuario}`
            );


            res.json({

                id:result.insertId,
                nombre,
                email,
                rol:rolUsuario

            });

        }
    );

});



app.put("/api/usuarios/:id",(req,res)=>{

    const {id}=req.params;

    const {
        nombre,
        email,
        rol
    }=req.body;



    db.query(
        "UPDATE usuarios SET nombre=?, email=?, rol=? WHERE id=?",
        [
            nombre,
            email,
            rol,
            id
        ],
        err=>{


            if(err)
                return res.status(500).json({error:err.message});



            guardarHistorial(
                "Usuarios",
                "Editar",
                `Se actualizó el usuario ${nombre}`
            );


            res.json({
                mensaje:"Usuario actualizado"
            });


        }
    );

});



app.delete("/api/usuarios/:id",(req,res)=>{

    const {id}=req.params;


    db.query(
        "DELETE FROM usuarios WHERE id=?",
        [id],
        err=>{


            if(err)
                return res.status(500).json({error:err.message});


            guardarHistorial(
                "Usuarios",
                "Eliminar",
                `Se eliminó usuario ID ${id}`
            );


            res.json({
                mensaje:"Usuario eliminado"
            });


        }
    );


});




// ==========================================
// SERVICIOS
// ==========================================


app.get("/api/servicios",(req,res)=>{

    db.query(
        "SELECT * FROM servicios",
        (err,result)=>{


            if(err)
                return res.status(500).json({error:err.message});


            res.json(result);


        }
    );

});



app.post("/api/servicios",(req,res)=>{

    const {
        nombre,
        precio
    }=req.body;



    db.query(
        "INSERT INTO servicios(nombre,precio) VALUES(?,?)",
        [
            nombre,
            precio
        ],
        (err,result)=>{


            if(err)
                return res.status(500).json({error:err.message});



            guardarHistorial(
                "Servicios",
                "Agregar",
                `Se registró el servicio ${nombre}`
            );


            res.json({

                id:result.insertId,
                nombre,
                precio

            });


        }
    );

});



app.put("/api/servicios/:id",(req,res)=>{

    const {id}=req.params;

    const {
        nombre,
        precio
    }=req.body;



    db.query(
        "UPDATE servicios SET nombre=?, precio=? WHERE id=?",
        [
            nombre,
            precio,
            id
        ],
        err=>{


            if(err)
                return res.status(500).json({error:err.message});


            guardarHistorial(
                "Servicios",
                "Editar",
                `Se actualizó el servicio ${nombre}`
            );


            res.json({
                mensaje:"Servicio actualizado"
            });


        }
    );

});



app.delete("/api/servicios/:id",(req,res)=>{

    const {id}=req.params;


    db.query(
        "DELETE FROM servicios WHERE id=?",
        [id],
        err=>{


            if(err)
                return res.status(500).json({error:err.message});


            guardarHistorial(
                "Servicios",
                "Eliminar",
                `Se eliminó servicio ID ${id}`
            );


            res.json({
                mensaje:"Servicio eliminado"
            });


        }
    );


});
// ==========================================
// DASHBOARD
// ==========================================


app.get("/api/dashboard",(req,res)=>{

    const dashboard={};


    db.query(
        "SELECT COUNT(*) AS total FROM usuarios",
        (err,usuarios)=>{

            if(err)
                return res.status(500).json({error:err.message});


            dashboard.usuarios=usuarios[0].total;


            db.query(
                "SELECT COUNT(*) AS total FROM clientes",
                (err,clientes)=>{

                    if(err)
                        return res.status(500).json({error:err.message});


                    dashboard.clientes=clientes[0].total;


                    db.query(
                        "SELECT COUNT(*) AS total FROM servicios",
                        (err,servicios)=>{


                            if(err)
                                return res.status(500).json({error:err.message});


                            dashboard.servicios=servicios[0].total;


                            db.query(
                                "SELECT COUNT(*) AS total FROM proyectos",
                                (err,proyectos)=>{


                                    if(err)
                                        return res.status(500).json({error:err.message});


                                    dashboard.proyectos=proyectos[0].total;



                                    db.query(
                                        "SELECT COUNT(*) AS total FROM comentarios",
                                        (err,comentarios)=>{


                                            if(err)
                                                return res.status(500).json({error:err.message});


                                            dashboard.comentarios=comentarios[0].total;



                                            db.query(
                                                "SELECT COUNT(*) AS total FROM historial",
                                                (err,historial)=>{


                                                    if(err)
                                                        return res.status(500).json({error:err.message});


                                                    dashboard.historial=historial[0].total;



                                                    db.query(
                                                        "SELECT AVG(puntuacion) AS promedio FROM calificaciones",
                                                        (err,calificacion)=>{


                                                            if(err)
                                                                return res.status(500).json({error:err.message});


                                                            dashboard.promedio =
                                                            calificacion[0].promedio
                                                            ?
                                                            Number(calificacion[0].promedio).toFixed(1)
                                                            :
                                                            0;


                                                            res.json(dashboard);


                                                        }
                                                    );


                                                }
                                            );


                                        }
                                    );


                                }
                            );


                        }
                    );


                }
            );


        }
    );

});




// ==========================================
// HISTORIAL
// ==========================================


app.get("/api/historial",(req,res)=>{


    db.query(
        "SELECT * FROM historial ORDER BY fecha DESC",
        (err,result)=>{


            if(err)
                return res.status(500).json({error:err.message});


            res.json(result);


        }
    );


});




// ==========================================
// COMENTARIOS
// ==========================================


app.get("/api/comentarios/:proyecto_id",(req,res)=>{

    const {proyecto_id}=req.params;


    db.query(
        "SELECT * FROM comentarios WHERE proyecto_id=? ORDER BY fecha DESC",
        [proyecto_id],
        (err,result)=>{


            if(err)
                return res.status(500).json({error:err.message});


            res.json(result);


        }
    );


});



app.post("/api/comentarios",(req,res)=>{


    const {
        proyecto_id,
        autor,
        comentario
    }=req.body;



    db.query(
        "INSERT INTO comentarios(proyecto_id,autor,comentario) VALUES(?,?,?)",
        [
            proyecto_id,
            autor,
            comentario
        ],
        (err,result)=>{


            if(err)
                return res.status(500).json({error:err.message});


            guardarHistorial(
                "Comentarios",
                "Agregar",
                `Nuevo comentario realizado por ${autor}`
            );



            res.json({

                id:result.insertId,
                mensaje:"Comentario agregado"

            });


        }
    );


});




// ==========================================
// CALIFICACIONES
// ==========================================


app.get("/api/calificaciones/:id",(req,res)=>{


    const {id}=req.params;


    db.query(
        "SELECT * FROM calificaciones WHERE proyecto_id=?",
        [id],
        (err,result)=>{


            if(err)
                return res.status(500).json({error:err.message});


            res.json(result);


        }
    );


});




app.post("/api/calificaciones",(req,res)=>{


    const {
        proyecto_id,
        puntuacion
    }=req.body;



    db.query(
        "INSERT INTO calificaciones(proyecto_id,puntuacion) VALUES(?,?)",
        [
            proyecto_id,
            puntuacion
        ],
        (err,result)=>{


            if(err)
                return res.status(500).json({error:err.message});


            guardarHistorial(
                "Calificaciones",
                "Agregar",
                `Se registró calificación de ${puntuacion} estrellas`
            );



            res.json({

                id:result.insertId,
                proyecto_id,
                puntuacion

            });


        }
    );


});


// ==========================================
// LOGIN
// ==========================================

app.post("/api/login",(req,res)=>{

    const {
        email,
        password
    } = req.body;


    db.query(
        "SELECT * FROM usuarios WHERE email=? AND password=?",
        [
            email,
            password
        ],
        (err,result)=>{


            if(err)
                return res.status(500).json({
                    error:err.message
                });


            if(result.length===0){

                return res.status(401).json({
                    mensaje:"Credenciales incorrectas"
                });

            }


            const usuario=result[0];


            res.json({

                id:usuario.id,
                nombre:usuario.nombre,
                email:usuario.email,
                rol:usuario.rol

            });


        }
    );

});

// ==========================================
// INICIAR SERVIDOR
// ==========================================


const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor Muvic DigiMark funcionando en el puerto ${PORT}`);
});