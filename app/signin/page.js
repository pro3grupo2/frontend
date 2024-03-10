"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

import { signin } from '@/api/v1/auth';
import NavBar from "@/components/NavBar"
import { AlertContainer, create_alert } from "@/components/Alerts"

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [alerts, setAlerts] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await signin(email, password);
        if (!token) return create_alert(setAlerts, "Correo o contraseña incorrectos", "danger");

        localStorage.setItem('token', token);
        router.push("/home");
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="vh-100 d-flex flex-column">
            <AlertContainer alerts={alerts}/>
            <NavBar/>
            <div className="container-fluid flex-fill d-flex flex-column">
                <div className="row flex-fill">
                    <div className="col-md-6 d-flex flex-column">
                        <div className="row justify-content-center mt-5">
                            <div className="col-md-10 col-12 d-flex flex-column">
                                <h1 className="display-4 ms-extrabold mt-5">Iniciar sesión con el correo de la U-tad</h1>
                                <p className="d-none d-sm-block lead mt-3">
                                    El desarrollo de proyectos es una carta de presentación de los
                                    conocimientos, experiencia y capacidad de trabajo en equipo.
                                </p>
                                <form className="row row-gap-3 mx-0 mt-5" onSubmit={handleSubmit}>
                                    <div className="input-group mb-3 px-0" style={{ width: "75%" }}>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control py-3 fs-5"
                                            style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Correo Electrónico"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="input-group mb-3 px-0" style={{ width: "75%" }}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            className="form-control py-3 fs-5"
                                            style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Contraseña"
                                            required
                                            autoComplete="off"
                                        />
                                        <button type="button" className="btn btn-dark" onClick={togglePasswordVisibility}>
                                            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>

                                    <Link className="link-underline-dark link-dark fw-bold mt-2 px-0" href="/recover">¿Has olvidado la contraseña?</Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary border-5 py-3 ms-extrabold fs-2 mt-5"
                                        style={{ width: "90%" }}>
                                        INICIAR SESIÓN
                                    </button>

                                    <div className="text-center mt-5">
                                        <span className="pe-1">¿Aún no tienes cuenta?</span>
                                        <Link className="link-underline-dark link-dark fw-bold ps-1" href="/signup">¡Inscríbete ahora!</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-md-block p-0">
                        <div className=" d-md-block bg-image-main w-100 h-100"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
