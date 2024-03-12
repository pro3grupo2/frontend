"use client";
import "../globals.css";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { signin } from '@/api/v1/auth';
import NavBar from "@/components/NavBar"
import { AlertContainer, create_alert } from "@/components/Alerts"

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
        if (!token){
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

            <div className="d-flex flex-row flex-grow-1 justify-content-evenly align-items-center">
                <div className="flex-shrink- px-5 mx-xl-5 w-100" >
                    <div className="pb-4">
                        <h1 className="display-4 ms-extrabold">Iniciar sesión con el correo de la U-tad</h1>
                        <p className="d-none fs-5 d-sm-block lead">
                            El desarrollo de proyectos es una carta de presentación de los
                            conocimientos, experiencia y capacidad de trabajo en equipo.
                        </p>
                    </div>

                    <form className="row row-gap-3 m-0" onSubmit={handleSubmit} noValidate>
                        <div className="input-group mb-3 px-0" style={{ width: "75%", borderRadius: '0.25rem', 
                        backgroundColor: "var(--color-secundario-gris-claro-extra)", border: emailError ? `3px solid var(--color-error)` : '3px solid transparent'}}>
                            <input
                                type="email"
                                id="email"
                                className="form-control py-3 fs-5"
                                style={{ border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailError(false)}
                                placeholder="Correo Electrónico"
                                required
                                autoComplete="off"
                            />
                        </div>

                        <div className="input-group mb-3 px-0" style={{ width: "75%", borderRadius: '0.25rem', 
                        backgroundColor: "var(--color-secundario-gris-claro-extra)"}}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-control py-3 fs-5"
                                style={{ border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)", border: passwordError ? `3px solid var(--color-error)` : '3px solid transparent' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordError(false)}
                                placeholder="Contraseña"
                                autoComplete="off"
                            />
                            <button type="button" className="input-group-text" onClick={togglePasswordVisibility} style={{ background: 'none', border: 'none' }}>
                                <img src="/icons/Ojo.svg" alt="Mostrar/Ocultar contraseña" style={{ height: '24px', width: '24px' }} />
                            </button>
                        </div>


                        <Link className="link-underline-dark link-dark fs-5 fw-bold" href="/recover">¿Has olvidado la contraseña?</Link>

                        <div className="pt-4 px-0">
                            <button
                                type="submit"
                                className="w-100 btn btn-primary border-5 py-2 fs-1 fw-bold">
                                INICIAR SESIÓN
                            </button>

                            <div className="col-12 text-center">
                                <span className="pe-1 fs-5">¿Aún no tienes cuenta?</span>
                                <Link className="link-underline-dark link-dark fw-bold fs-5 ps-1" href="/signup">¡Inscríbete ahora!</Link>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="d-none d-xl-block w-100" style={{ maxWidth: '5%' }}></div>
                <div className="d-none d-xl-block bg-image-main w-100" style={{ maxWidth: '50%' }}></div>
            </div>
        </>
    )
}