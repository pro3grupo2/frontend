import React from "react"

import Image from "next/image"
import {useRouter} from "next/navigation"

export default function SolicitudProjectModal({project, show, setShow, handleAceptar, handleRechazar}) {
    const router = useRouter()

    return (
        <>
            <div className={`${show ? 'd-block' : 'd-none'} position-fixed z-0 w-100 h-100`}></div>

            <div className={`${show ? 'd-block' : 'd-none'} d-flex flex-column position-fixed gap-3 top-50 start-50 translate-middle rounded shadow-lg background-color-secundario-blanco z-1 w-75 h-75 p-5 overflow-y-auto`}>
                <button type="button" className="btn-close position-absolute top-0 end-0 p-3" aria-label="Close" onClick={() => setShow(false)}/>

                <div>
                    <p className={"fs-2 fw-bold p-0 m-0"}>{project.titulo}</p>
                    {
                        project.participantes
                            .map((participante) => (
                                <p className={"p-0 m-0"}>{participante.correo}</p>
                            ))
                    }

                    <p className={"fw-light p-0 m-0"}>
                        {

                            project.proyectos_asignaturas[0]
                                ? project.proyectos_asignaturas[0].asignaturas.titulaciones_asignaturas[0].titulaciones.areas.titulo + ' / ' + project.proyectos_asignaturas[0].asignaturas.titulo + ' / ' + project.anio
                                : "Otros / Otros / " + project.anio
                        }
                    </p>
                </div>

                <div className={"flex-grow-1 d-flex flex-column flex-xl-row justify-content-between gap-5"}>
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

                    <div className={"flex-grow-1 d-flex flex-column justify-content-between"}>
                        <div className={"d-flex flex-row justify-content-end gap-3"}>
                            <button id="botonEditar" className="btn btn-outline-dark rounded-circle p-0 m-0" style={{width: 48, height: 48}} onClick={() => router.push(`/project/${project.id}`)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M20.71 7.04006C21.1 6.65006 21.1 6.00006 20.71 5.63006L18.37 3.29006C18 2.90006 17.35 2.90006 16.96 3.29006L15.12 5.12006L18.87 8.87006M3 17.2501V21.0001H6.75L17.81 9.93006L14.06 6.18006L3 17.2501Z" fill="#6E7377"/>
                                </svg>
                            </button>
                            <button id="botonDescargar" className="btn btn-outline-dark rounded-circle p-0 m-0" style={{width: 48, height: 48}} onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 20H19V18H5M19 9H15V3H9V9H5L12 16L19 9Z" fill="#6E7377"/>
                                </svg>
                            </button>
                        </div>

                        <p className={"flex-grow-1"}>{project.ficha}</p>

                        <div className={"d-flex flex-row justify-content-end gap-3"}>
                            <button className={"btn btn-outline-primary color-secundario-negro w-25"} style={{minWidth: "fit-content"}} onClick={handleRechazar}>Rechazar</button>
                            <button className={"btn btn-primary color-secundario-blanco w-25"} style={{minWidth: "fit-content"}} onClick={handleAceptar}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}