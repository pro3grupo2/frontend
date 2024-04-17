"use client"

import React, {useRef, useState} from 'react'

import Link from 'next/link'
import Image from 'next/image'

import {EstructuraFormularios} from "@/components/Estructura"
import {ControladorSiguienteAtras} from "@/components/Signup"
import {AlertContainer, create_alert} from "@/components/Alerts";
import Loading from "@/components/Loading";

import {recover} from '@/api/v1/auth'
import {check_email} from "@/utils/validation";

export default function RecoverPassword() {
    const
        email_ref = useRef(null),
        [email, setEmail] = useState(''),
        [email_checks, setEmailChecks] = useState([]),
        [loading, setLoading] = useState(false),
        [alerts, setAlerts] = useState([]),
        [step, setStep] = useState(1)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setEmailChecks([])

        if (!check_email(
            email,
            (error) => {
                setEmailChecks((previous) => [...previous, error])
            }
        )) return email_ref.current.classList.add('border-error')

        setLoading(true)
        const data = await recover(email)
        setLoading(false)

        if (!data) {
            create_alert(setAlerts, 'Error al recuperar la cuenta', 'danger')
            return
        }

        setStep(step + 1)
    }

    if (loading) return <Loading/>

    if (step === 1)
        return (
            <>
                <AlertContainer alerts={alerts}/>

                <EstructuraFormularios>
                    <div className='d-flex flex-column justify-content-evenly h-100 p-0 pe-xl-5'style={{maxWidth:560}}>
                        <div>
                            <h1 className="fw-bold">¿Has olvidado tu contraseña?</h1>
                            <p className='pe-1 mt-3'>
                                Indícanos cuál es tu correo electrónico y te enviaremos un enlace para que puedas recuperar
                                tu contraseña.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <input
                                ref={email_ref}
                                type="email"
                                id="email"
                                className="ms-regular form-control background-color-secundario-gris-claro-extra py-3 ps-4 fs-5"
                                style={{backgroundColor: "var(--secundario-gris-claro)"}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => email_ref.current.classList.remove('border-error')}
                                placeholder="Correo electrónico"
                                autoComplete="off"
                            />

                            <div className="">
                                {
                                    email_checks.map((check, index) => (
                                        <p key={index} className="text-danger fs-6 p-0 ps-4 m-0">{check}</p>
                                    ))
                                }
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-5">
                                <Link href="/signin">
                                    <button
                                        className='btn btn-outline-primary'
                                        type="button"
                                        style={{width: '48px', height: '48px'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"
                                             fill="none">
                                            <path
                                                d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z"
                                                fill="#091229"/>
                                        </svg>
                                    </button>
                                </Link>

                                <button
                                    className='btn btn-primary btn-color-primary  border-5 fs-5 fw-bold'
                                    type="submit">
                                    SIGUIENTE
                                </button>
                            </div>
                        </form>
                    </div>
                </EstructuraFormularios>
            </>
        )

    return (
        <div className='d-flex flex-column align-items-center justify-content-evenly text-center' style={{minHeight: '60vh'}}>
            <h1 className="display-5 custom-bold mb-3">¡Correo de recuperación enviado!</h1>
            <Image src="/icons/mail.svg" alt="mail.svg" width={0} height={0} className="d-none d-md-block w-auto h-auto"/>
            <p className='ms-font fs-5 lead w-50'>Ya puedes cerrar esta pestaña. <br/>Revisa tu correo para recuperar tu cuenta</p>
        </div>
    )
}
