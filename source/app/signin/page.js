"use client"

import React, { useRef, useState } from 'react'

import Link from 'next/link'
import Image from "next/image"

import { AlertContainer, create_alert } from "@/components/Alerts"
import { EstructuraFormularios } from "@/components/Estructura"
import Loading from "@/components/Loading"

import { check_email, check_password } from "@/utils/validation"
import { signin } from "@/api/v1/auth"

import "../../styles/Signup.css"

export default function SignIn() {
    const
        email_ref = useRef(null),
        password_ref = useRef(null),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [tipo_password, setTipoPassword] = useState('password'),
        [email_checks, setEmailChecks] = useState([]),
        [password_checks, setPasswordChecks] = useState([]),
        [alerts, setAlerts] = useState([]),
        [loading, setLoading] = useState(false),
        [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setEmailChecks([])
        setPasswordChecks([])

        if (!check_email(
            email,
            (error) => {
                setEmailChecks((previous) => [...previous, error])
            }
        )) return email_ref.current.classList.add('border-error')
        email_ref.current.classList.remove('border-error')

        if (!check_password(
            password,
            (error) => {
                setPasswordChecks((previous) => [...previous, error])
            }
        )) return password_ref.current.classList.add('border-error')
        password_ref.current.classList.remove('border-error')

        setLoading(true)
        const token = await signin(email, password)
        setLoading(false)

        if (!token) {
            create_alert(setAlerts, 'Correo o contraseña incorrectos', 'danger')
            setError('Correo o contraseña incorrectos')
            return
        }

        localStorage.setItem('token', token)
        window.location.href = '/home'
    }

    if (loading) return <Loading />

    return (
        <>
            <AlertContainer alerts={alerts} />

            <EstructuraFormularios clase_imagen="bg-image-signin">
                <form onSubmit={handleSubmit} className='d-flex flex-column gap-xxl-5' style={{ maxWidth: '32rem' }}>
                    <div>
                        <h1 className='fw-bold'>Iniciar sesión con el correo de la U-tad</h1>
                        <p className='ms-regular'>
                            El desarrollo de proyectos es una carta de presentación de los
                            conocimientos, experiencia y capacidad de trabajo en equipo.
                        </p>
                    </div>

                    <div>
                        <input
                            ref={email_ref}
                            type="email"
                            id="email"
                            value={email}
                            className="ms-regular form-control border-3 background-color-secundario-gris-claro-extra py-3 ps-4 fs-5"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ maxHeight: '3rem' }}
                            onFocus={() => email_ref.current.classList.remove('border-error')}
                            placeholder="Correo electrónico"
                            autoComplete="off"

                        />

                        <div className={'mb-4'}>
                            {
                                email_checks.map((check, index) => (
                                    <p key={index} className={'color-error ms-regular-subbody p-0 ps-4 m-0'}>{check}</p>
                                ))
                            }
                        </div>

                        <div className="position-relative d-flex mt-3">
                            <input
                                ref={password_ref}
                                type={tipo_password}
                                id="password"
                                value={password}
                                className="ms-regular flex-grow-1 form-control border-3 background-color-secundario-gris-claro-extra py-3 ps-4 fs-5"
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ maxHeight: '3rem' }}
                                onFocus={() => {
                                    setError(null)
                                    password_ref.current.classList.remove('border-error')
                                }}
                                placeholder="Contraseña"
                                autoComplete="off"
                            />

                            <button
                                type="button"
                                className="position-absolute top-50 end-0 translate-middle-y btn btn-link btn-icon border-0"
                                onClick={() => setTipoPassword(tipo_password === 'password' ? 'text' : 'password')}>
                                <Image src="/icons/Ojo.svg" alt="Mostrar/Ocultar contraseña" height={24} width={24} />
                            </button>
                        </div>

                        <div className={'mb-4'}>
                            {
                                password_checks.map((check, index) => (
                                    <p key={index} className={'color-error ms-regular-subbody p-0 ps-4 m-0'}>{check}</p>
                                ))
                            }
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <Link className="fw-bold ps-1 link-dark" href="/recover">¿Has olvidado la contraseña?</Link>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary mt-5 btn-lg text-center fw-bold fs-3 w-100 text-uppercase"
                            style={{ maxHeight: 54 }}>
                            Iniciar sesión
                        </button>

                        <div className="text-center mt-4">
                            <span className="pe-1 ">¿Aún no estas registrado?</span>
                            <Link className="link-underline-dark link-dark fw-bold ps-1" href="/signup">¡Inscríbete ahora!</Link>
                        </div>
                    </div>
                </form>
            </EstructuraFormularios>
        </>
    )
}