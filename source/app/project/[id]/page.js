"use client"

import React, {useEffect, useState} from 'react'

import {useRouter} from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'

import {AuthProvider, useAuth} from '@/context/authContext'

import {get_proyecto, get_proyectos} from "@/api/v1/proyectos"
import {get_user_by_id} from "@/api/v1/usuarios"

import ProjectCard from '@/components/ProjectCard'
import Loading from '@/components/Loading'
import DeleteProjectModal from "@/components/DeleteProjectModal"
import NewPremiosModal from "@/components/NewPremiosModal"
import Footer from '@/components/Footer'
import NavBar from "@/components/NavBar"

import {project_texts} from '@/lang'

function ProjectComponent({params}) {
    const {usuario, token} = useAuth()

    const
        [proyecto, setProyecto] = useState({}),
        [loading, setLoading] = useState(true)

    const [userProjects, setUserProjects] = useState([])
    const [otherProjects, setOtherProjects] = useState([])
    const [proyectoLoaded, setProyectoLoaded] = useState(false)
    const [isDownloadHover, setIsDownloadHover] = useState(false)
    const [isDeleteHover, setIsDeleteHover] = useState(false)
    const [isAgregarPremiosHover, setIsAgregarPremiosHover] = useState(false)
    const [isViewMoreHover, setIsViewMoreHover] = useState(false)
    const [page, setPage] = useState(0)
    const router = useRouter()

    const project_json = project_texts(localStorage.getItem('lang') ?? 'EN')

    const
        [show_delete_modal, setShowDeleteModal] = useState(false),
        [show_new_premios_modal, setShowNewPremiosModal] = useState(false),
        [number_proyectos, setNumberProyectos] = useState(6),
        [no_more_proyectos, setNoMoreProyectos] = useState(false)

    useEffect(() => {
        setLoading(true)
        if (!token) return

        get_proyecto(token, params.id)
            .then(data => {
                setProyectoLoaded(true)

                if (!data) return
                setProyecto(data)

                get_user_by_id(token, data.usuarios.id)
                    .then(data2 => {
                        if (!data2) return
                        setUserProjects(data2.proyectos.filter((x) => x.id !== data.id && x.estado === 'aceptado'))
                    })

                const filters = JSON.parse(localStorage.getItem('filters')) ?? {area: data?.proyectos_asignaturas[0].asignaturas.titulaciones_asignaturas[0].titulaciones.areas.id.toString()}
                get_proyectos(token, page, filters)
                    .then(data3 => {
                        if (!data3 || !data3.length) return
                        setOtherProjects([...otherProjects, ...data3.filter(project => project.id !== data.id && project.usuarios.id !== data.usuarios.id)])
                        if (!otherProjects.length) return setNoMoreProyectos(true)
                    })
            })
        setLoading(false)
    }, [params.id, token])

    if (loading || !proyectoLoaded) return <Loading/>

    const handleCardClick = (id) => {
        router.push(`/project/${id}`)
    }

    const handleViewMore = () => {
        setNumberProyectos(number_proyectos + 6)
    }

    const handleViewMore2 = () => {
        if (!token) return
        if (Object.keys(proyecto).length) {
            const filters = JSON.parse(localStorage.getItem('filters')) ?? {area: proyecto?.proyectos_asignaturas[0].asignaturas.titulaciones_asignaturas[0].titulaciones.areas.id.toString()}
            get_proyectos(token, page + 1, filters)
                .then(data => {
                    if (!data || !data.length) return setNoMoreProyectos(true)
                    setOtherProjects([...otherProjects, ...data.filter(project => project.id !== proyecto.id && project.usuarios.id !== proyecto.usuarios.id)])
                })

            setPage(page + 1)
        }
    }

    const processMail = (mail) => {
        const mailParts = mail.split('@')
        return mailParts[1] === "live.u-tad.com" || mailParts[1] === "u-tad.com" || mailParts[1] === "ext.u-tad.com" ? mailParts[0].split('.').map(text => [text[0].toUpperCase(), text.slice(1)].join("")).join(" ") : mail
    }

    if (!Object.keys(proyecto).length || proyecto.estado !== 'aceptado') {
        return (
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
                <h1 className="display-1 ms-black">{project.not_found}</h1>
            </div>
        )
    }

    return (
        <>
            <DeleteProjectModal project={proyecto} show={show_delete_modal} setShow={setShowDeleteModal}/>
            <NewPremiosModal show={show_new_premios_modal} setShow={setShowNewPremiosModal} proyecto={proyecto}/>

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

                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                    <h1 className="fw-bold">{proyecto.titulo} {proyecto.estado !== 'aceptado' && <span className={'ms-regular-subbody'}>({proyecto.estado})</span>}</h1>

                    <div className="d-flex justify-content-end">
                        {
                            ['coordinador', 'profesor'].includes(usuario.rol) &&
                            <Link href={proyecto.url.startsWith('http') ? proyecto.url : `https://api.reservorio-u-tad.com${proyecto.url}`} onMouseEnter={() => setIsDownloadHover(true)} onMouseLeave={() => setIsDownloadHover(false)} target="_blank" id="botonDescargar" className="me-3">
                                {proyecto.url.startsWith('http')
                                    ?
                                    (isDownloadHover
                                            ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                                <rect x="1" y="1" width="54" height="54" rx="27" fill="white"/>
                                                <rect x="1" y="1" width="54" height="54" rx="27" stroke="#0065F3" stroke-width="2"/>
                                                <path
                                                    d="M26.5899 29.41C26.9999 29.8 26.9999 30.44 26.5899 30.83C26.1999 31.22 25.5599 31.22 25.1699 30.83C23.2199 28.88 23.2199 25.71 25.1699 23.76L28.7099 20.22C30.6599 18.27 33.8299 18.27 35.7799 20.22C37.7299 22.17 37.7299 25.34 35.7799 27.29L34.2899 28.78C34.2999 27.96 34.1699 27.14 33.8899 26.36L34.3599 25.88C35.5399 24.71 35.5399 22.81 34.3599 21.64C33.1899 20.46 31.2899 20.46 30.1199 21.64L26.5899 25.17C25.4099 26.34 25.4099 28.24 26.5899 29.41ZM29.4099 25.17C29.7999 24.78 30.4399 24.78 30.8299 25.17C32.7799 27.12 32.7799 30.29 30.8299 32.24L27.2899 35.78C25.3399 37.73 22.1699 37.73 20.2199 35.78C18.2699 33.83 18.2699 30.66 20.2199 28.71L21.7099 27.22C21.6999 28.04 21.8299 28.86 22.1099 29.65L21.6399 30.12C20.4599 31.29 20.4599 33.19 21.6399 34.36C22.8099 35.54 24.7099 35.54 25.8799 34.36L29.4099 30.83C30.5899 29.66 30.5899 27.76 29.4099 26.59C28.9999 26.2 28.9999 25.56 29.4099 25.17Z"
                                                    fill="#0065F3"/>
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                                <rect x="1" y="1" width="54" height="54" rx="27" fill="white"/>
                                                <rect x="1" y="1" width="54" height="54" rx="27" stroke="#6E7377" stroke-width="2"/>
                                                <path
                                                    d="M26.5899 29.41C26.9999 29.8 26.9999 30.44 26.5899 30.83C26.1999 31.22 25.5599 31.22 25.1699 30.83C23.2199 28.88 23.2199 25.71 25.1699 23.76L28.7099 20.22C30.6599 18.27 33.8299 18.27 35.7799 20.22C37.7299 22.17 37.7299 25.34 35.7799 27.29L34.2899 28.78C34.2999 27.96 34.1699 27.14 33.8899 26.36L34.3599 25.88C35.5399 24.71 35.5399 22.81 34.3599 21.64C33.1899 20.46 31.2899 20.46 30.1199 21.64L26.5899 25.17C25.4099 26.34 25.4099 28.24 26.5899 29.41ZM29.4099 25.17C29.7999 24.78 30.4399 24.78 30.8299 25.17C32.7799 27.12 32.7799 30.29 30.8299 32.24L27.2899 35.78C25.3399 37.73 22.1699 37.73 20.2199 35.78C18.2699 33.83 18.2699 30.66 20.2199 28.71L21.7099 27.22C21.6999 28.04 21.8299 28.86 22.1099 29.65L21.6399 30.12C20.4599 31.29 20.4599 33.19 21.6399 34.36C22.8099 35.54 24.7099 35.54 25.8799 34.36L29.4099 30.83C30.5899 29.66 30.5899 27.76 29.4099 26.59C28.9999 26.2 28.9999 25.56 29.4099 25.17Z"
                                                    fill="#6E7377"/>
                                            </svg>
                                    )
                                    :
                                    (isDownloadHover
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
                                    )
                                }
                            </Link>
                        }
                        {
                            ['coordinador'].includes(usuario.rol) &&
                            <>
                                <Link href={"#"} id="botonAgregar" onMouseEnter={() => setIsAgregarPremiosHover(true)} onMouseLeave={() => setIsAgregarPremiosHover(false)} onClick={() => setShowNewPremiosModal(true)} className="me-3">
                                    {isAgregarPremiosHover
                                        ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                            <rect x="1" y="1" width="54" height="54" rx="27" fill="white"/>
                                            <rect x="1" y="1" width="54" height="54" rx="27" stroke="#0065F3" stroke-width="2"/>
                                            <path d="M35 29H29V35H27V29H21V27H27V21H29V27H35V29Z" fill="#0065F3"/>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                            <rect x="1" y="1" width="54" height="54" rx="27" fill="white"/>
                                            <rect x="1" y="1" width="54" height="54" rx="27" stroke="#6E7377" stroke-width="2"/>
                                            <path d="M35 29H29V35H27V29H21V27H27V21H29V27H35V29Z" fill="#6E7377"/>
                                        </svg>
                                    }
                                </Link>
                                <Link href={"#"} id="botonEliminar" onMouseEnter={() => setIsDeleteHover(true)}
                                      onMouseLeave={() => setIsDeleteHover(false)}
                                      onClick={() => setShowDeleteModal(true)} className="me-3">
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
                    </div>
                </div>

                <div className="d-flex flex-row flex-wrap flex-md-nowrap gap-5">
                    <div className='position-relative ' style={{width: '60rem', minHeight: '10rem'}}>
                        {/*<Image className="z-0 blur-5" src={proyecto.portada.startsWith('http') ? proyecto.portada : `https://api.reservorio-u-tad.com${proyecto.portada}`} objectFit={'cover'} width={0} height={0} fill sizes={"1"} alt={proyecto.portada}/>*/}
                        <Image className="z-1" src={proyecto.portada.startsWith('http') ? proyecto.portada : `https://api.reservorio-u-tad.com${proyecto.portada}`} objectFit={'cover'} width={0} height={0} fill sizes={"1"} alt={proyecto.portada}/>
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="fw-bold ms-font mb-3">{project_json.description}</h5>
                        <p className="ms-regular mb-3" style={{maxWidth: '40rem', minHeight: '20rem'}}>{proyecto.ficha}</p>
                        {proyecto.premiado && proyecto.premios.length > 0 &&
                            <>
                                <h5 className="fw-bold ms-font mb-3">{project_json.awards}</h5>
                                <div className="d-flex flex-row flex-wrap gap-2 mb-3">
                                    {
                                        proyecto.premios.map((premio) => (
                                            <p className='ms-regular border rounded-pill bg-primary text-white m-0 p-2'>{premio.titulo}</p>
                                        ))
                                    }
                                </div>
                            </>
                        }
                        <div className="mb-3">
                            {
                                proyecto.participantes.length > 0
                                && !(proyecto.participantes.length === 1 && proyecto.participantes[0].correo === proyecto.usuarios.correo) &&
                                <>
                                    <h5 className="fw-bold ms-font mb-3">{project_json.authors}</h5>
                                    <p className="card-text ms-regular-subbody">
                                        {proyecto.participantes.map(participante => processMail(participante.correo)).reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], []).join(', ')}
                                    </p>
                                </>
                            }
                        </div>
                        <h5 className="fw-bold ms-font mb-3">{project_json.uploaded_by}</h5>
                        <Link href={`/profile/${proyecto.usuarios.id}`} className="card-text ms-regular">{proyecto.usuarios.nombre_completo}</Link>
                    </div>
                </div>

                <div className="row g-4 card-group mt-5">
                    {
                        userProjects.length > 0 ? (
                                <div className="col-12">
                                    <div className="row g-4">
                                        {userProjects.slice(0, number_proyectos).map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick}/>)}
                                    </div>
                                </div>
                            )
                            :
                            <div className="col-12 text-center">
                                <p className="lead mt-3">{proyecto.usuarios.nombre_completo}{project_json.user_has_no_projects}</p>
                            </div>
                    }
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <hr className="w-50"/>
                    <button onClick={handleViewMore} className={`${number_proyectos >= userProjects.length && 'd-none'} ms-regular px-5 py-2 ${isViewMoreHover ? "bg-primary border-2 border-primary border-2 text-white" : "bg-transparent btn-outline-primary"} rounded`} onMouseEnter={() => setIsViewMoreHover(true)} onMouseLeave={() => setIsViewMoreHover(false)} style={{width: 200}}>{project_json.view_more}</button>
                    <hr className="w-50"/>
                </div>

                <div className="row g-4 card-group mt-5">
                    {
                        otherProjects.length > 0 ? (
                                <div className="col-12">
                                    <div className="row g-4">
                                        {otherProjects.map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick}/>)}
                                    </div>
                                </div>
                            )
                            :
                            <div className="col-12 text-center">
                                <p className="lead mt-3">{project_json.no_projects}</p>
                            </div>
                    }
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <hr className="w-50"/>
                    <button onClick={handleViewMore2} className={`${no_more_proyectos && 'd-none'} ms-regular px-5 py-2 ${isViewMoreHover ? "bg-primary border-2 border-primary border-2 text-white" : "bg-transparent btn-outline-primary"} rounded`} onMouseEnter={() => setIsViewMoreHover(true)} onMouseLeave={() => setIsViewMoreHover(false)} style={{width: 200}}>{project_json.view_more}</button>
                    <hr className="w-50"/>
                </div>
            </div>
            <Footer lang={localStorage.getItem("lang") ?? "EN"}/>
        </>
    )
}

export default function Project({params}) {
    return (
        <AuthProvider>
            <NavBar lang={localStorage.getItem("lang") ?? "EN"}/>
            <ProjectComponent params={params}/>
        </AuthProvider>
    )
}