"use client"

import React, {useEffect, useRef, useState} from 'react'

import Image from "next/image"
import {useRouter} from "next/navigation"

import {EstructuraFormularios} from "@/components/Estructura"
import {ControladorSiguienteAtras} from "@/components/Signup"
import {AlertContainer, create_alert} from "@/components/Alerts"
import Loading from "@/components/Loading"

import {update} from '@/api/v1/account'
import {check_password} from "@/utils/validation"

export default function RecoverPassword({params}) {
    const
        [password, setPassword] = useState(''),
        [tipo_password, setTipoPassword] = useState('password'),
        [tipo_password2, setTipoPassword2] = useState('password'),
        password_ref = useRef(null),
        password2_ref = useRef(null),
        [password2, setPassword2] = useState(''),
        [password_checks, setPasswordChecks] = useState([]),
        [alerts, setAlerts] = useState([]),
        [loading, setLoading] = useState(false),
        router = useRouter()

    useEffect(() => {
        setPasswordChecks([])

        if (!check_password(
            password,
            (error) => {
                setPasswordChecks((previous) => [...previous, error])
            }
        )) {
            if (password.length > 0)
                return password_ref.current.classList.add('border-error')
            return password_ref.current.classList.remove('border-error')
        }

        password_ref.current.classList.remove('border-error')

        if (password !== password2) {
            setPasswordChecks((previous) => [...previous, 'Las contraseñas no coinciden'])
            return password2_ref.current.classList.add('border-error')
        }

        password2_ref.current.classList.remove('border-error')
    }, [password, password2])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password_checks.length) {
            password_ref.current.classList.remove('border-error')
            password2_ref.current.classList.remove('border-error')
            return
        }

        setLoading(true)
        const data = await update(params.token, undefined, password, undefined, undefined, undefined)
        setLoading(false)

        if (!data) {
            create_alert(setAlerts, 'Error al actualizar la contraseña', 'danger')
            return
        }

        router.push('/signin')
    }

    if (loading) return <Loading/>

    return (
        <>
            <AlertContainer alerts={alerts}/>

            <EstructuraFormularios clase_imagen="bg-image-recover-password">
                <form onSubmit={handleSubmit} className='d-flex flex-column gap-xxl-5' style={{maxWidth: '42rem'}}>
                    <div>
                        <h1 className='fw-bold'>Recupera tu contraseña</h1>
                        <p className=' pe-1 '>Crea una nueva contraseña</p>
                    </div>

                    <div>
                        <div className="position-relative d-flex mt-3">
                            <input
                                ref={password_ref}
                                type={tipo_password}
                                id="password"
                                value={password}
                                className="ms-regular flex-grow-1 form-control  background-color-secundario-gris-claro-extra py-3 ps-4 fs-5"
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => password_ref.current.classList.remove('border-error')}
                                placeholder="Nueva contraseña"
                                autoComplete="off"
                            />

                            <button
                                type="button"
                                className="position-absolute top-50 end-0 translate-middle-y btn btn-link btn-icon border-0"
                                onClick={() => setTipoPassword(tipo_password === 'password' ? 'text' : 'password')}>
                                <Image src="/icons/Ojo.svg" alt="Mostrar/Ocultar contraseña" height={24} width={24}/>
                            </button>
                        </div>

                        <div className="position-relative d-flex mt-3">
                            <input
                                ref={password2_ref}
                                type={tipo_password2}
                                id="password"
                                value={password2}
                                className="ms-regular flex-grow-1 form-control  background-color-secundario-gris-claro-extra py-3 ps-4 fs-5"
                                onChange={(e) => setPassword2(e.target.value)}
                                onFocus={() => password2_ref.current.classList.remove('border-error')}
                                placeholder="Repetir nueva contraseña"
                                autoComplete="off"
                            />

                            <button
                                type="button"
                                className="position-absolute top-50 end-0 translate-middle-y btn btn-link btn-icon border-0"
                                onClick={() => setTipoPassword2(tipo_password2 === 'password' ? 'text' : 'password')}>
                                <Image src="/icons/Ojo.svg" alt="Mostrar/Ocultar contraseña" height={24} width={24}/>
                            </button>
                        </div>

                        <div className={'my-4'}>
                            {
                                password_checks.length > 0 &&
                                <p className="color-secundario-gris ms-bold-body p-0 ps-3 m-0">La contraseña debe contener al menos:</p>
                            }
                            {
                                password_checks.map((check, index) => (
                                    <p key={index} className="color-secundario-gris ms-regular-subbody p-0 ps-4 m-0">{check}</p>
                                ))
                            }
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-color-primary border-5 mt-3 fs-5 fw-bold w-100 btn-lg">
                            RECUPERAR CONTRASEÑA
                        </button>
                    </div>
                </form>
            </EstructuraFormularios>
        </>
    )
}