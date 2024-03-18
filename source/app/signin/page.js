"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

import { signin } from '@/api/v1/auth';
import { AlertContainer, create_alert } from "@/components/Alerts"
import { EstructuraFormularios } from "@/components/Estructura";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [alerts, setAlerts] = useState([])

    const validateInput = () => {
        let isValid = true;
        if (!email.includes('@')) {
            setEmailError(true);
            isValid = false;
            create_alert(setAlerts, "El correo no tiene @", "danger")
        } else {
            setEmailError(false);
        }

        if (password.length < 1) {
            setPasswordError(true);
            isValid = false;
            create_alert(setAlerts, "Longitud de contraseña incorrecta", "danger")
        } else {
            setPasswordError(false);
        }

        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }

        const token = await signin(email, password)
        if (!token) {
            setPasswordError(true);
            setEmailError(true);
            return create_alert(setAlerts, "Correo o contraseña incorrectos", "danger")
        }

        localStorage.setItem('token', token)
        router.push("/home")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <AlertContainer alerts={alerts} />

            <EstructuraFormularios>
                <div className='d-flex flex-column justify-content-evenly h-100 p-0 pe-xl-5'>
                    <div>
                        <h1 className='custom-bold'>Iniciar sesión con el correo de la U-tad</h1>
                        <p className=' ms-light d-none fs-5 d-sm-block lead'>
                            El desarrollo de proyectos es una carta de presentación de los
                            conocimientos, experiencia y capacidad de trabajo en equipo.
                        </p>
                    </div>

                    <div>
                        <div className="input-group mb-3" style={{
                            borderRadius: '0.25rem',
                            backgroundColor: "var(--color-secundario-gris-claro-extra)", border: emailError ? `3px solid var(--color-error)` : '3px solid transparent'
                        }}>
                            <input
                                type="email"
                                id="email"
                                className="form-control py-3 fs-5"
                                style={{ border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailError(false)}
                                placeholder="  Correo electrónico"
                                required
                                autoComplete="off"
                            />
                        </div>

                        <div className="mb-3" style={{ position: 'relative', display: 'flex' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-control py-3 fs-5"
                                style={{ backgroundColor: "var(--color-secundario-gris-claro-extra)", border: passwordError ? `3px solid var(--color-error)` : '3px solid transparent', flex: '1' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordError(false)}
                                placeholder="Contraseña"
                                autoComplete="off"
                            />
                            <button type="button" className="btn btn-link" onClick={togglePasswordVisibility} style={{ background: 'none', border: 'none', padding: '0', position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
                                <img src="/icons/Ojo.svg" alt="Mostrar/Ocultar contraseña" style={{ height: '24px', width: '24px' }} />
                            </button>
                        </div>


                        <Link className="link-underline-dark link-dark fw-bold custom-bold" href="/recover">¿Has olvidado la contraseña?</Link>
                    </div>

                    <div className="">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="   btn btn-primary btn-color-primary border-5 fs-5 fw-bold w-100 btn-lg">

                            INICIAR SESIÓN
                        </button>

                        <div className="text-center mt-3">
                            <span className="pe-1 ">¿Aún no tienes cuenta?</span>
                            <Link className="link-underline-dark link-dark fw-bold ps-1" href="/signup">¡Inscríbete ahora!</Link>
                        </div>
                    </div>
                </div>
            </EstructuraFormularios>
        </>
    )
}