import React, {useState} from "react"

import Image from 'next/image'

import {useAuth} from "@/context/authContext"

import {aceptar_proyecto, rechazar_proyecto} from "@/api/v1/proyectos"

import SolicitudProjectModal from "@/components/SolicitudProjectModal"

import "@/styles/project-card.css"

export function ProjectSolicitudLista({project, setProjects, index}) {
    const {token} = useAuth()

    const
        [show, setShow] = useState(false)

    const handleAceptar = async () => {
        const data = await aceptar_proyecto(token, project.id)
        if (!data) return alert("Error al aceptar el proyecto")

        setShow(false)
        setProjects(projects => projects.filter((_, i) => i !== index))
    }

    const handleRechazar = async () => {
        const data = await rechazar_proyecto(token, project.id)
        if (!data) return alert("Error al rechazar el proyecto")

        setShow(false)
        setProjects(projects => projects.filter((_, i) => i !== index))
    }

    return (
        <>
            <SolicitudProjectModal project={project} show={show} setShow={setShow} handleAceptar={handleAceptar} handleRechazar={handleRechazar}/>

            <div className={"clickable col-12 d-flex flex-column flex-xl-row justify-content-between align-items-center gap-5 h-100 py-3"}>
                <div className={"flex-grow-1 d-flex flex-column flex-xl-row justify-content-start gap-5"} onClick={() => setShow(!show)}>
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

                    <div className={'pt-5'}>
                        <p className={"ms-extra-bold"}>{project.titulo}</p>
                        {
                            project.participantes
                                .map((participante) => (
                                    <p className={'ms-regular'}>{participante.correo}</p>
                                ))
                        }
                        <p className={'ms-regular'}>{project.ficha.slice(0, 100) + (project.ficha.length > 100 ? "..." : "")}</p>
                    </div>
                </div>

                <div className={"d-flex flex-row flex-wrap justify-content-evenly gap-3"}>
                    <button className={"btn btn-outline-primary ms-button color-secundario-negro"} style={{minWidth: "11rem", height: '3rem'}} onClick={handleRechazar}>Rechazar</button>
                    <button className={"btn btn-primary ms-button color-secundario-blanco"} style={{minWidth: "11rem", height: '3rem'}} onClick={handleAceptar}>Aceptar</button>
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