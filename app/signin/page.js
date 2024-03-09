"use client";

import {useState} from 'react';
import {useRouter} from "next/navigation";
import Link from 'next/link';

import {signin} from '@/api/v1/auth';
import NavBar from "@/components/NavBar"
import {AlertContainer, create_alert} from "@/components/Alerts"

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [alerts, setAlerts] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await signin(email, password)
        if (!token) return create_alert(setAlerts, "Correo o contraseña incorrectos", "danger")

        localStorage.setItem('token', token)
        router.push("/home")
    }

    return (
        <div className="d-flex flex-column vh-100 p-0 m-0">
            <AlertContainer alerts={alerts}/>
            <NavBar/>

            <div className="d-flex flex-row flex-grow-1 justify-content-evenly align-items-center">
                <div className="px-5">
                    <div className="form-container flex-shrink-1 p-5">
                        <div>
                            <h1 className="display-3 ms-extrabold">Iniciar sesión con el correo de la U-tad</h1>
                            <p className="d-none d-sm-block lead">
                                El desarrollo de proyectos es una carta de presentación de los
                                conocimientos, experiencia y capacidad de trabajo en equipo.
                            </p>
                        </div>

                        <form className="row row-gap-3" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                id="email"
                                className="form-control py-3"
                                style={{backgroundColor: "var(--secundario-gris-claro)"}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo Electrónico"
                                required
                                autoComplete="off"
                            />

                            <input
                                type="password"
                                id="password"
                                className="form-control py-3"
                                style={{backgroundColor: "var(--secundario-gris-claro)"}}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                required
                                autoComplete="off"
                            />

                            <Link className="link-underline-dark link-dark fw-bold" href="/recover">¿Has olvidado la contraseña?</Link>

                            <button
                                type="submit"
                                className="btn btn-primary border-5 py-3 fs-3">
                                INICIAR SESIÓN
                            </button>

                            <div className="text-center">
                                <span className="pe-1">¿Aún no tienes cuenta?</span>
                                <Link className="link-underline-dark link-dark fw-bold ps-1" href="/signup">¡Inscríbete ahora!</Link>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-none d-xl-block bg-image-main w-100"></div>
            </div>
        </div>
    )
}