import React from "react";
import "../styles/estilos.css";


function Inicio() {


  return (


    <div className="main-wrapper">



      {/* HERO PRINCIPAL */}

      <section className="hero-section">


        <div className="hero-content">


          <h1 className="hero-title">

            Muvic DigiMark

          </h1>


          <h2>

            Marketing Digital & Desarrollo de Software

          </h2>



          <p className="company-description">


            Somos una empresa dedicada al desarrollo de soluciones
            digitales, creación de software y estrategias de marketing
            digital que ayudan a empresas y emprendimientos a crecer,
            mejorar sus procesos y fortalecer su presencia en internet.


          </p>



        </div>


      </section>






      {/* QUIENES SOMOS */}


      <section className="dashboard-container">


        <h3 className="section-title">

          ¿Quiénes somos?

        </h3>



        <div className="module-card-large">


          <p>


            En Muvic DigiMark combinamos tecnología, creatividad e
            innovación para ofrecer soluciones digitales adaptadas a
            las necesidades de cada negocio.


            Nuestro objetivo es acompañar a las empresas en su
            transformación digital mediante herramientas modernas,
            funcionales y eficientes.


          </p>



        </div>



      </section>







      {/* SERVICIOS */}



      <section className="dashboard-container">


        <h3 className="section-title">

          Nuestros servicios

        </h3>



        <div className="modules-grid">



          <div className="module-card-large">


            <div className="module-icon-large">

              💻

            </div>


            <h4>

              Desarrollo de Software

            </h4>


            <p>

              Creamos sistemas y aplicaciones personalizadas para
              optimizar procesos empresariales.

            </p>


          </div>







          <div className="module-card-large">


            <div className="module-icon-large">

              📱

            </div>


            <h4>

              Marketing Digital

            </h4>


            <p>

              Diseñamos estrategias digitales para mejorar la
              presencia y crecimiento de las marcas.

            </p>


          </div>








          <div className="module-card-large">


            <div className="module-icon-large">

              🌐

            </div>


            <h4>

              Diseño Web

            </h4>


            <p>

              Desarrollamos páginas web modernas, rápidas y
              adaptadas a cada empresa.

            </p>


          </div>







          <div className="module-card-large">


            <div className="module-icon-large">

              🚀

            </div>


            <h4>

              Soluciones Digitales

            </h4>


            <p>

              Implementamos herramientas tecnológicas para mejorar
              la productividad de los negocios.

            </p>


          </div>



        </div>



      </section>







      {/* CONTACTO */}



      <section className="hero-section">


        <div className="hero-content">



          <h2>

            Contacta con nosotros

          </h2>



          <p className="company-description">


            📍 Bogotá, Colombia


            <br/>


            📧 contacto@muvicdigimark.com


            <br/>


            📱 Instagram: @MuvicDigiMark


            <br/>


            💼 LinkedIn: Muvic DigiMark



          </p>




        </div>



      </section>







      {/* FOOTER */}



      <footer

        style={{

          background:"#0d233a",

          color:"#fff",

          textAlign:"center",

          padding:"20px"

        }}

      >


        <p>

          © 2026 Muvic DigiMark - Marketing Digital y Desarrollo de Software

        </p>


        <p>

          Transformamos ideas en soluciones digitales.

        </p>



      </footer>



    </div>


  );


}


export default Inicio;