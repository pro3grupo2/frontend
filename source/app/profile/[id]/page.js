"use client"

import React, {useEffect, useRef, useState} from 'react'

import {useRouter} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import {AuthProvider, useAuth} from "@/context/authContext"

import {me} from "@/api/v1/auth"
import {get_user_by_id} from "@/api/v1/usuarios"
import {crear_codigo, eliminar_codigo, get_codigos} from "@/api/v1/codigos"
import {get_me_proyectos, get_proyectos_pendientes} from "@/api/v1/proyectos"

import ProjectCard from "@/components/ProjectCard"
import Loading from "@/components/Loading"
import EditProfileModal from "@/components/EditProfileModal"
import NewProjectModal from "@/components/NewProjectModal"
import {ProjectSolicitudLista} from "@/components/ProjectSolicitudLista"
import ConfirmModal from "@/components/ConfirmModal"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"

import '../../globals.css'
import '../../../styles/Profile.css'

import {profile_texts} from "@/lang"

function ProfileComponent({params}) {
    const {usuario, token} = useAuth()

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
        [numUsos, setNumUsos] = useState(''),
        [showConfirmModal, setShowConfirmModal] = useState(false),
        [codigoToDelete, setCodigoToDelete] = useState(null),
        [canShowCodigos, setCanShowCodigos] = useState(false),
        [is_owner, setIsOwner] = useState(false),
        [is_coordinador, setIsCoordinador] = useState(false),
        router = useRouter()
    // searchParams = useSearchParams()
    
    const profile_json = profile_texts(localStorage.getItem('lang') ?? 'EN')

    const
        [modal_show_edit_profile, setModalShowEditProfile] = useState(false),
        [modal_show_new_project, setModalShowNewProject] = useState(false)

    const crearCodigo = async () => {
        await crear_codigo(token, numUsos)
        const data = await get_codigos(token)
        if (!data) return
        setCodigos(data.reverse())
    }

    const copiarAlPortapapeles = (codigo) => {
        navigator.clipboard
            .writeText(codigo)
            .then(() => alert(profile_json.clipboard.copied))
            .catch(err => alert(profile_json.clipboard.error + err))
    }

    useEffect(() => {
        setLoading(true)
        if (!token) return

        if (params.id !== 'me')
            get_user_by_id(token, params.id)
                .then(data => {
                    if (!data) return
                    setUser(data)

                    setProjectsValidados([])
                    setProjectsNoValidados([])

                    for (let project of data.proyectos)
                        project.estado === 'aceptado'
                            ? setProjectsValidados(prev => [...prev, project])
                            : setProjectsNoValidados(prev => [...prev, project])
                })

        setLoading(false)
    }, [token])

    useEffect(() => {
        setLoading(true)
        if (!token) return

        if (params.id === "me") {
            setUser(usuario)
            setIsOwner(true)

            if (usuario.rol === "coordinador") {
                setIsCoordinador(true)
                setCanShowCodigos(true)

                get_codigos(token)
                    .then(data => {
                        if (!data) return
                        setCodigos(data.reverse())
                    })

                get_proyectos_pendientes(token)
                    .then(data => {
                        if (!data) return
                        setProjectsSolicitudes(data)
                    })
            }

            get_me_proyectos(token)
                .then(data => {
                    setProjectsValidados([])
                    setProjectsNoValidados([])

                    if (!data) return
                    for (let project of data)
                        project.estado === 'aceptado'
                            ? setProjectsValidados(prev => [...prev, project])
                            : setProjectsNoValidados(prev => [...prev, project])
                })
        }

        setLoading(false)
    }, [token, usuario])

    if (loading) return <Loading/>

    // Redirigir a la página del proyecto al hacer click en una tarjeta
    const handleCardClick = (id) => {
        router.push(`/project/${id}`)
    }

    // Convertir la primera letra del nombre y del apellido a mayúscula
    const nombreCompletoCapitalizado = user.nombre_completo && typeof user.nombre_completo === 'string'
        ?
        user.nombre_completo
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        :
        ""

    const handleDeleteClick = (codigoId, index) => {
        setCodigoToDelete({codigoId, index})
        setShowConfirmModal(true)
    }

    const confirmDelete = async () => {
        const {codigoId, index} = codigoToDelete
        const data = await eliminar_codigo(token, codigoId)
        if (!data) {
            alert(profile_json.codes.delete_error)
        } else {
            setCodigos(codigos.filter((_, idx) => idx !== index))
        }
        setShowConfirmModal(false)
    }

    if (!Object.keys(user).length) {
        return (
            <div className="container-fluid p-5 d-flex flex-column justify-content-center" style={{height: '100vh'}}>
                <div className="text-center">
                    <h1 className="display-1 ms-black">{profile_json.user_not_found}</h1>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container-fluid">
                <div className="modal-container">
                    <EditProfileModal show={modal_show_edit_profile} setShow={setModalShowEditProfile}/>
                    <NewProjectModal show={modal_show_new_project} setShow={setModalShowNewProject}/>
                    <ConfirmModal show={showConfirmModal} setShow={setShowConfirmModal} onConfirm={confirmDelete}/>
                </div>

                <div className="d-flex flex-row gap-5 gap-md-0 flex-wrap-reverse flex-md-nowrap justify-content-center justify-content-md-between px-3 pt-5">
                    <div className="d-flex flex-column flex-nowrap " style={{width: 480}}>
                        <div className="position-relative d-flex w-100">
                            <button className="position-absolute top-50 start-0 translate-middle-y flex-shrink-1 border border-0 bg-transparent me-5" onClick={() => router.back()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                                    <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#0065F3"/>
                                </svg>
                            </button>
                            <h1 className="fw-bold mx-4 px-3 fw-bold p-0 m-0 flex-grow-1">{nombreCompletoCapitalizado}</h1>
                        </div>

                        <b className="ms-extra-bold-subtitle p-0 m-0 mx-4 px-3 pt-3">{user.correo}</b>
                        <p className="link-offset-1 fw-bold p-0 m-0 mx-4 px-3 pt-1"><Image src="/icons/enlace.svg" className="d-start w-auto h-auto" alt="enlace" height={0} width={0}/> {' '}<Link href={`${user.portfolio}`} target="_blank">{user.portfolio}</Link></p>
                        <p className="ms-regular text-break p-0 m-0 mx-4 px-3 pt-3" style={{maxWidth: '30rem'}}>{user.descripcion}</p>
                        <div className={`${is_owner ? 'd-flex' : 'd-none'} flex-row gap-3 mx-4 px-3 pt-3`}>
                            <button className="btn btn-primary ms-button-small p-2 btn-hover" style={{minHeight: 48, maxWidth: 238}} onClick={() => setModalShowNewProject(true)}>{profile_json.new_project}</button>
                            <button className="btn btn-outline-primary ms-button-small color-secundario-negro p-2" style={{minHeight: 48, maxWidth: 192}} onClick={() => setModalShowEditProfile(true)}>{profile_json.edit_profile}</button>
                        </div>
                    </div>

                    <div className={'position-relative'} style={{width: '11.99244rem', height: '12rem'}}>
                        <Image className={"rounded"} src={user.foto?.startsWith('http') ? user.foto : `https://api.reservorio-u-tad.com${user.foto ?? '/files/0/fcc5ccaf95f83cba44186b36a2fadde4.jpeg'}`} objectFit={'cover'} width={0} height={0} fill sizes={'1'} alt={user.foto}/>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-sm-5 mt-5 ps-sm-5 border-bottom color-secundario-gris">
                    <button ref={projectsValidados_btn_ref} className="btn btn-custom btn-active ms-bold-subbody" onClick={(e) => {
                        projectsValidados_ref.current.classList.remove('d-none')
                        projectsNoValidados_ref.current.classList.add('d-none')
                        projectsSolicitudes_ref.current.classList.add('d-none')
                        codigosAdmin_ref.current.classList.add('d-none')

                        projectsValidados_btn_ref.current.classList.add('btn-active')
                        projectsNoValidados_btn_ref.current.classList.remove('btn-active')
                        projectsSolicitudes_btn_ref.current.classList.remove('btn-active')
                        codigosAdmin_btn_ref.current.classList.remove('btn-active')
                    }}>{profile_json.topics.uploaded.title}
                    </button>

                    <button ref={projectsNoValidados_btn_ref} className={`${(!is_owner) && 'd-none'} btn btn-custom ms-bold-subbody`} onClick={() => {
                        projectsValidados_ref.current.classList.add('d-none')
                        projectsNoValidados_ref.current.classList.remove('d-none')
                        projectsSolicitudes_ref.current.classList.add('d-none')
                        codigosAdmin_ref.current.classList.add('d-none')

                        projectsValidados_btn_ref.current.classList.remove('btn-active')
                        projectsNoValidados_btn_ref.current.classList.add('btn-active')
                        projectsSolicitudes_btn_ref.current.classList.remove('btn-active')
                        codigosAdmin_btn_ref.current.classList.remove('btn-active')
                    }}>{profile_json.topics.pending.title}
                    </button>

                    <button ref={projectsSolicitudes_btn_ref} className={`${!is_coordinador && 'd-none'} btn btn-custom ms-bold-subbody`} onClick={() => {
                        projectsValidados_ref.current.classList.add('d-none')
                        projectsNoValidados_ref.current.classList.add('d-none')
                        projectsSolicitudes_ref.current.classList.remove('d-none')
                        codigosAdmin_ref.current.classList.add('d-none')

                        projectsValidados_btn_ref.current.classList.remove('btn-active')
                        projectsNoValidados_btn_ref.current.classList.remove('btn-active')
                        projectsSolicitudes_btn_ref.current.classList.add('btn-active')
                        codigosAdmin_btn_ref.current.classList.remove('btn-active')
                    }}>{profile_json.topics.manage.title}
                    </button>

                    <button ref={codigosAdmin_btn_ref} className={`${!is_coordinador && 'd-none'} btn btn-custom ms-bold-subbody`} onClick={() => {
                        projectsValidados_ref.current.classList.add('d-none')
                        projectsNoValidados_ref.current.classList.add('d-none')
                        projectsSolicitudes_ref.current.classList.add('d-none')
                        codigosAdmin_ref.current.classList.remove('d-none')

                        projectsValidados_btn_ref.current.classList.remove('btn-active')
                        projectsNoValidados_btn_ref.current.classList.remove('btn-active')
                        projectsSolicitudes_btn_ref.current.classList.remove('btn-active')
                        codigosAdmin_btn_ref.current.classList.add('btn-active')
                    }}>{profile_json.topics.codes.title}
                    </button>
                </div>

                <div ref={projectsValidados_ref} className="row card-group mt-5 px-3">
                    {
                        projectsValidados.length
                            ?
                            projectsValidados.map(project => <ProjectCard key={project.id} onClick={handleCardClick} project={project} isHome={true}/>)
                            :
                            <div className="text-center mt-5">
                                <h1 className="ms-extra-bold">{profile_json.topics.uploaded.empty.title}</h1>
                                <p className="lead">{profile_json.topics.uploaded.empty.description}</p>
                            </div>
                    }
                </div>

                <div ref={projectsNoValidados_ref} className="d-none row card-group mt-5 px-3">
                    {
                        projectsNoValidados.length
                            ?
                            projectsNoValidados.map(project => <ProjectCard key={project.id} onClick={console.log} project={project} isHome={true}/>)
                            :
                            <div className="text-center mt-5">
                                <h1 className="ms-extra-bold">{profile_json.topics.pending.empty.title}</h1>
                                <p className="lead">{profile_json.topics.pending.empty.description}</p>
                            </div>
                    }
                </div>

                <div ref={projectsSolicitudes_ref} className="d-none row px-3">
                    {
                        projectsSolicitudes.length
                            ?
                            projectsSolicitudes
                                .map((project, index) => (
                                    <>
                                        <ProjectSolicitudLista project={project} setProjects={setProjectsSolicitudes} index={index}/>
                                        {
                                            index + 1 < projectsSolicitudes.length && <hr className={"hr"}/>
                                        }
                                    </>
                                ))
                            :
                            <div className="text-center mt-5">
                                <h1 className="ms-extra-bold">{profile_json.topics.manage.empty.title}</h1>
                                <p className="lead">{profile_json.topics.manage.empty.description}</p>
                            </div>
                    }
                </div>

                <div ref={codigosAdmin_ref} className="d-none row card-group px-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto text-center mt-5">
                                <p className='fw-bold mt-5'>{profile_json.topics.codes.uses_title}</p>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="rounded border-normal p-2 text-center mt-3 w-100"
                                        placeholder={profile_json.topics.codes.uses_placeholder}
                                        min={1}
                                        max={10}
                                        style={{maxWidth: 165, height: 48}}
                                        value={numUsos}
                                        onChange={e => setNumUsos(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <button
                                        className="btn btn-primary mt-3 ms-button w-100"
                                        style={{maxWidth: 262, height: 48}}
                                        onClick={crearCodigo}
                                        disabled={!numUsos || numUsos <= 0 || numUsos > 10} // Deshabilita el botón si numUsos está vacío o es cero
                                    >
                                        {profile_json.topics.codes.generate}
                                    </button>
                                </div>
                            </div>

                            <div className="col-md-6 justify-content-center mt-4">
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center border-bottom border-2">
                                        <p className="m-3 fw-bold">{profile_json.topics.codes.table.code}</p>
                                        <p className="m-3 fw-bold">{profile_json.topics.codes.table.uses}</p>
                                    </div>

                                    {
                                        codigos.length
                                            ?
                                            <div className="list-group">
                                                {codigos.map((codigo, index) => (
                                                    <div key={index} className={`${!codigo.usos && 'opacity-25'} list-group-item d-flex align-items-center justify-content-between`}>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src="/icons/copiar.svg"
                                                                alt="Copiar"
                                                                className="btn btn-icon"
                                                                onClick={() => copiarAlPortapapeles(codigo.codigo)}
                                                            />

                                                            <span className='font-monospace'>{codigo.codigo.split('').join(' - ')}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <span className="me-5 ms-semibold">{codigo.usos}</span>
                                                            <img
                                                                src="/icons/eliminar.svg"
                                                                alt="Eliminar"
                                                                className='btn btn-icon'
                                                                onClick={() => handleDeleteClick(codigo.id, index)}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            :
                                            <p className="text-center">{profile_json.topics.codes.table.empty}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer lang={localStorage.getItem("lang") ?? "EN"}/>
        </>
    )
}

export default function Profile({params}) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return <Loading/>

    return (
        <AuthProvider>
            <NavBar lang={localStorage.getItem("lang") ?? "EN"}/>
            <ProfileComponent params={params}/>
        </AuthProvider>
    )
}