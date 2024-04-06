"use client"

import React, {useEffect, useRef, useState} from 'react'

import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/navigation"

import '../globals.css'
import '../../styles/profile.css'

import ProjectCard from "@/components/ProjectCard"
import {get_me_proyectos} from "@/api/v1/proyectos"
import {me} from "@/api/v1/auth"
import Loading from "@/components/Loading"
import EditProfileModal from "@/components/EditProfileModal"
import NewProjectModal from "@/components/NewProjectModal"

export default function Profile() {
    const
        [user, setUser] = useState({}),
        [projectsValidados, setProjectsValidados] = useState([]),
        projectsValidados_ref = useRef(),
        projectsNoValidados_ref = useRef(),
        projectsValidados_btn_ref = useRef(),
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

    if (loading) return <Loading/>

    return (
        <div className={`container-fluid ${modal_show_edit_profile || modal_show_new_project ? "overflow-y-hidden" : "overflow-y-scroll"}`}>
            <EditProfileModal show={modal_show_edit_profile} setShow={setModalShowEditProfile} default_user_data={user}/>
            <NewProjectModal show={modal_show_new_project} setShow={setModalShowNewProject}/>

            <div className="d-flex flex-row gap-5 gap-sm-0 flex-wrap-reverse flex-sm-nowrap justify-content-center justify-content-sm-between px-5 pt-5">
                <div className="">
                    <h1 className="ms-extrabold">{user.nombre_completo}</h1>
                    <b className="ms-semibold">{user.correo}</b>
                    <p className="ms-link color-principal"><Link href={`${user.portfolio}`} target="_blank">{user.portfolio}</Link></p>
                    <p className="ms-regular text-break w-50">{user.descripcion}</p>
                    <div className="d-flex flex-row gap-3">
                        <button className="btn btn-primary btn-font color-secundario-blanco background-color-principal p-2" onClick={() => setModalShowNewProject(true)}>Nuevo proyecto</button>
                        <button className="btn btn-primary btn-font color-secundario-negro background-color-secundario-blanco p-2" onClick={() => setModalShowEditProfile(true)}>Editar perfil</button>
                    </div>
                </div>

                <Image className="rounded" src={user.foto} alt="perfil" width={192} height={192}/>
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
                        ? projectsValidados.map(project => <ProjectCard key={project.id} project={project}/>)
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
                        ? projectsNoValidados.map(project => <ProjectCard key={project.id} project={project}/>)
                        :
                        <div className="text-center mt-5">
                            <h1 className="display-5 fw-bold">No hay solicitudes que mostrar</h1>
                            <p className="lead">Parece que no hay solicitudes que mostrar en este momento</p>
                        </div>
                }
            </div>
        </div>
    )
}