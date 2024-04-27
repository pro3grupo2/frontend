"use client"
import React, { useEffect, useRef, useState } from 'react'
import '../globals.css'
import '../../styles/profile.css'


export default function Help() {
    const [showFAQ, setShowFAQ] = useState(true);

    const toggleFAQ = () => {
        setShowFAQ(true);
    };

    const toggleAbout = () => {
        setShowFAQ(false);
    };

    return (
        <div className="container-fluid py-3">
            <div className="position-relative bg-white row">
                <p className="position-absolute text-dark fs-1 ms-extrabold col-xxl-7 m-0 px-3 py-2 mb-5">
                    Centro de Ayuda
                </p>
            </div>

            <div>
                <div className="d-flex flex-row gap-5 mt-5 ps-5 border-bottom color-secundario-gris">
                    <button className={`btn btn-custom ${showFAQ ? 'btn-active' : ''}`} onClick={toggleFAQ}>
                        Preguntas frecuentes
                    </button>
                    <button className={`btn btn-custom ${!showFAQ ? 'btn-active' : ''}`} onClick={toggleAbout}>
                        Sobre U-Reservorio
                    </button>
                </div>
            </div>

            {showFAQ && (
                <div className="position-absolute col-xxl-11 row ps-5">
                    <div class="col-xl-5 row">
                        <div class="col-12 row d-flex">
                            <p class="text-dark fs-2 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                Crear cuenta</p>
                            <p class="text-start text-dark fs-6 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                ¿Puedo crear una cuenta con un correo externo a la U-tad?</p>
                            <p class="text-start text-secondary fs-6 fw-normal font-family-Montserrat col-12 m-0 px-3 py-2">
                                No, por seguridad y privacidad, el contenido solo estará disponible para alumnos y
                                miembros de la institución.</p>
                            <p class="text-start text-dark fs-6 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                ¿Dónde encuentro el link para verificar mi cuenta?</p>
                            <p class="text-start text-secondary fs-6 fw-normal font-family-Montserrat col-12 m-0 px-3 py-2">
                                En tu correo electrónico de la U-tad, desde la aplicación de Outlook</p>
                            <p class="text-start text-dark fs-6 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                ¿Puedo seleccionar “profesor” cuando creo la cuenta aunque no lo sea?</p>
                            <p class="text-start text-secondary fs-6 fw-normal font-family-Montserrat col-12 m-0 px-3 py-2">
                                Si no eres profesor no podrás acceder a la plataforma como tal, ya que necesitas
                                acreditar con datos específicos.</p>
                        </div>
                        <div class="col-12 row d-flex">
                            <p class="text-dark fs-2 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                Rol de Coord./Depto.</p>
                            <p class="text-start text-dark fs-6 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                ¿Cómo consigo un código de Coordinador?</p>
                            <p class="text-start text-secondary fs-6 fw-normal font-family-Montserrat col-12 m-0 px-3 py-2">
                                Ponte en contacto con otro coordinador/a para que genere un código y te lo pase.</p>
                        </div>
                    </div>
                    <div class="col-xl-5 row">
                        <div class="col-12 row d-flex">
                            <p class="text-dark fs-2 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                Subir un trabajo</p>
                            <p class="text-start text-dark fs-6 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                ¿Necesito elegir una portada sí o sí para subir mi proyecto?</p>
                            <p class="text-start text-secondary fs-6 fw-normal font-family-Montserrat col-12 m-0 px-3 py-2">
                                sí, es la carta de presentación y en base a lo que decidirán acceder a tu trabajo,
                                procura que sea representativa de tu proyecto!</p>
                            <p class="text-start text-dark fs-6 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                Qué pasa si algunos miembros del proyecto no tienen cuenta en la plataforma?</p>
                            <p class="text-start text-secondary fs-6 fw-normal font-family-Montserrat col-12 m-0 px-3 py-2">
                                no pasa nada, inclúyelos/as como miembros/as aunque no tengan perfil en la
                                plataforma.</p>
                        </div>
                        <div class="col-12 row d-flex">
                            <p class="text-dark fs-2 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                No encuentro un proyecto</p>
                            <p class="text-start text-dark fs-6 fw-bold font-family-Montserrat col-12 m-0 px-3 py-2">
                                Busco un proyecto pero no aparece</p>
                            <p class="text-start text-secondary fs-6 fw-normal font-family-Montserrat col-12 m-0 px-3 py-2">
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
                        <span className="position-absolute text-dark fs-2 fw-bold font-family-Montserrat col-xxl-7 m-0 px-3 py-2">
                            Sobre U-Reservorio
                        </span>
                        <p className="text-start text-dark fs-6 fw-normal font-family-Montserrat col-xxl-4 m-0 px-3 py-2 mt-5">
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
    );
}