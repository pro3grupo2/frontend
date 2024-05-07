import React, {useState} from "react"

import Image from "next/image"
import Link from "next/link"

export default function SolicitudProjectModal({project, show, setShow, handleAceptar, handleRechazar}) {
    const
        [isDownloadHover, setIsDownloadHover] = useState(false),
        [isDeleteHover, setIsDeleteHover] = useState(false)


    if (project === undefined) return <></>

    return (
        <>
            <div className={`${show ? 'd-block' : 'd-none'} position-fixed z-2 w-100 h-100`}></div>

            <div className={`${show ? 'd-block' : 'd-none'} d-flex flex-column position-fixed gap-3 top-50 start-50 translate-middle rounded shadow-lg background-color-secundario-blanco z-3 w-75 h-75 p-5 overflow-y-auto`}>
                <button type="button" className="btn-close position-absolute top-0 end-0 p-3" aria-label="Close" onClick={() => setShow(false)}/>

                <div className={'d-flex flex-column flex-nowrap gap-3'}>
                    <p className={"ms-bold text-break p-0 m-0"}>{project.titulo}</p>

                    {
                        project.participantes
                            .map((participante) => (
                                <p className={"ms-regular p-0 m-0"}>{participante.correo}</p>
                            ))
                    }

                    <p className={"ms-regular-subbody p-0 m-0"}>
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
                            maxWidth: "440px",
                            maxHeight: "300px",
                        }}
                        alt={project.portada}/>

                    <div className={"flex-grow-1 d-flex flex-column justify-content-between"}>
                        <div className={"d-flex flex-row justify-content-end gap-3"}>
                            <Link href={`/project/${project.id}`} id="botonDescargar" onMouseEnter={() => setIsDownloadHover(true)} onMouseLeave={() => setIsDownloadHover(false)} className="me-3" style={{width: 48, height: 48}}>
                                {isDownloadHover
                                    ?
                                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_396_1194)">
                                            <rect x="1" y="1" width="54" height="54" rx="27" fill="white"/>
                                            <rect x="1" y="1" width="54" height="54" rx="27" stroke="#0065F3" stroke-width="2"/>
                                            <path d="M36.71 23.04C37.1 22.65 37.1 22 36.71 21.63L34.37 19.29C34 18.9 33.35 18.9 32.96 19.29L31.12 21.12L34.87 24.87M19 33.25V37H22.75L33.81 25.93L30.06 22.18L19 33.25Z" fill="#0065F3"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_396_1194">
                                                <rect width="56" height="56" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    :
                                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_396_1188)">
                                            <rect width="56" height="56" rx="28" fill="white"/>
                                            <path d="M36.71 23.04C37.1 22.65 37.1 22 36.71 21.63L34.37 19.29C34 18.9 33.35 18.9 32.96 19.29L31.12 21.12L34.87 24.87M19 33.25V37H22.75L33.81 25.93L30.06 22.18L19 33.25Z" fill="#6E7377"/>
                                        </g>
                                        <rect x="1" y="1" width="54" height="54" rx="27" stroke="#6E7377" stroke-width="2"/>
                                        <defs>
                                            <clipPath id="clip0_396_1188">
                                                <rect width="56" height="56" rx="28" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                }
                            </Link>
                            <Link href={"#"} id="botonEliminar" onMouseEnter={() => setIsDeleteHover(true)} onMouseLeave={() => setIsDeleteHover(false)} onClick={() => window.open(project.url.startsWith('http') ? project.url : `https://api.reservorio-u-tad.com${project.url}`, '_blank', 'noopener,noreferrer')} className="me-3">
                                {isDeleteHover
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                        <rect x="1" y="1" width="54" height="54" rx="27" fill="white"/>
                                        <rect x="1" y="1" width="54" height="54" rx="27" stroke="#0065F3" strokeWidth="2"/>
                                        <path d="M21 36H35V34H21M35 25H31V19H25V25H21L28 32L35 25Z" fill="#0065F3"/>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                        <rect x="1" y="1" width="54" height="54" rx="27" fill="white"/>
                                        <rect x="1" y="1" width="54" height="54" rx="27" stroke="#6E7377" strokeWidth="2"/>
                                        <path d="M21 36H35V34H21M35 25H31V19H25V25H21L28 32L35 25Z" fill="#6E7377"/>
                                    </svg>
                                }
                            </Link>
                        </div>

                        <p className={"flex-grow-1 ms-regular"}>{project.ficha}</p>

                        <div className={"d-flex flex-row justify-content-end gap-3"}>
                            <button className={"btn btn-outline-primary ms-button color-secundario-negro w-25"} style={{minWidth: "fit-content"}} onClick={handleRechazar}>Rechazar</button>
                            <button className={"btn btn-primary ms-button color-secundario-blanco w-25"} style={{minWidth: "fit-content"}} onClick={handleAceptar}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}