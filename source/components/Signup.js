import React, {createRef, useRef, useState} from 'react'

import Link from 'next/link'

import {EstructuraFormularios} from '@/components/Estructura'
import {AlertContainer, create_alert} from "@/components/Alerts"

import {check_email, check_password} from "@/utils/validation"

import "../styles/signup.css"
import Image from "next/image"

const ControladorSiguienteAtras = ({setNextPaso, setPreviousPaso, setNextPasoRef = null, setPreviousPasoRef = null}) => {
    return (
        <div className='d-flex gap-5 justify-content-between aligns-items-center mt-5 m-0'>
            <button
                ref={setPreviousPasoRef}
                type='button'
                onClick={setPreviousPaso}
                className='btn btn-outline-primary'
                style={{width: '48px', height: '48px'}}>
                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16' fill='none'>
                    <path d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z' fill='#091229'/>
                </svg>
            </button>

            <button
                ref={setNextPasoRef}
                type='button'
                onClick={setNextPaso}
                className='btn btn-primary btn-color-primary btn-outline-primary fs-5 fw-bold'
                style={{minWidth: '12em'}}>
                SIGUIENTE
            </button>
        </div>
    )
}

const PasoInicio = ({setNextPaso, setPreviousPaso, email, setEmail}) => {
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
            <div className='d-flex flex-column justify-content-evenly h-100 p-0 pe-xl-5'>
                <div>
                    <h1 className='ms-bold'>Crear cuenta</h1>
                    <p className='ms-regular d-none fs-5 d-sm-block lead'>
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
                        className="ms-regular form-control border-normal py-3 ps-4 fs-5"
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

const Paso1 = ({setNextPaso, setPreviousPaso, setPassword, password}) => {
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
            <div className='d-flex flex-column justify-content-evenly h-100 p-0 pe-xl-5'>
                <div>
                    <h1 className='ms-bold'>Termina de configura tu cuenta</h1>
                    <p className=' ms-regular d-none fs-5 d-sm-block lead'>
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
                            className=" ms-regular flex-grow-1 form-control border-normal py-3 ps-4 fs-5"
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => password_ref.current.classList.remove('border-error')}
                            placeholder="Contraseña"
                            autoComplete="off"
                        />

                        <button
                            type="button"
                            className="position-absolute top-50 end-0 translate-middle-y btn btn-link"
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
                            <Image src="/icons/Ojo.svg" alt="Mostrar/Ocultar contraseña" height={24} width={24}/>
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

const Paso2_live_utad_com = ({setNextPaso, setPreviousPaso, setRol, alerts, setAlerts}) => {
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
            <AlertContainer alerts={alerts}/>

            <div className='container d-flex flex-column justify-content-center align-items-center mt-5'>
                <h1 className='ms-bold text-center text-lg-start'>Reservorio U-tad personalizado para ti!</h1>
                <p className='ms-regular fs-5 lead text-center text-lg-start'>
                    Paso 2 de 3. ¿Quién eres?
                </p>

                <div>
                    <div className='d-flex flex-column flex-lg-row gap-3 gap-lg-5 justify-content-center mb-4 mt-5'>
                        <button
                            className={`custom-button ${selectedType === 'Alumno' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Alumno')}
                            style={{border: `2px solid ${selectedType === 'Alumno' ? 'var(--color-principal)' : '#808080'}`}}>
                            <svg className="d-none d-lg-block"
                                 width='130' height='129' viewBox='0 0 130 129' fill='none'
                                 xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill={selectedType === 'Alumno' ? 'var(--color-principal)' : '#D9D9D9'}/>
                            </svg>
                            <h3 className='text-center'>Alumno</h3>
                        </button>

                        <button
                            className={`custom-button ${selectedType === 'Alumni' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Alumni')}
                            style={{border: `2px solid ${selectedType === 'Alumni' ? 'var(--color-principal)' : '#808080'}`}}>
                            <svg className="d-none d-lg-block"
                                 width='130' height='129' viewBox='0 0 130 129' fill='none'
                                 xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill={selectedType === 'Alumni' ? 'var(--color-principal)' : '#D9D9D9'}/>
                            </svg>
                            <h3 className='text-center'>Alumni</h3>
                        </button>
                    </div>

                    <ControladorSiguienteAtras setNextPaso={handleNextClick} setPreviousPaso={setPreviousPaso}/>
                </div>
            </div>
        </>
    )
}

const Paso2_utad_com = ({setNextPaso, setPreviousPaso, setRol, alerts, setAlerts}) => {
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
            <AlertContainer alerts={alerts}/>

            <div className='container d-flex flex-column justify-content-center align-items-center mt-5'>
                <h1 className='display-5 ms-bold text-center text-lg-start'>Reservorio U-tad personalizado para ti!</h1>
                <p className='ms-regular fs-5 lead text-center text-lg-start'>
                    Paso 2 de 3. ¿Quién eres?
                </p>

                <div>
                    <div className='d-flex flex-column flex-lg-row gap-3 gap-lg-5 justify-content-center mb-4 mt-5'>
                        <button
                            className={`custom-button ${selectedType === 'Profesor' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Profesor')}
                            style={{border: `2px solid ${selectedType === 'Profesor' ? 'var(--color-principal)' : '#808080'}`}}>
                            <svg className="d-none d-lg-block"
                                 width='130' height='129' viewBox='0 0 130 129' fill='none'
                                 xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill={selectedType === 'Profesor' ? 'var(--color-principal)' : '#D9D9D9'}/>
                            </svg>
                            <h3 className='text-center'>Profesor</h3>
                        </button>

                        <button
                            className={`custom-button ${selectedType === 'Coordinador' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Coordinador')}
                            style={{border: `2px solid ${selectedType === 'Coordinador' ? 'var(--color-principal)' : '#808080'}`}}>
                            <svg className="d-none d-lg-block"
                                 width='130' height='129' viewBox='0 0 130 129' fill='none'
                                 xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill={selectedType === 'Coordinador' ? 'var(--color-principal)' : '#D9D9D9'}/>
                            </svg>
                            <h3 className='text-center'>Coordinador</h3>
                        </button>

                        <button
                            className={`custom-button ${selectedType === 'Departamentos' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Departamentos')}
                            style={{border: `2px solid ${selectedType === 'Departamentos' ? 'var(--color-principal)' : '#808080'}`}}>
                            <svg className="d-none d-lg-block"
                                 width='130' height='129' viewBox='0 0 130 129' fill='none'
                                 xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill={selectedType === 'Departamentos' ? 'var(--color-principal)' : '#D9D9D9'}/>
                            </svg>
                            <h3 className='text-center'>Departamentos</h3>
                        </button>
                    </div>

                    <ControladorSiguienteAtras setNextPaso={handleNextClick} setPreviousPaso={setPreviousPaso}/>
                </div>
            </div>
        </>
    )
}

const Paso_coordinador = ({setNextPaso, setPreviousPaso, setCodigo, alerts, setAlerts}) => {
    const
        refs = useRef([]),
        next_ref = useRef(null)

    refs.current = [0, 1, 2, 3, 4, 5].map((ref, index) => refs.current[index] ?? createRef())

    return (
        <>
            <AlertContainer alerts={alerts}/>

            <div className='container d-flex flex-column justify-content-evenly mt-5 h-100'>
                <div>
                    <h1 className='display-5 ms-bold text-center mb-4'>Verifícate</h1>
                    <p className='fs-5 lead text-center mb-4'>Paso 3 de 3. Te hemos enviado un código a tu correo para verificar que eres tu!</p>
                </div>

                <div className='d-flex flex-row gap-1'>
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
                                style={{height: '50px', border: "2px solid #808080"}}
                            />
                        ))
                    }
                </div>

                <ControladorSiguienteAtras setNextPaso={setNextPaso} setPreviousPaso={setPreviousPaso} setNextPasoRef={next_ref}/>
            </div>
        </>
    )
}

const PasoFin = ({setNextPaso, setPreviousPaso}) => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-evenly text-center' style={{minHeight: '60vh'}}>
            <h1 className="display-5 ms-bold mb-3">¡Proceso de inscripción finalizado!</h1>
            <p className='ms-font fs-5 lead w-50'>Revisa tu correo para empezar a navegar en la plataforma</p>

            <Image src="/icons/mail.svg" alt="mail.svg" width={0} height={0} className="d-none d-md-block w-auto h-auto"/>

            <button
                type='button'
                onClick={setNextPaso}
                className='btn btn-primary border-5 ms-button p-3 w-50' style={{minWidth: "fit-content"}}>
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