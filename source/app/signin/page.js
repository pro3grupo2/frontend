"use client"

import React, {useRef, useState} from 'react'

import Link from 'next/link'
import Image from "next/image"

import {AlertContainer, create_alert} from "@/components/Alerts"
import {EstructuraFormularios} from "@/components/Estructura"
import NavBar from "@/components/NavBar"
import Loading from "@/components/Loading"

import {check_email, check_password} from "@/utils/validation"

import "../../styles/Signup.css"
import {AuthProvider, useAuth} from "@/context/authContext"

import {recover_texts, sign_in_texts} from "@/lang"

function SignInComponent() {
    const {auth_signin} = useAuth()

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

    const sign_in_json = sign_in_texts(localStorage.getItem("lang") ?? "EN")

    const handleSubmit = async (e) => {
        e.preventDefault()

        setEmailChecks([])
        setPasswordChecks([])

        if (!check_email(
            email,
            localStorage.getItem("lang") ?? "EN",
            (error) => {
                setEmailChecks((previous) => [...previous, error])
            }
        )) return email_ref.current.classList.add('border-error')
        email_ref.current.classList.remove('border-error')

        if (!check_password(
            password,
            localStorage.getItem("lang") ?? "EN",
            (error) => {
                setPasswordChecks((previous) => [...previous, error])
            }
        )) return password_ref.current.classList.add('border-error')
        password_ref.current.classList.remove('border-error')

        setLoading(true)
        await auth_signin(email, password, (error) => create_alert(setAlerts, error, 'danger'))
        setLoading(false)
    }

    if (loading) return <Loading/>

    return (
        <>
            <AlertContainer alerts={alerts}/>

            <EstructuraFormularios clase_imagen="bg-image-signin">
                <form onSubmit={handleSubmit} className='d-flex flex-column gap-xxl-5' style={{maxWidth: '32rem'}}>
                    <div>
                        <h1 className='fw-bold'>{sign_in_json.title}</h1>
                        <p className='ms-regular'>
                            {sign_in_json.subtitle}
                        </p>
                    </div>

                    <div>
                        <input
                            ref={email_ref}
                            type="text"
                            id="email"
                            value={email}
                            className="ms-regular form-control border-2 background-color-secundario-gris-claro-extra py-3 ps-4 fs-5"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{maxHeight: '3rem'}}
                            onFocus={() => email_ref.current.classList.remove('border-error')}
                            placeholder={sign_in_json.email_placeholder}
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
                                className="ms-regular flex-grow-1 form-control border-2 background-color-secundario-gris-claro-extra py-3 ps-4 fs-5"
                                onChange={(e) => setPassword(e.target.value)}
                                style={{maxHeight: '3rem'}}
                                onFocus={() => {
                                    setError(null)
                                    password_ref.current.classList.remove('border-error')
                                }}
                                placeholder={sign_in_json.password_placeholder}
                                autoComplete="off"
                            />

                            <button
                                type="button"
                                className="position-absolute top-50 end-0 translate-middle-y btn btn-link btn-icon border-0"
                                onClick={() => setTipoPassword(tipo_password === 'password' ? 'text' : 'password')}>
                                <Image src="/icons/Ojo.svg" alt="Mostrar/Ocultar contraseña" height={24} width={24}/>
                            </button>
                        </div>

                        <div className={'mb-4'}>
                            {
                                password_checks.map((check, index) => (
                                    <p key={index} className={'color-error ms-regular-subbody p-0 ps-4 m-0'}>{check}</p>
                                ))
                            }
                        </div>

                        {error && <p style={{color: 'red'}}>{error}</p>}

                        <Link className="fw-bold ps-1 link-dark" href="/recover">{sign_in_json.recover_link}</Link>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary mt-5 btn-lg text-center fw-bold fs-3 w-100 text-uppercase"
                            style={{maxHeight: 54}}>
                            {sign_in_json.login_button}
                        </button>

                        <div className="text-center mt-4">
                            <span className="pe-1 ">{sign_in_json.signup_text}</span>
                            <Link className="link-underline-dark link-dark fw-bold ps-1" href="/signup">{sign_in_json.signup_link}</Link>
                        </div>
                    </div>
                </form>
            </EstructuraFormularios>
        </>
    )
}

export default function SignIn() {
    return (
        <AuthProvider>
            <NavBar lang={localStorage.getItem("lang") ?? "EN"}/>
            <SignInComponent/>
        </AuthProvider>
    )
}