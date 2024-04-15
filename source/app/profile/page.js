"use client"

import React, { useEffect, useRef, useState } from 'react'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import '../globals.css'
import '../../styles/profile.css'

import ProjectCard from "@/components/ProjectCard"
import { get_me_proyectos } from "@/api/v1/proyectos"
import { me } from "@/api/v1/auth"
import Loading from "@/components/Loading"
import EditProfileModal from "@/components/EditProfileModal"
import NewProjectModal from "@/components/NewProjectModal"

export default function Profile() {
    const
        [user, setUser] = useState({}),
        [projectsValidados, setProjectsValidados] = useState([]),
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
        router = useRouter()

    const
        [modal_show_edit_profile, setModalShowEditProfile] = useState(false),
        [modal_show_new_project, setModalShowNewProject] = useState(false)


    useEffect(() => {
        if (!localStorage.getItem('token'))
            return router.push('/signin')

        setLoading(true)
        me(localStorage.getItem('token'))
            .then(data => {
                console.log("mne", data)
                if (!data) return router.push('/signin')
                setUser(data)
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

    if (loading) return <Loading />

    // Convertir la primera letra del nombre y del apellido a mayúscula
    const nombreCompletoCapitalizado = user.nombre_completo && typeof user.nombre_completo === 'string'
        ? user.nombre_completo
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : "";

    if (user.rol=="coordinador") return (
        <>
            {modal_show_edit_profile || modal_show_new_project ? (
                <div className="backdrop"></div>
            ) : null}
            <div className="container-fluid">
                <div className="modal-container">
                    <EditProfileModal show={modal_show_edit_profile} setShow={setModalShowEditProfile} default_user_data={user} />
                    <NewProjectModal show={modal_show_new_project} setShow={setModalShowNewProject} />
                </div>
                <div className="d-flex flex-row gap-5 gap-sm-0 flex-wrap-reverse flex-sm-nowrap justify-content-center justify-content-sm-between px-5 pt-5">
                    <div className="">
                        <h1 className="fw-bold display-4">{nombreCompletoCapitalizado}</h1>
                        <b className="fw-bold fs-5">{user.correo}</b>
                        <p className="link-offset-1 fw-bold  color-principal mt-2"> <Image src="/icons/enlace.svg" alt="Mostrar/Ocultar contraseña" height={24} width={24} /> {' '}<Link href={`${user.portfolio}`} target="_blank">{user.portfolio}</Link></p>
                        <p className="ms-regular text-break w-75">{user.descripcion}</p>
                        <div className="d-flex flex-row gap-3">
                            <button className="btn btn-primary btn-font color-secundario-blanco background-color-principal p-2" onClick={() => setModalShowNewProject(true)}>Nuevo proyecto</button>
                            <button className="btn btn-primary btn-font color-secundario-negro background-color-secundario-blanco p-2" onClick={() => setModalShowEditProfile(true)}>Editar perfil</button>
                        </div>
                    </div>


                    <div className="image-container" style={{ width: '208px', height: '208px', position: 'relative', overflow: 'hidden' }}>
                        <Image
                            className="rounded img-fluid"
                            src={user.foto}
                            alt="perfil"
                            style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }}
                            layout="responsive"
                            width={208}
                            height={208}
                        />
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

                <div ref={projectsValidados_ref} className="row card-group mt-5 px-3">
                    {
                        projectsValidados.length
                            ? projectsValidados.map(project => <ProjectCard key={project.id} project={project} />)
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
                            ? projectsNoValidados.map(project => <ProjectCard key={project.id} project={project} />)
                            :
                            <div className="text-center mt-5">
                                <h1 className="display-5 fw-bold">No hay solicitudes que mostrar</h1>
                                <p className="lead">Parece que no hay solicitudes que mostrar en este momento</p>
                            </div>
                    }
                </div>
                <div ref={projectsSolicitudes_ref} className="d-none row card-group mt-5 px-3">
                    {
                        <div className="text-center mt-5">
                            <h1 className="display-5 fw-bold">No hay solicitudes</h1>
                            <p className="lead">Parece que no hay solicitudes que mostrar en este momento</p>
                        </div>
                    }
                </div>
                <div ref={codigosAdmin_ref} className="d-none row card-group mt-5 px-3">
                    {
                        <div className="text-center mt-5">
                            <h1 className="display-5 fw-bold">No hay CODIGOOOS</h1>
                            <p className="lead">Parece que no hay codigos que mostrar en este momento</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )

    if (user.rol=="alumno") return (
        <>
            {modal_show_edit_profile || modal_show_new_project ? (
                <div className="backdrop"></div>
            ) : null}
            <div className="container-fluid">
                <div className="modal-container">
                    <EditProfileModal show={modal_show_edit_profile} setShow={setModalShowEditProfile} default_user_data={user} />
                    <NewProjectModal show={modal_show_new_project} setShow={setModalShowNewProject} />
                </div>
                <div className="d-flex flex-row gap-5 gap-sm-0 flex-wrap-reverse flex-sm-nowrap justify-content-center justify-content-sm-between px-5 pt-5">
                    <div className="">
                        <h1 className="fw-bold display-4">{nombreCompletoCapitalizado}</h1>
                        <b className="fw-bold fs-5">{user.correo}</b>
                        <p className="link-offset-1 fw-bold  color-principal mt-2"> <Image src="/icons/enlace.svg" alt="Mostrar/Ocultar contraseña" height={24} width={24} /> {' '}<Link href={`${user.portfolio}`} target="_blank">{user.portfolio}</Link></p>
                        <p className="ms-regular text-break w-75">{user.descripcion}</p>
                        <div className="d-flex flex-row gap-3">
                            <button className="btn btn-primary btn-font color-secundario-blanco background-color-principal p-2" onClick={() => setModalShowNewProject(true)}>Nuevo proyecto</button>
                            <button className="btn btn-primary btn-font color-secundario-negro background-color-secundario-blanco p-2" onClick={() => setModalShowEditProfile(true)}>Editar perfil</button>
                        </div>
                    </div>


                    <div className="image-container" style={{ width: '208px', height: '208px', position: 'relative', overflow: 'hidden' }}>
                        <Image
                            className="rounded img-fluid"
                            src={user.foto}
                            alt="perfil"
                            style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }}
                            layout="responsive"
                            width={208}
                            height={208}
                        />
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
                            ? projectsValidados.map(project => <ProjectCard key={project.id} project={project} />)
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
                            ? projectsNoValidados.map(project => <ProjectCard key={project.id} project={project} />)
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