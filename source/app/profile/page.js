"use client"

import React, {useEffect, useRef, useState} from 'react'

import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/navigation"

import '../globals.css'
import '../../styles/profile.css'

import ProjectCard from "@/components/ProjectCard"
import {aceptar_proyecto, get_me_proyectos, get_proyectos_pendientes, rechazar_proyecto} from "@/api/v1/proyectos"
import {me} from "@/api/v1/auth"
import Loading from "@/components/Loading"
import {crear_codigo, eliminar_codigo, get_codigos} from "@/api/v1/codigos"
import EditProfileModal from "@/components/EditProfileModal"
import NewProjectModal from "@/components/NewProjectModal"
import {ProjectSolicitudLista} from "@/components/ProjectSolicitudLista"

export default function Profile() {
    const
        [user, setUser] = useState({}),
        [projectsValidados, setProjectsValidados] = useState([]),
        [projectsSolicitudes, setProjectsSolicitudes] = useState([]),
        projectsValidados_ref = useRef(),
        projectsNoValidados_ref = useRef(),
        projectsSolicitudes_ref = useRef(),
        codigosAdmin_ref = useRef(),
        projectsValidados_btn_ref = useRef(),
        projectsSolicitudes_btn_ref = useRef(),
        codigosAdmin_btn_ref = useRef(),
        projectsNoValidados_btn_ref = useRef(),
        [projectsNoValidados, setProjectsNoValidados] = useState([]),
        [loading, setLoading] = useState(true),
        [codigos, setCodigos] = useState([]),
        [numUsos, setNumUsos] = useState(1),
        router = useRouter()

    const
        [modal_show_edit_profile, setModalShowEditProfile] = useState(false),
        [modal_show_new_project, setModalShowNewProject] = useState(false)

    const crearCodigo = async () => {
        await crear_codigo(localStorage.getItem('token'), numUsos);
        get_codigos(localStorage.getItem('token')).then(data => {
            setCodigos(data.reverse())
        });
    };

    const handleAceptar = async (id) => {
        await aceptar_proyecto(localStorage.getItem('token'), id)
    };

    const handleRechazar = async (id) => {
        await rechazar_proyecto(localStorage.getItem('token'), id)
    };

    const copiarAlPortapapeles = (codigo) => {
        navigator.clipboard.writeText(codigo)
            .then(() => {
                alert('¡Código copiado al portapapeles!');
            })
            .catch(err => {
                alert('Error al copiar el código: ' + err);
            });
    }

    const eliminarCodigo = async (codigo_id, indice) => {
        const data = await eliminar_codigo(localStorage.getItem('token'), codigo_id)
        if (!data) return alert('Error al eliminar el código')

        setCodigos(codigos.filter((_, index) => index !== indice))
    }

    useEffect(() => {
        if (!localStorage.getItem('token'))
            return router.push('/signin')

        setLoading(true)
        me(localStorage.getItem('token'))
            .then(data => {
                console.log("mne", data)
                if (!data) return router.push('/signin')
                setUser(data)
                if (data.rol === "coordinador") {
                    get_codigos(localStorage.getItem('token')).then(data => {
                        setCodigos(data)
                    });

                    get_proyectos_pendientes(localStorage.getItem('token'))
                        .then(data => {
                            setProjectsSolicitudes(data)
                        })
                }
            })

        get_me_proyectos(localStorage.getItem('token'))
            .then(data => {
                setProjectsValidados([])
                setProjectsNoValidados([])

                if (data) {
                    for (let project of data)
                        project.estado === 'aceptado'
                            ? setProjectsValidados(prev => [...prev, project])
                            : setProjectsNoValidados(prev => [...prev, project])
                }
            })


        setLoading(false)
    }, [])

    if (loading) return <Loading/>

    // Redirigir a la página del proyecto al hacer click en una tarjeta
    const handleCardClick = (id) => {
        router.push(`/project/${id}`);
    };

    // Convertir la primera letra del nombre y del apellido a mayúscula
    const nombreCompletoCapitalizado = user.nombre_completo && typeof user.nombre_completo === 'string'
        ? user.nombre_completo
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : "";

    if (user.rol == "coordinador") return (
        <>
            {modal_show_edit_profile || modal_show_new_project ? (
                <div className="backdrop"></div>
            ) : null}
            <div className="container-fluid">
                <div className="modal-container">
                    <EditProfileModal show={modal_show_edit_profile} setShow={setModalShowEditProfile} default_user_data={user}/>
                    <NewProjectModal show={modal_show_new_project} setShow={setModalShowNewProject}/>
                </div>
                <div className="d-flex flex-row gap-5 gap-sm-0 flex-wrap-reverse flex-sm-nowrap justify-content-center justify-content-sm-between px-5 pt-5">
                    <div className="">
                        <h1 className="fw-bold display-4">{nombreCompletoCapitalizado}</h1>
                        <b className="fw-bold fs-5">{user.correo}</b>
                        <p className="link-offset-1 fw-bold  color-principal "><Image src="/icons/enlace.svg" className="d-start w-auto h-auto" alt="enlace" height={0} width={0}/> {' '}<Link href={`${user.portfolio}`} target="_blank">{user.portfolio}</Link></p>
                        <p className="ms-regular text-break" style={{width: '30rem'}}>{user.descripcion}</p>
                        <div className="d-flex flex-row gap-3">
                            <button className="btn btn-primary btn-font p-2 btn-hover" onClick={() => setModalShowNewProject(true)}>Nuevo proyecto</button>
                            <button className="btn btn-outline-primary btn-font color-secundario-negro p-2" onClick={() => setModalShowEditProfile(true)}>Editar perfil</button>
                        </div>
                    </div>

                    <div className={'position-relative'} style={{width: '11.99244rem', height: '12rem'}}>
                        <Image className={"rounded"} src={user.foto} objectFit={'cover'} width={0} height={0} fill sizes={'1'} alt={user.foto}/>
                    </div>
                </div>

                <div className="d-flex flex-row gap-5 mt-5 ps-5 border-bottom color-secundario-gris">
                    <button ref={projectsValidados_btn_ref} className="btn btn-custom btn-active" onClick={(e) => {
                        projectsValidados_ref.current.classList.remove('d-none')
                        projectsSolicitudes_ref.current.classList.add('d-none')
                        codigosAdmin_ref.current.classList.add('d-none')

                        projectsValidados_btn_ref.current.classList.add('btn-active')
                        projectsSolicitudes_btn_ref.current.classList.remove('btn-active')
                    }}>Proyectos subidos
                    </button>

                    <button ref={projectsSolicitudes_btn_ref} className="btn btn-custom" onClick={() => {
                        projectsValidados_ref.current.classList.add('d-none')
                        projectsSolicitudes_ref.current.classList.remove('d-none')
                        codigosAdmin_ref.current.classList.add('d-none')

                        projectsValidados_btn_ref.current.classList.remove('btn-active')
                        codigosAdmin_btn_ref.current.classList.remove('btn-active')
                        projectsSolicitudes_btn_ref.current.classList.add('btn-active')
                    }}>Gestionar Solicitudes
                    </button>
                    <button ref={codigosAdmin_btn_ref} className="btn btn-custom" onClick={() => {
                        projectsValidados_ref.current.classList.add('d-none')
                        projectsSolicitudes_ref.current.classList.add('d-none')
                        codigosAdmin_ref.current.classList.remove('d-none')

                        projectsValidados_btn_ref.current.classList.remove('btn-active')
                        projectsSolicitudes_btn_ref.current.classList.remove('btn-active')
                        codigosAdmin_btn_ref.current.classList.add('btn-active')
                    }}>Códigos de Administrador
                    </button>
                </div>

                <div ref={projectsValidados_ref} className="row px-3">
                    {
                        projectsValidados.length
                            ? projectsValidados.map(project => <ProjectCard key={project.id} onClick={handleCardClick} project={project}/>)
                            :
                            <div className="text-center mt-5">
                                <h1 className="display-5 fw-bold">No hay proyectos que mostrar</h1>
                                <p className="lead">Parece que no hay proyectos que mostrar en este momento</p>
                            </div>
                    }
                </div>

                <div ref={projectsSolicitudes_ref} className="d-none row px-3">

                    {
                        projectsSolicitudes.length
                            ? projectsSolicitudes
                                .map((project, index) => (
                                    <>
                                        <ProjectSolicitudLista project={project} setProjects={setProjectsSolicitudes} index={index}/>
                                        {
                                            index + 1 < projectsSolicitudes.length && <hr className={"hr"}/>
                                        }
                                    </>
                                ))
                            : <div className="text-center mt-5">
                                <h1 className="display-5 fw-bold">No hay proyectos que mostrar</h1>
                                <p className="lead">Parece que no hay proyectos que mostrar en este momento</p>
                            </div>
                    }
                </div>

                <div ref={codigosAdmin_ref} className="d-none row card-group px-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto text-center mt-5">
                                <p className='fw-bold mt-5'>¿Cuántos usos tendrá este código?</p>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="rounded border-normal p-2 text-center mt-3"
                                        placeholder="Número"
                                        style={{maxWidth: 165, height: 48}}
                                        value={numUsos}
                                        onChange={e => setNumUsos(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <button className="btn btn-primary mt-3" style={{maxWidth: 262, height: 48}} onClick={crearCodigo}>GENERAR CÓDIGO</button>
                                </div>
                            </div>


                            <div className="col-md-6 justify-content-center mt-4">
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center border-bottom border-2">
                                        <p className="m-3 fw-bold">Código</p>
                                        <p className="m-3 fw-bold">Usos restantes</p>
                                    </div>
                                    {codigos.length > 0 ? (
                                        <div className="list-group">
                                            {codigos.map((codigo, index) => (
                                                <div key={index} className={`${!codigo.usos && 'opacity-25'} list-group-item d-flex align-items-center justify-content-between`}>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src="icons/copiar.svg"
                                                            alt="Copiar"
                                                            className="me-4 "
                                                            onClick={() => copiarAlPortapapeles(codigo.codigo)}
                                                        />

                                                        <span className='font-monospace'>{codigo.codigo.split('').join(' - ')}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="me-5 ms-semibold">{codigo.usos}</span>
                                                        <img src="icons/eliminar.svg" alt="Eliminar" className='me-3' onClick={() => eliminarCodigo(codigo.id, index)}/>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center">No hay códigos disponibles.</p>
                                    )}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    if (user.rol == "alumno") return (
        <>
            {modal_show_edit_profile || modal_show_new_project ? (
                <div className="backdrop"></div>
            ) : null}
            <div className="container-fluid">
                <div className="modal-container">
                    <EditProfileModal show={modal_show_edit_profile} setShow={setModalShowEditProfile} default_user_data={user}/>
                    <NewProjectModal show={modal_show_new_project} setShow={setModalShowNewProject}/>
                </div>
                <div className="d-flex flex-row gap-5 gap-sm-0 flex-wrap-reverse flex-sm-nowrap justify-content-center justify-content-sm-between px-5 pt-5">
                    <div className="">
                        <h1 className="fw-bold display-4">{nombreCompletoCapitalizado}</h1>
                        <b className="fw-bold fs-5">{user.correo}</b>
                        <p className="link-offset-1 fw-bold  color-principal mt-2"><Image src="/icons/enlace.svg" alt="enlace.svg" className="d-start w-auto h-auto" height={0} width={0}/> {' '}<Link href={`${user.portfolio}`} target="_blank">{user.portfolio}</Link></p>
                        <p className="ms-regular text-break w-75">{user.descripcion}</p>
                        <div className="d-flex flex-column flex-sm-row gap-3">
                            <button className="btn btn-primary btn-font p-2 btn-hover" onClick={() => setModalShowNewProject(true)}>Nuevo proyecto</button>
                            <button className="btn btn-outline-primary btn-font color-secundario-negro notfound-boton btn btn-outline-primary p-2" onClick={() => setModalShowEditProfile(true)}>Editar perfil</button>
                        </div>
                    </div>

                    <div className={'position-relative'} style={{width: '11.99244rem', height: '12rem'}}>
                        <Image className={"rounded"} src={user.foto} objectFit={'cover'} width={0} height={0} fill sizes={'1'} alt={user.foto}/>
                    </div>
                </div>

                <div className="d-flex flex-row gap-5 mt-5 ps-5 border-bottom color-secundario-gris">
                    <button ref={projectsValidados_btn_ref} className="btn btn-custom btn-active" onClick={(e) => {
                        projectsValidados_ref.current.classList.remove('d-none')
                        projectsNoValidados_ref.current.classList.add('d-none')

                        projectsValidados_btn_ref.current.classList.add('btn-active')
                        projectsNoValidados_btn_ref.current.classList.remove('btn-active')
                    }}>Proyectos subidos
                    </button>

                    <button ref={projectsNoValidados_btn_ref} className="btn btn-custom" onClick={() => {
                        projectsValidados_ref.current.classList.add('d-none')
                        projectsNoValidados_ref.current.classList.remove('d-none')

                        projectsValidados_btn_ref.current.classList.remove('btn-active')
                        projectsNoValidados_btn_ref.current.classList.add('btn-active')
                    }}>Solicitudes pendientes
                    </button>
                </div>

                <div ref={projectsValidados_ref} className="row card-group mt-5 px-3">
                    {
                        projectsValidados.length
                            ? projectsValidados.map(project => <ProjectCard key={project.id} onClick={handleCardClick} project={project}/>)
                            :
                            <div className="text-center mt-5">
                                <h1 className="display-5 fw-bold">No hay proyectos que mostrar</h1>
                                <p className="lead">Parece que no hay proyectos que mostrar en este momento</p>
                            </div>
                    }
                </div>

                <div ref={projectsNoValidados_ref} className="d-none row card-group mt-5 px-3">
                    {
                        projectsNoValidados.length
                            ? projectsNoValidados.map(project => <ProjectCard key={project.id} onClick={(id) => console.log("Not possible to redirect")} project={project}/>)
                            :
                            <div className="text-center mt-5">
                                <h1 className="display-5 fw-bold">No hay solicitudes que mostrar</h1>
                                <p className="lead">Parece que no hay solicitudes que mostrar en este momento</p>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}