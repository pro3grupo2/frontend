"use client"
import  { useState } from 'react'
import '../globals.css'
import '../../styles/Profile.css'


export default function Help() {
    const [showFAQ, setShowFAQ] = useState(true)

    const toggleFAQ = () => {
        setShowFAQ(true)
    }

    const toggleAbout = () => {
        setShowFAQ(false)
    }

    return (
        <div className="container-fluid py-3">
            <div className="bg-white row">
                <h1 className="fw-bold display-4 col-12 m-0 px-3 py-4 pt-5 ms-5">
                    Centro de Ayuda</h1>
            </div>

            <div>
            <div className="d-flex flex-row gap-5 mt-3 ps-5 border-bottom color-secundario-gris">
                    <button className={`btn btn-custom ${showFAQ ? 'btn-active' : ''}`} onClick={toggleFAQ}>
                        Preguntas frecuentes
                    </button>
                    <button className={`btn btn-custom ${!showFAQ ? 'btn-active' : ''}`} onClick={toggleAbout}>
                        Sobre U-Reservorio
                    </button>
                </div>
            </div>

            {showFAQ && (
                <div className="col-12 row ps-5 pt-4">
                    <div class="col-12 col-lg-6 row">
                        <div class="col-12 row d-flex">
                            <h2 class="fw-bold col-12 m-0 px-3 py-3">
                                Crear cuenta</h2>
                            <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                ¿Puedo crear una cuenta con un correo externo a la U-tad?</h5>
                            <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                No, por seguridad y privacidad, el contenido solo estará disponible para alumnos y
                                miembros de la institución.</p>
                            <h5 className="fw-bold col-12 m-0 px-3 py-3">
                                ¿Dónde encuentro el link para verificar mi cuenta?</h5>
                            <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                En tu correo electrónico de la U-tad, desde la aplicación de Outlook</p>
                            <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                ¿Puedo seleccionar “profesor” cuando creo la cuenta aunque no lo sea?</h5>
                            <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                Si no eres profesor no podrás acceder a la plataforma como tal, ya que necesitas
                                acreditar con datos específicos.</p>
                        </div>
                        <div class="col-12 row d-flex">
                            <h2 class="fw-bold col-12 m-0 px-3 py-3">Rol de Coord./Depto.</h2>
                            <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                ¿Cómo consigo un código de Coordinador?</h5>
                            <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                Ponte en contacto con otro coordinador/a para que genere un código y te lo pase.</p>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 row">
                        <div class="col-12 row d-flex">
                            <h2 class="fw-bold col-12 m-0 px-3 py-3">Subir un trabajo</h2>
                            <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                ¿Necesito elegir una portada sí o sí para subir mi proyecto?</h5>
                            <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                sí, es la carta de presentación y en base a lo que decidirán acceder a tu trabajo,
                                procura que sea representativa de tu proyecto!</p>
                            <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                Qué pasa si algunos miembros del proyecto no tienen cuenta en la plataforma?</h5>
                            <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                no pasa nada, inclúyelos/as como miembros/as aunque no tengan perfil en la
                                plataforma.</p>
                        </div>
                        <div class="col-12 row d-flex">
                            <h2 class="fw-bold col-12 m-0 px-3 py-3">No encuentro un proyecto</h2>
                            <h5 class="fw-bold col-12 m-0 px-3 py-3">
                                Busco un proyecto pero no aparece</h5>
                            <p class="text-start text-secondary fs-6 fw-normal ms-font col-12 m-0 px-3 py-2">
                                Asegúrate de que esté bien escrito el título del proyecto o busca por nombre de
                                creador. Si sigue sin aparecer, cerciórate de que el proyecto está subido a la
                                plataforma.</p>
                        </div>
                    </div>
                </div>
            )}

            {!showFAQ && (
                <div id="component" className="container-fluid py-3">
                    <div className="position-relative bg-white row ps-5">
                        <h2 class="fw-bold col-12 m-0 px-3 py-3 pt-4">
                            Sobre U-Reservorio
                        </h2>
                        <p className="text-start text-dark fs-6 fw-normal ms-font col-12 col-lg-4 m-0 px-3 py-2 pt-1">
                            Con el paso de los años y según nuestro centro va creciendo, los alumnos de U-Tad han creado
                            infinidad de proyectos, trabajos y entregas a los que se intenta dar visibilidad desde
                            diversos departamentos dentro de la universidad.
                            <br/>
                            <br/>
                            Hasta ahora no existía un punto central que sirviese como repositorio para consultar estos
                            proyectos y, que nos pueda servir para detectar los trabajos más relevantes, conocer lo que
                            están haciendo desde otras áreas, materias o asignaturas y que pueda servir de referencia a
                            los propios alumnos para ver lo que han sido capaces de hacer los compañeros/as que les han
                            precedido.
                            <br/>
                            <br/>
                            Consideramos que existe una necesidad de centralizar toda esta información creciente, de
                            forma que quede registrada, ordenada, accesible y dinámica, facilitando acciones futuras de
                            promoción de los alumnos y alumni de U-Tad mediante sus trabajos.
                        </p>
                    </div>
                </div>

            )}
        </div>
    )
}