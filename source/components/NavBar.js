"use client"

import React, {useEffect, useRef, useState} from "react"

import {useRouter} from "next/navigation"
import Link from 'next/link'
import Image from 'next/image'

import {get_proyectos_pendientes} from "@/api/v1/proyectos"
import {useAuth} from "@/context/authContext"
import NewProjectModal from "@/components/NewProjectModal"

export default function NavBar() {
    const {usuario, token, signed, auth_signout} = useAuth()

    const
        [isProfileHover, setIsProfileHover] = useState(false),
        timerRef = useRef(),
        [modal_show_new_project, setModalShowNewProject] = useState(false),
        router = useRouter()

    const
        [has_proyectos_pendientes, setHasProyectosPendientes] = useState(false)

    useEffect(() => {
        if (!token) return

        if (usuario?.rol === 'coordinador')
            get_proyectos_pendientes(token)
                .then(data => {
                    if (data.length > 0) setHasProyectosPendientes(true)
                })
    }, [token, usuario])

    const handleMouseEnter = () => {
        clearTimeout(timerRef.current)
        setIsProfileHover(true)
    }

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => setIsProfileHover(false), 200)
    }

    const handleLogout = () => {
        auth_signout()
    }

    const handleLogin = () => {
        router.push('/signin')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow " style={{maxHeight: 72}}>
                <div className="modal-container">
                    <NewProjectModal show={modal_show_new_project} setShow={setModalShowNewProject}/>
                </div>

                <div className="container-fluid">
                    <div className="navbar-brand" style={{maxWidth: '20vw', minWidth: '50px'}}>
                        <Link className="mx-2" href="/home">
                            <Image className="img-fluid" src="/images/logos/utad.svg" alt="Logo de U-tad" width={127} height={40}/>
                        </Link>
                    </div>

                    <div className="d-flex align-items-center">
                        <p className="m-0 fs-6 p-2 mx-sm-2 mx-md-3">900 373 379</p>

                        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <Link className="position-relative mx-sm-2 mx-md-3" href="/profile/me">
                                {
                                    isProfileHover
                                        ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32"
                                             fill="none">
                                            <path
                                                d="M16 0C18.1217 0 20.1566 0.842854 21.6569 2.34315C23.1571 3.84344 24 5.87827 24 8C24 10.1217 23.1571 12.1566 21.6569 13.6569C20.1566 15.1571 18.1217 16 16 16C13.8783 16 11.8434 15.1571 10.3431 13.6569C8.84285 12.1566 8 10.1217 8 8C8 5.87827 8.84285 3.84344 10.3431 2.34315C11.8434 0.842854 13.8783 0 16 0ZM16 20C24.84 20 32 23.58 32 28V32H0V28C0 23.58 7.16 20 16 20Z"
                                                fill="#0065F3"/>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 42 42"
                                             fill="none">
                                            <path
                                                d="M21 1C23.5196 1 25.9359 2.00089 27.7175 3.78249C29.4991 5.56408 30.5 7.98044 30.5 10.5C30.5 13.0196 29.4991 15.4359 27.7175 17.2175C25.9359 18.9991 23.5196 20 21 20C18.4804 20 16.0641 18.9991 14.2825 17.2175C12.5009 15.4359 11.5 13.0196 11.5 10.5C11.5 7.98044 12.5009 5.56408 14.2825 3.78249C16.0641 2.00089 18.4804 1 21 1ZM21 27.25C26.6798 27.25 31.7702 28.4022 35.4037 30.219C39.0968 32.0655 41 34.432 41 36.75V41H1V36.75C1 34.432 2.90325 32.0655 6.59628 30.219C10.2298 28.4022 15.3202 27.25 21 27.25Z"
                                                stroke="black" strokeWidth="2"/>
                                        </svg>
                                }
                                {
                                    has_proyectos_pendientes &&
                                    <span class="position-absolute top-100 start-100 translate-middle p-2 border border-light rounded-circle" style={{backgroundColor: 'var(--color-principal)'}}></span>
                                }
                            </Link>
                        </div>
                        <div className={`position-absolute top-100 end-0 me-4 bg-white shadow p-3 border border-2 rounded-bottom border-primary ${isProfileHover ? "" : "visually-hidden"}`} onMouseEnter={handleMouseEnter} onMouseLeave={() => setIsProfileHover(false)} style={{zIndex: 100}}>
                            <p className="ms-font fw-bold text-center w-100">{signed ? usuario?.nombre_completo : "Usuario"}</p>
                            <hr/>
                            {signed && <button className="nav-link text-secondary w-100 mb-2" onClick={() => setModalShowNewProject(true)}>Nuevo Proyecto</button>}
                            {signed && usuario?.rol === "coordinador" && <button className="nav-link text-secondary w-100 mb-2" onClick={() => router.push("/profile/me?tab=codigos")}>Códigos de Admin.</button>}
                            <button className="nav-link text-secondary w-100 mb-2" onClick={signed ? handleLogout : handleLogin}>{signed ? "Cerrar Sesión" : "Iniciar Sesión"}</button>
                        </div>

                        <button className="border-0 bg-transparent fs-6 fw-bold mx-sm-2 mx-md-3">EN</button>
                    </div>
                </div>
            </nav>
        </>
    )
}