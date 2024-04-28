import React, {useState} from "react"

import Image from 'next/image'

import "@/styles/project-card.css"
import SolicitudProjectModal from "@/components/SolicitudProjectModal"
import {aceptar_proyecto, rechazar_proyecto} from "@/api/v1/proyectos"

export function ProjectSolicitudLista({project, setProjects, index}) {
    const
        [show, setShow] = useState(false)

    const handleAceptar = async () => {
        const data = await aceptar_proyecto(localStorage.getItem('token'), project.id)
        if (!data) return alert("Error al aceptar el proyecto")

        setShow(false)
        setProjects(projects => projects.filter((_, i) => i !== index))
    }

    const handleRechazar = async () => {
        const data = await rechazar_proyecto(localStorage.getItem('token'), project.id)
        if (!data) return alert("Error al rechazar el proyecto")

        setShow(false)
        setProjects(projects => projects.filter((_, i) => i !== index))
    }

    return (
        <>
            <SolicitudProjectModal project={project} show={show} setShow={setShow} handleAceptar={handleAceptar} handleRechazar={handleRechazar}/>

            <div className={"col-12 d-flex flex-column flex-xl-row justify-content-between align-items-center gap-5 h-100 py-3"}>
                <div className={"flex-grow-1 d-flex flex-column flex-xl-row justify-content-start align-items-center text-center gap-5"} onClick={() => setShow(!show)}>
                    <Image
                        src={project.portada.startsWith('http') ? project.portada : `https://api.reservorio-u-tad.com${project.portada}`}
                        className={"border rounded h-75"}
                        width={0} height={0}
                        layout={"responsive"}
                        style={{
                            minWidth: "300px",
                            maxWidth: "440px",
                            minHeight: "300px",
                            maxHeight: "300px",
                        }}
                        alt={project.portada}/>

                    <div>
                        <p className={"fs-2 fw-bold"}>{project.titulo}</p>
                        {
                            project.participantes
                                .map((participante) => (
                                    <p>{participante.correo}</p>
                                ))
                        }
                        <p>{project.ficha.slice(0, 100) + (project.ficha.length > 100 ? "..." : "")}</p>
                    </div>
                </div>

                <div className={"d-flex flex-row justify-content-evenly gap-3"}>
                    <button className={"btn btn-outline-primary color-secundario-negro w-25"} style={{minWidth: "fit-content"}} onClick={handleRechazar}>Rechazar</button>
                    <button className={"btn btn-primary color-secundario-blanco w-25"} style={{minWidth: "fit-content"}} onClick={handleAceptar}>Aceptar</button>
                </div>
            </div>
        </>
    )
}

export default function ProjectSolicitud({projects, setProjects, projectsSolicitudes_ref}) {
    return (
        <div ref={projectsSolicitudes_ref} className="d-none row px-5">
            {
                projects
                    .map((project, index) => (
                        <>
                            <ProjectSolicitudLista project={project} setProjects={setProjects} index={index}/>
                            {
                                index + 1 < projects.length && <hr className={"hr"}/>
                            }
                        </>
                    ))
            }
        </div>
    )
}