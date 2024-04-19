import React, { createRef, useRef, useState } from 'react'

import Link from 'next/link'

import { EstructuraFormularios } from '@/components/Estructura'
import { AlertContainer, create_alert } from "@/components/Alerts"

import { check_email, check_password } from "@/utils/validation"

import "../styles/signup.css"
import Image from "next/image"

const ControladorSiguienteAtras = ({ setNextPaso, setPreviousPaso, setNextPasoRef = null, setPreviousPasoRef = null }) => {
    return (
        <div className='d-flex gap-5 justify-content-between aligns-items-center mt-5 m-0'>
            <button
                ref={setPreviousPasoRef}
                type='button'
                onClick={setPreviousPaso}
                className='btn btn-outline-primary'
                style={{ width: '48px', height: '48px' }}>
                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16' fill='none'>
                    <path d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z' fill='#091229' />
                </svg>
            </button>

            <button
                ref={setNextPasoRef}
                type='button'
                onClick={setNextPaso}
                className='btn btn-primary btn-color-primary btn-outline-primary fs-5 fw-bold'
                style={{ width: '184px', height: '48px' }}>
                SIGUIENTE
            </button>
        </div>
    )
}

const PasoInicio = ({ setNextPaso, setPreviousPaso, email, setEmail }) => {
    const
        email_ref = useRef(null),
        [email_checks, setEmailChecks] = useState([])

    const handleNextPaso = () => {
        setEmailChecks([])

        if (!check_email(
            email,
            (error) => {
                setEmailChecks((previous) => [...previous, error])
            }
        )) return email_ref.current.classList.add('border-error')

        setNextPaso()
    }

    return (
        <EstructuraFormularios clase_imagen="bg-image-signup">
            <div className='d-flex flex-column justify-content-evenly h-100 p-0 pe-xl-5' style={{ maxWidth: 560 }}>
                <div>
                    <h1 className='fw-bold'>Crear cuenta</h1>
                    <p className='pe-1 '>
                        Indícanos cuál es tu correo asociado a la U-tad.
                    </p>
                </div>
                <div className='mb-3'>
                </div>

                <div>
                    <input
                        ref={email_ref}
                        type="email"
                        id="email"
                        value={email}
                        className=" ms-regular form-control border-normal py-3 ps-4 fs-5"
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => email_ref.current.classList.remove('border-error')}
                        placeholder="Correo electrónico"
                        autoComplete="off"
                    />

                    <div className="mb-5">
                        {
                            email_checks.map((check, index) => (
                                <p key={index} className="text-danger fs-6 p-0 ps-4 m-0">{check}</p>
                            ))
                        }
                    </div>

                    <ControladorSiguienteAtras
                        setNextPaso={handleNextPaso}
                        setPreviousPaso={setPreviousPaso}
                    />
                </div>

                <div className='text-center'>
                    <span className='pe-1 '>¿Ya tienes una cuenta?</span>
                    <Link className='link-underline-dark link-dark fw-bold ps-1' href='/signin'>Iniciar sesión</Link>
                </div>
            </div>
        </EstructuraFormularios>
    )
}

const Paso1 = ({ setNextPaso, setPreviousPaso, setPassword, password }) => {
    const
        password_ref = useRef(null),
        password2_ref = useRef(null),
        [password2, setPassword2] = useState(''),
        [password_checks, setPasswordChecks] = useState([]),
        [tipo_password, setTipoPassword] = useState('password'),
        [tipo_password2, setTipoPassword2] = useState('password')

    const handleNextClick = () => {
        setPasswordChecks([])

        if (!check_password(
            password,
            (error) => {
                setPasswordChecks((previous) => [...previous, error])
            }
        )) return password_ref.current.classList.add('border-error')

        if (password !== password2) {
            setPasswordChecks((previous) => [...previous, 'Las contraseñas no coinciden'])
            return password2_ref.current.classList.add('border-error')
        }

        setNextPaso()
    }

    return (
        <EstructuraFormularios clase_imagen="bg-image-signup">
            <div className='d-flex flex-column justify-content-evenly h-100 p-0 pe-xl-5' style={{ maxWidth: 560 }}>
                <div>
                    <h1 className='fw-bold'>Termina de configura tu cuenta</h1>
                    <p className=' pe-1 '>
                        Paso 1 de 3. Crea una contraseña para continuar
                    </p>
                </div>

                <div>
                    <div className="position-relative d-flex mt-3">
                        <input
                            ref={password_ref}
                            type={tipo_password}
                            id="password"
                            value={password}
                            className="ms-regular flex-grow-1 form-control border-normal py-3 ps-4 fs-5"
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => password_ref.current.classList.remove('border-error')}
                            placeholder="Contraseña"
                            autoComplete="off"
                        />

                        <button
                            type="button"
                            className="position-absolute top-50 end-0 translate-middle-y btn btn-link"
                            onClick={() => setTipoPassword(tipo_password === 'password' ? 'text' : 'password')}>
                            <Image src="/icons/Ojo.svg" alt="Mostrar/Ocultar contraseña" height={24} width={24} />
                        </button>
                    </div>

                    <div className="position-relative d-flex mt-3">
                        <input
                            ref={password2_ref}
                            type={tipo_password2}
                            id="password"
                            value={password2}
                            className=" ms-regular flex-grow-1 form-control border-normal py-3 ps-4 fs-5"
                            onChange={(e) => setPassword2(e.target.value)}
                            onFocus={() => password2_ref.current.classList.remove('border-error')}
                            placeholder="Confirmar contraseña"
                            autoComplete="off"
                        />

                        <button
                            type="button"
                            className="position-absolute top-50 end-0 translate-middle-y btn btn-link"
                            onClick={() => setTipoPassword2(tipo_password2 === 'password' ? 'text' : 'password')}>
                            <Image src="/icons/Ojo.svg" alt="Mostrar/Ocultar contraseña" height={24} width={24} />
                        </button>
                    </div>

                    <div className="">
                        {
                            password_checks.map((check, index) => (
                                <p key={index} className="text-danger fs-6 p-0 ps-4 m-0">{check}</p>
                            ))
                        }
                    </div>
                </div>

                <ControladorSiguienteAtras
                    setNextPaso={handleNextClick}
                    setPreviousPaso={setPreviousPaso}
                />
            </div>
        </EstructuraFormularios>
    )
}

const Paso2_live_utad_com = ({ setNextPaso, setPreviousPaso, setRol, alerts, setAlerts }) => {
    const [selectedType, setSelectedType] = useState('')

    const handleTypeSelection = (type) => {
        if (type === 'Alumno') {
            setRol('alumno')
        } else if (type === 'Alumni') {
            setRol('alumni')
        }
        setSelectedType(type)
    }

    const handleNextClick = () => {
        if (!selectedType)
            return create_alert(setAlerts, 'Debes seleccionar un tipo de usuario', 'danger')

        setNextPaso()
    }

    return (
        <>
            <AlertContainer alerts={alerts} />

            <div className='container d-flex flex-column mt-5' style={{ maxWidth: 480 }}>
                <h1 className='fw-bold text-center text-lg-start'>Reservorio U-tad personalizado para ti!</h1>
                <p className='pe-1 text-center text-lg-start'>
                    Paso 2 de 3. ¿Quién eres?
                </p>

                <div>
                    <div className='d-flex flex-column flex-lg-row gap-3 gap-lg-5 justify-content-between mb-4 mt-5'>
                        <button
                            className={`custom-button ${selectedType === 'Alumno' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Alumno')}
                            style={{ border: `2px solid ${selectedType === 'Alumno' ? 'var(--color-principal)' : '#808080'}` }}>
                            <svg className="d-none d-lg-block" width='130' height='129' viewBox='0 0 130 129' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill='#D9D9D9' />
                                <svg xmlns="http://www.w3.org/2000/svg" x="37" y="35" width="54" height="55" viewBox="0 0 54 55" fill="none">
                                    <path d="M1.44959 22.5623C4.51495 12.7934 3.95376 6.85377 19.8252 1.41224C29.4652 -1.89283 46.2835 1.1964 50.8299 10.3636C57.3814 23.5755 51.844 36.8469 48.3702 51.1914C46.5585 51.0954 44.7302 51.0201 42.894 50.9518V45.2143V53.7746C28.5819 53.332 22.3816 53.8126 7.47356 54.0993C6.13999 43.9458 -1.61576 32.3312 1.44959 22.5623Z" fill="#091229" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="41" y="45" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                    <path d="M22.9282 43.8922C35.0496 43.8922 44.876 34.0657 44.876 21.9442C44.876 9.82258 35.0496 -0.00390625 22.9282 -0.00390625C10.8068 -0.00390625 0.980408 9.82258 0.980408 21.9442C0.980408 34.0657 10.8068 43.8922 22.9282 43.8922Z" fill="#FEB8B8" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="37" y="35" width="53" height="28" viewBox="0 0 53 28" fill="none">
                                    <path d="M12.6122 4.5004C16.5849 2.0784 21.1353 0.768213 25.7876 0.706849C30.44 0.645485 35.0233 1.83519 39.0585 4.15157C43.0936 6.46795 46.4324 9.8259 48.7255 13.8743C51.0187 17.9227 52.1821 22.5129 52.094 27.1649C40.5368 27.6964 28.3965 27.8349 16.0867 27.8587L13.1753 20.7377L11.4603 27.8633C7.70949 27.8633 3.95134 27.8583 0.185865 27.8484C0.0325214 23.2096 1.09951 18.6117 3.28016 14.5144C5.46081 10.4172 8.67874 6.96412 12.6122 4.5004Z" fill="#091229" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="31" y="102" width="67" height="26" viewBox="0 0 67 26" fill="none">
                                    <path d="M66.7042 17.2005C56.6683 23.2885 45.082 26.3348 33.3495 25.9701C21.6171 25.6054 10.2423 21.8455 0.603821 15.1459C2.62516 10.8936 5.81008 7.301 9.78951 4.78458C13.7689 2.26815 18.38 0.930891 23.0883 0.927734H43.3552C48.4445 0.927269 53.4117 2.48727 57.5869 5.39744C61.7621 8.3076 64.9447 12.428 66.7055 17.2031L66.7042 17.2005Z" fill="#0065F3" />
                                </svg>


                            </svg>
                            <h3 className='text-center'>Alumno</h3>
                        </button>

                        <button
                            className={`custom-button ${selectedType === 'Alumni' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Alumni')}
                            style={{ border: `2px solid ${selectedType === 'Alumni' ? 'var(--color-principal)' : '#808080'}` }}>
                            <svg className="d-none d-lg-block"
                                width='130' height='129' viewBox='0 0 130 129' fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill='#D9D9D9' />
                                <svg xmlns="http://www.w3.org/2000/svg" x="37" y="35" width="54" height="55" viewBox="0 0 54 55" fill="none">
                                    <path d="M1.44959 22.5623C4.51495 12.7934 3.95376 6.85377 19.8252 1.41224C29.4652 -1.89283 46.2835 1.1964 50.8299 10.3636C57.3814 23.5755 51.844 36.8469 48.3702 51.1914C46.5585 51.0954 44.7302 51.0201 42.894 50.9518V45.2143V53.7746C28.5819 53.332 22.3816 53.8126 7.47356 54.0993C6.13999 43.9458 -1.61576 32.3312 1.44959 22.5623Z" fill="#091229" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="41" y="45" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                    <path d="M22.9282 43.8922C35.0496 43.8922 44.876 34.0657 44.876 21.9442C44.876 9.82258 35.0496 -0.00390625 22.9282 -0.00390625C10.8068 -0.00390625 0.980408 9.82258 0.980408 21.9442C0.980408 34.0657 10.8068 43.8922 22.9282 43.8922Z" fill="#FEB8B8" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="37" y="35" width="53" height="28" viewBox="0 0 53 28" fill="none">
                                    <path d="M12.6122 4.5004C16.5849 2.0784 21.1353 0.768213 25.7876 0.706849C30.44 0.645485 35.0233 1.83519 39.0585 4.15157C43.0936 6.46795 46.4324 9.8259 48.7255 13.8743C51.0187 17.9227 52.1821 22.5129 52.094 27.1649C40.5368 27.6964 28.3965 27.8349 16.0867 27.8587L13.1753 20.7377L11.4603 27.8633C7.70949 27.8633 3.95134 27.8583 0.185865 27.8484C0.0325214 23.2096 1.09951 18.6117 3.28016 14.5144C5.46081 10.4172 8.67874 6.96412 12.6122 4.5004Z" fill="#091229" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="31" y="102" width="67" height="26" viewBox="0 0 67 26" fill="none">
                                    <path d="M66.7042 17.2005C56.6683 23.2885 45.082 26.3348 33.3495 25.9701C21.6171 25.6054 10.2423 21.8455 0.603821 15.1459C2.62516 10.8936 5.81008 7.301 9.78951 4.78458C13.7689 2.26815 18.38 0.930891 23.0883 0.927734H43.3552C48.4445 0.927269 53.4117 2.48727 57.5869 5.39744C61.7621 8.3076 64.9447 12.428 66.7055 17.2031L66.7042 17.2005Z" fill="#0065F3" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="25" y="25" width="79" height="43" viewBox="0 0 79 43" fill="none">
                                    <path d="M40.3575 0.719482L0.372253 13.9082L40.3575 24.6557L73.0726 17.8716V42.9975H78.8363V13.9082" fill="#0065F3" />
                                </svg>
                            </svg>
                            <h3 className='text-center'>Alumni</h3>
                        </button>
                    </div>

                    <ControladorSiguienteAtras setNextPaso={handleNextClick} setPreviousPaso={setPreviousPaso} />
                </div>
            </div>
        </>
    )
}

const Paso2_utad_com = ({ setNextPaso, setPreviousPaso, setRol, alerts, setAlerts }) => {
    const [selectedType, setSelectedType] = useState('')

    const handleTypeSelection = (type) => {
        if (type === 'Profesor') {
            setRol('profesor')
        } else if (type === 'Coordinador') {
            setRol('coordinador')
        } else if (type === 'Departamentos') {
            setRol('departamentos')
        }
        setSelectedType(type)
    }

    const handleNextClick = () => {
        if (!selectedType)
            return create_alert(setAlerts, 'Debes seleccionar un tipo de usuario', 'danger')

        setNextPaso()
    }

    return (
        <>
            <AlertContainer alerts={alerts} />

            <div className='container d-flex flex-column mt-5 ' style={{ maxWidth: 480 }}>
                <h1 className='fw-bold text-center text-lg-start'>Reservorio U-tad personalizado para ti!</h1>
                <p className='pe-1 text-center text-lg-start '>
                    Paso 2 de 3. ¿Quién eres?
                </p>

                <div>
                    <div className='d-flex flex-column flex-lg-row gap-3 gap-lg-5 justify-content-between mb-4 mt-5'>
                        <button
                            className={`custom-button ${selectedType === 'Profesor' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Profesor')}
                            style={{ border: `2px solid ${selectedType === 'Profesor' ? 'var(--color-principal)' : '#808080'}` }}>
                            <svg className="d-none d-lg-block"
                                width='130' height='129' viewBox='0 0 130 129' fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill='#D9D9D9' />
                                <svg xmlns="http://www.w3.org/2000/svg" x="37" y="35" width="54" height="55" viewBox="0 0 54 55" fill="none">
                                    <path d="M1.44959 22.5623C4.51495 12.7934 3.95376 6.85377 19.8252 1.41224C29.4652 -1.89283 46.2835 1.1964 50.8299 10.3636C57.3814 23.5755 51.844 36.8469 48.3702 51.1914C46.5585 51.0954 44.7302 51.0201 42.894 50.9518V45.2143V53.7746C28.5819 53.332 22.3816 53.8126 7.47356 54.0993C6.13999 43.9458 -1.61576 32.3312 1.44959 22.5623Z" fill="#091229" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="41" y="45" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                    <path d="M22.9282 43.8922C35.0496 43.8922 44.876 34.0657 44.876 21.9442C44.876 9.82258 35.0496 -0.00390625 22.9282 -0.00390625C10.8068 -0.00390625 0.980408 9.82258 0.980408 21.9442C0.980408 34.0657 10.8068 43.8922 22.9282 43.8922Z" fill="#FEB8B8" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="37" y="35" width="53" height="28" viewBox="0 0 53 28" fill="none">
                                    <path d="M12.6122 4.5004C16.5849 2.0784 21.1353 0.768213 25.7876 0.706849C30.44 0.645485 35.0233 1.83519 39.0585 4.15157C43.0936 6.46795 46.4324 9.8259 48.7255 13.8743C51.0187 17.9227 52.1821 22.5129 52.094 27.1649C40.5368 27.6964 28.3965 27.8349 16.0867 27.8587L13.1753 20.7377L11.4603 27.8633C7.70949 27.8633 3.95134 27.8583 0.185865 27.8484C0.0325214 23.2096 1.09951 18.6117 3.28016 14.5144C5.46081 10.4172 8.67874 6.96412 12.6122 4.5004Z" fill="#091229" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="31" y="102" width="67" height="26" viewBox="0 0 67 26" fill="none">
                                    <path d="M66.7042 17.2006C56.6683 23.2886 45.082 26.3349 33.3495 25.9702C21.6171 25.6056 10.2423 21.8456 0.603821 15.1461C2.62516 10.8937 5.81008 7.30112 9.78951 4.7847C13.7689 2.26827 18.38 0.931013 23.0883 0.927857H43.3552C48.4445 0.927391 53.4117 2.48739 57.5869 5.39756C61.7621 8.30773 64.9447 12.4281 66.7055 17.2032L66.7042 17.2006Z" fill="#091229" />
                                </svg>


                            </svg>
                            <h3 className='text-center ms-bold'>Profesor / Ext.</h3>
                        </button>

                        <button
                            className={`custom-button ${selectedType === 'Coordinador' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Coordinador')}
                            style={{ border: `2px solid ${selectedType === 'Coordinador' ? 'var(--color-principal)' : '#808080'}` }}>
                            <svg className="d-none d-lg-block" width='130' height='129' viewBox='0 0 130 129' xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill='#D9D9D9' />
                                <svg xmlns="http://www.w3.org/2000/svg" x="37" y="35" width="54" height="55" viewBox="0 0 54 55" fill="none">
                                    <path d="M1.44959 22.5623C4.51495 12.7934 3.95376 6.85377 19.8252 1.41224C29.4652 -1.89283 46.2835 1.1964 50.8299 10.3636C57.3814 23.5755 51.844 36.8469 48.3702 51.1914C46.5585 51.0954 44.7302 51.0201 42.894 50.9518V45.2143V53.7746C28.5819 53.332 22.3816 53.8126 7.47356 54.0993C6.13999 43.9458 -1.61576 32.3312 1.44959 22.5623Z" fill="#091229" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="41" y="45" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                    <path d="M22.9282 43.8922C35.0496 43.8922 44.876 34.0657 44.876 21.9442C44.876 9.82258 35.0496 -0.00390625 22.9282 -0.00390625C10.8068 -0.00390625 0.980408 9.82258 0.980408 21.9442C0.980408 34.0657 10.8068 43.8922 22.9282 43.8922Z" fill="#FEB8B8" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="37" y="35" width="53" height="28" viewBox="0 0 53 28" fill="none">
                                    <path d="M12.6122 4.5004C16.5849 2.0784 21.1353 0.768213 25.7876 0.706849C30.44 0.645485 35.0233 1.83519 39.0585 4.15157C43.0936 6.46795 46.4324 9.8259 48.7255 13.8743C51.0187 17.9227 52.1821 22.5129 52.094 27.1649C40.5368 27.6964 28.3965 27.8349 16.0867 27.8587L13.1753 20.7377L11.4603 27.8633C7.70949 27.8633 3.95134 27.8583 0.185865 27.8484C0.0325214 23.2096 1.09951 18.6117 3.28016 14.5144C5.46081 10.4172 8.67874 6.96412 12.6122 4.5004Z" fill="#091229" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="31" y="102" width="67" height="26" viewBox="0 0 67 26" fill="none">
                                    <path d="M66.7042 17.2006C56.6683 23.2886 45.082 26.3349 33.3495 25.9702C21.6171 25.6056 10.2423 21.8456 0.603821 15.1461C2.62516 10.8937 5.81008 7.30112 9.78951 4.7847C13.7689 2.26827 18.38 0.931013 23.0883 0.927857H43.3552C48.4445 0.927391 53.4117 2.48739 57.5869 5.39756C61.7621 8.30773 64.9447 12.4281 66.7055 17.2032L66.7042 17.2006Z" fill="#091229" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" x="70" y="105" width="12" height="20" viewBox="0 0 12 20" fill="none">
                                    <path d="M10.0205 2.43462H7.51636V4.10459H10.0205V17.4643H1.67329V4.10459H4.17746V2.43462H1.67329C1.23053 2.43462 0.805897 2.61056 0.492815 2.92374C0.179733 3.23692 0.00384521 3.66168 0.00384521 4.10459V17.4643C0.00384521 17.9072 0.179733 18.332 0.492815 18.6452C0.805897 18.9584 1.23053 19.1343 1.67329 19.1343H10.0205C10.4633 19.1343 10.8879 18.9584 11.201 18.6452C11.5141 18.332 11.69 17.9072 11.69 17.4643V4.10459C11.69 3.66168 11.5141 3.23692 11.201 2.92374C10.8879 2.61056 10.4633 2.43462 10.0205 2.43462ZM5.84691 5.77455C6.28968 5.77455 6.71431 5.9505 7.02739 6.26368C7.34047 6.57686 7.51636 7.00162 7.51636 7.44452C7.51636 7.88742 7.34047 8.31219 7.02739 8.62537C6.71431 8.93855 6.28968 9.11449 5.84691 9.11449C5.40415 9.11449 4.97952 8.93855 4.66643 8.62537C4.35335 8.31219 4.17746 7.88742 4.17746 7.44452C4.17746 7.00162 4.35335 6.57686 4.66643 6.26368C4.97952 5.9505 5.40415 5.77455 5.84691 5.77455ZM9.18581 12.4544H2.50802V11.6194C2.50802 10.5089 4.73673 9.94947 5.84691 9.94947C6.9571 9.94947 9.18581 10.5089 9.18581 11.6194V12.4544ZM9.18581 14.9594H2.50802V14.1244H9.18581V14.9594ZM5.84691 16.6293H2.50802V15.7944H5.84691V16.6293ZM6.68164 4.10459H5.01219V0.764648H6.68164V4.10459Z" fill="white" />
                                </svg>
                            </svg>
                            <h3 className='text-center '>Coord. / Depto.</h3>
                        </button>
                    </div>

                    <ControladorSiguienteAtras setNextPaso={handleNextClick} setPreviousPaso={setPreviousPaso} />
                </div>
            </div>
        </>
    )
}

const Paso_coordinador = ({ setNextPaso, setPreviousPaso, setCodigo, alerts, setAlerts }) => {
    const
        refs = useRef([]),
        next_ref = useRef(null)

    refs.current = [0, 1, 2, 3, 4, 5].map((ref, index) => refs.current[index] ?? createRef())

    return (
        <>
            <AlertContainer alerts={alerts} />

            <div className='container d-flex flex-column mt-5' style={{ maxWidth: 480, maxHeight: 305 }}>
                <h1 className='fw-bold mt-5'>Verifícate</h1>
                <p className='pe-1  '>Paso 3 de 3. Te hemos enviado un código a tu correo para verificar que eres tu!</p>


                <div className='d-flex flex-row gap-4 mt-5'>
                    {
                        [0, 1, 2, 3, 4, 5].map((index) => (
                            <input
                                key={index}
                                type='text'
                                name={`${index}`}
                                ref={refs.current[index]}
                                onFocus={(e) => {
                                    e.target.value = ''
                                }}
                                onChange={(e) => {
                                    setCodigo((c) => {
                                        c[index] = e.target.value
                                        return c
                                    })

                                    return (refs.current[index + 1] ?? next_ref).current.focus()
                                }}
                                maxLength={1} // Restringe la entrada a un solo carácter
                                className='form-control text-center'
                                autoComplete="off" // Evita la autocompletación del navegador
                                style={{ height: '48px', border: "2px solid #808080" }}
                            />
                        ))
                    }
                </div>

                <ControladorSiguienteAtras setNextPaso={setNextPaso} setPreviousPaso={setPreviousPaso} setNextPasoRef={next_ref} />
            </div>
        </>
    )
}

const PasoFin = ({ setNextPaso, setPreviousPaso }) => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-evenly text-center' style={{ minHeight: '60vh' }}>
            <h1 className="display-5 fw-bold mb-3">¡Proceso de inscripción finalizado!</h1>
            <p className='ms-font fs-5 lead w-50'>Revisa tu correo para empezar a navegar en la plataforma</p>

            <Image src="/icons/mail.svg" alt="mail.svg" width={0} height={0} className="d-none d-md-block w-auto h-auto" />

            <button
                type='button'
                onClick={setNextPaso}
                className='btn btn-primary border-5 ms-button p-3 w-50' style={{ minWidth: "fit-content" }}>
                REVISAR CORREO
            </button>
        </div>
    )
}

module.exports = {
    PasoInicio,
    Paso1,
    Paso2_live_utad_com,
    Paso2_utad_com,
    Paso_coordinador,
    PasoFin
}