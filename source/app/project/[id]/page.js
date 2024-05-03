"use client"

import {useEffect, useState} from 'react'
import useAuth from '@/hooks/useAuth'
import {get_proyecto, get_proyectos} from "@/api/v1/proyectos"
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import Loading from '@/components/Loading'
import Image from 'next/image'
import {useRouter} from "next/navigation"
import DeleteProjectModal from "@/components/DeleteProjectModal";
import {get_user_by_id} from "@/api/v1/usuarios";

export default function Project({params}) {
    const {user, isLoading} = useAuth()
    const [proyecto, setProyecto] = useState({})
    const [userProjects, setUserProjects] = useState([])
    const [otherProjects, setOtherProjects] = useState([])
    const [proyectoLoaded, setProyectoLoaded] = useState(false)
    const [isDownloadHover, setIsDownloadHover] = useState(false)
    const [isDeleteHover, setIsDeleteHover] = useState(false)
    const [isViewMoreHover, setIsViewMoreHover] = useState(false)
    const [page, setPage] = useState(0)
    const router = useRouter()

    const
        [show_delete_modal, setShowDeleteModal] = useState(false),
        [number_proyectos, setNumberProyectos] = useState(6),
        [no_more_proyectos, setNoMoreProyectos] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return

        get_proyecto(token, params.id)
            .then(data => {
                setProyecto(data)
                setProyectoLoaded(true)

                get_user_by_id(token, data.usuarios.id)
                    .then(data2 => {
                        setUserProjects(data2.proyectos.filter((x) => x.id !== data.id && x.estado === 'aceptado'))
                    })

                get_proyectos(token, page)
                    .then(data3 => {
                        if (!data3 || !data3.length) return

                        setOtherProjects([...otherProjects, ...data3.filter(project => project.id !== data.id && project.usuarios.id !== data.usuarios.id)])
                    })
            })
    }, [params.id])

    if (isLoading || !proyectoLoaded) {
        return <Loading/>
    }

    const handleCardClick = (id) => {
        router.push(`/project/${id}`);
    };

    const handleViewMore = () => {
        setNumberProyectos(number_proyectos + 6)
    }

    const handleViewMore2 = () => {
        const token = localStorage.getItem('token')
        if (!token) return

        if (proyecto.usuarios) {
            get_proyectos(token, page + 1)
                .then(data => {
                    if (!data || !data.length) return setNoMoreProyectos(true)

                    setOtherProjects([...otherProjects, ...data.filter(project => project.id !== proyecto.id && project.usuarios.id !== proyecto.usuarios.id)])
                })

            setPage(page + 1)
        }

    }

    const processMail = (mail) => {
        const mailParts = mail.split('@');
        return mailParts[1] === "live.u-tad.com" || mailParts[1] === "u-tad.com" || mailParts[1] === "ext.u-tad.com" ? mailParts[0].split('.').map(text => [text[0].toUpperCase(), text.slice(1)].join("")).join(" ") : mail;
    }

    if (!proyecto) {
        return (
            <div className="container-fluid p-5 d-flex flex-column justify-content-center" style={{height: '100vh'}}>
                <div className="text-center">
                    <h1 className="display-1 ms-black">Proyecto no encontrado</h1>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <DeleteProjectModal project={proyecto} show={show_delete_modal} setShow={setShowDeleteModal}/>

                <div className="container-fluid p-5">
                    <p className="ms-bold-subbody">
                        <button className="border border-0 bg-transparent me-3" onClick={() => router.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                                <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#0065F3"/>
                            </svg>
                        </button>
                        {proyecto.proyectos_asignaturas[0]
                            ? proyecto.proyectos_asignaturas[0].asignaturas.titulaciones_asignaturas[0].titulaciones.areas.titulo + ' / ' + proyecto.proyectos_asignaturas[0].asignaturas.titulo + ' / ' + proyecto.anio
                            : "Otros / Otros / " + proyecto.anio
                        }
                    </p>
                    <h1 className="ms-bold">{proyecto.titulo} {proyecto.estado !== 'aceptado' && <span className={'ms-regular-subbody'}>({proyecto.estado})</span>}</h1>
                    <Link href={`/profile/${proyecto.usuarios.id}`} className="card-text ms-regular">{proyecto.usuarios.nombre_completo}</Link>
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                        {
                            proyecto.participantes.length > 0
                            &&
                            <p className="card-text ms-regular-subbody">
                                {proyecto.participantes.map(participante => processMail(participante.correo)).join(', ')}
                            </p>
                        }
                        <div className="d-flex justify-content-end mb-3">
                            {user.rol === "coordinador" &&
                                <>
                                    <Link href={proyecto.url.startsWith('http') ? proyecto.url : `https://api.reservorio-u-tad.com${proyecto.url}`} onMouseEnter={() => setIsDownloadHover(true)} onMouseLeave={() => setIsDownloadHover(false)} target="_blank" id="botonDescargar" className="me-3">
                                        {isDownloadHover
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
                                    <Link href={"#"} id="botonEliminar" onMouseEnter={() => setIsDeleteHover(true)} onMouseLeave={() => setIsDeleteHover(false)} onClick={() => setShowDeleteModal(true)} className="me-3">
                                        {isDeleteHover
                                            ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                                <rect x="1" y="1" width="54" height="54" rx="27" fill="white"/>
                                                <rect x="1" y="1" width="54" height="54" rx="27" stroke="#0065F3" strokeWidth="2"/>
                                                <path d="M35.2917 19.6667H31.6459L30.6042 18.625H25.3959L24.3542 19.6667H20.7084V21.75H35.2917M21.75 35.2917C21.75 35.8442 21.9695 36.3741 22.3602 36.7648C22.7509 37.1555 23.2808 37.375 23.8334 37.375H32.1667C32.7192 37.375 33.2491 37.1555 33.6398 36.7648C34.0305 36.3741 34.25 35.8442 34.25 35.2917V22.7917H21.75V35.2917Z" fill="#0065F3"/>
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                                <rect x="1" y="1" width="54" height="54" rx="27" fill="white"/>
                                                <rect x="1" y="1" width="54" height="54" rx="27" stroke="#6E7377" strokeWidth="2"/>
                                                <path d="M35.2917 19.6667H31.6459L30.6042 18.625H25.3959L24.3542 19.6667H20.7084V21.75H35.2917M21.75 35.2917C21.75 35.8442 21.9695 36.3741 22.3602 36.7648C22.7509 37.1555 23.2808 37.375 23.8334 37.375H32.1667C32.7192 37.375 33.2491 37.1555 33.6398 36.7648C34.0305 36.3741 34.25 35.8442 34.25 35.2917V22.7917H21.75V35.2917Z" fill="#6E7377"/>
                                            </svg>
                                        }
                                    </Link>
                                </>
                            }
                            {user.rol === "profesor" &&
                                <>
                                    <Link href={`${proyecto.url.startsWith('http') ? proyecto.url : `https://api.reservorio-u-tad.com${proyecto.url}`}`} onMouseEnter={() => setIsDownloadHover(true)} onMouseLeave={() => setIsDownloadHover(false)} target="_blank" id="botonDescargar" className="me-3">
                                        {isDownloadHover
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
                                </>
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-wrap flex-md-nowrap gap-5">
                        <div className={'position-relative'} style={{width: '50rem', height: '28.125rem'}}>
                            <Image src={proyecto.portada.startsWith('http') ? proyecto.portada : `https://api.reservorio-u-tad.com${proyecto.portada}`} objectFit={'contain'} width={0} height={0} fill sizes={'1'} alt="Project Image"/>
                        </div>
                        <p className="flex-grow-1 ms-regular">{proyecto.ficha}</p>
                    </div>
                    <div className="row g-4 card-group mt-5">
                        {userProjects.length > 0 && (
                            <div className="col-12">
                                <div className="row g-4">
                                    {userProjects.slice(0, number_proyectos).map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick}/>)}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                        <hr className="w-50"/>
                        <button onClick={handleViewMore} className={`${number_proyectos >= userProjects.length && 'd-none'} ms-regular px-5 py-2 ${isViewMoreHover ? "bg-primary border-2 border-primary border-2 text-white" : "bg-transparent btn-outline-primary"} rounded`} onMouseEnter={() => setIsViewMoreHover(true)} onMouseLeave={() => setIsViewMoreHover(false)} style={{width: 200}}>+ Ver más</button>
                        <hr className="w-50"/>
                    </div>

                    <div className="row g-4 card-group mt-5">
                        {otherProjects.length > 0 && (
                            <div className="col-12">
                                <div className="row g-4">
                                    {otherProjects.map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick}/>)}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                        <hr className="w-50"/>
                        <button onClick={handleViewMore2} className={`${no_more_proyectos && 'd-none'} ms-regular px-5 py-2 ${isViewMoreHover ? "bg-primary border-2 border-primary border-2 text-white" : "bg-transparent btn-outline-primary"} rounded`} onMouseEnter={() => setIsViewMoreHover(true)} onMouseLeave={() => setIsViewMoreHover(false)} style={{width: 200}}>+ Ver más</button>
                        <hr className="w-50"/>
                    </div>
                </div>
            </>
        );
    }
}