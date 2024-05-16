"use client"

import React, {useEffect, useRef, useState} from 'react'

import Link from 'next/link'
import Image from 'next/image'

import {EstructuraFormularios} from "@/components/Estructura"
import {AlertContainer, create_alert} from "@/components/Alerts"
import Loading from "@/components/Loading"

import {recover} from '@/api/v1/auth'
import {check_email} from "@/utils/validation"
import {AuthProvider} from "@/context/authContext"
import NavBar from "@/components/NavBar"

import {recover_texts} from "@/lang"

function RecoverPasswordComponent() {
    const
        email_ref = useRef(null),
        [email, setEmail] = useState(''),
        [email_checks, setEmailChecks] = useState([]),
        [loading, setLoading] = useState(false),
        [alerts, setAlerts] = useState([]),
        [step, setStep] = useState(1),
        [error, setError] = useState('')

    const recover_json = recover_texts(localStorage.getItem('lang') ?? "EN")

    useEffect(() => {
        setEmailChecks([])

        if (!check_email(
            email,
            localStorage.getItem('lang') ?? "EN",
            (error) => {
                setEmailChecks((previous) => [...previous, error])
            }
        )) {
            if (email.length > 0)
                return email_ref.current.classList.add('border-error')
            return email_ref.current.classList.remove('border-error')
        }

        email_ref.current.classList.remove('border-error')
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email_checks.length)
            return email_ref.current.classList.add('border-error')

        setLoading(true)
        const data = await recover(email, (error) => {
            create_alert(setAlerts, error, 'danger')
            setError(recover_json.errors.email_not_registered)
        })
        setLoading(false)

        if (!data) return

        setStep(step + 1)
    }

    if (loading) return <Loading/>

    if (step === 1)
        return (
            <>
                <AlertContainer alerts={alerts}/>

                <EstructuraFormularios clase_imagen="bg-image-recover">
                    <div className='d-flex flex-column gap-xxl-5' style={{maxWidth: '32.8rem'}}>
                        <div>
                            <h1 className="fw-bold">{recover_json.title}</h1>
                            <p className='pe-1 mt-3'>
                                {recover_json.subtitle}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <input
                                ref={email_ref}
                                type="text"
                                id="email"
                                className="ms-regular form-control background-color-secundario-gris-claro-extra py-3 ps-4 fs-5"
                                style={{backgroundColor: "var(--secundario-gris-claro)", maxHeight: '3rem'}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => email_ref.current.classList.remove('border-error')}
                                placeholder={recover_json.input_placeholder}
                                autoComplete="off"
                            />

                            <div className={'my-4'}>
                                {
                                    email_checks.length > 0 &&
                                    <p className="color-secundario-gris ms-bold-body p-0 ps-3 m-0">{recover_json.needs.title}</p>
                                }
                                {
                                    email_checks.map((check, index) => (
                                        <p key={index} className="color-secundario-gris ms-regular-subbody p-0 ps-4 m-0">{check}</p>
                                    ))
                                }
                            </div>


                            {error && <p style={{color: 'red'}}>{error}</p>}

                            <div className="d-flex justify-content-between align-items-center mt-5">
                                <Link href="/signin">
                                    <button
                                        className='btn btn-icon btn-outline-primary'
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
                                    className='btn btn-primary btn-color-primary  border-5 ms-button'
                                    type="submit">
                                    {recover_json.buttons.next}
                                </button>
                            </div>
                        </form>
                    </div>
                </EstructuraFormularios>
            </>
        )

    return (
        <div className='d-flex flex-column align-items-center justify-content-evenly text-center' style={{minHeight: '60vh'}}>
            <h1 className="display-5 custom-bold mb-3">{recover_json.email_sent}</h1>
            <Image src="/icons/mail.svg" alt="mail.svg" width={0} height={0} className="d-none d-md-block w-auto h-auto"/>
            <p className='ms-font fs-5 lead w-50'>{recover_json.finished.text_1}<br/>{recover_json.finished.text_2}</p>
        </div>
    )
}

export default function RecoverPassword() {
    return (
        <AuthProvider redirect={false}>
            <NavBar lang={localStorage.getItem("lang") ?? "EN"}/>
            <RecoverPasswordComponent/>
        </AuthProvider>
    )
}