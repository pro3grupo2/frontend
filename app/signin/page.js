"use client";

import {useState} from 'react';
import {useRouter} from "next/navigation";
import Link from 'next/link';

import {signin} from '@/api/v1/auth';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await signin(email, password)
        if (token) {
            localStorage.setItem('token', token);
            router.push("/home");
        }
    }

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="form-container col-12 col-xl-4 align-self-center px-5 mt-5">
                    <div>
                        <h1 className="display-3 ms-extrabold">Iniciar Sesión con el Correo de U-tad</h1>
                        <p className="lead py-2 mb-4">
                            El desarrollo de proyectos es una carta de presentación de los
                            conocimientos, experiencia y capacidad de trabajo en equipo.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="py-3 ">
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
                        </div>
                        <div className="mb-3">
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
                        </div>
                        <p>
                            <Link className="link-underline-dark link-dark fw-bold" href="/recover">
                                        <span>
                                            ¿Has olvidado la contraseña?
                                        </span>
                            </Link>
                        </p>
                        <button
                            type="submit"
                            className="btn btn-primary mt-4 w-100 border-5 btn-lg py-3 fs-3">
                            INICIAR SESIÓN
                        </button>
                        <p className="text-center">
                                <span>
                                    ¿Aún no tienes cuenta?{" "}
                                    <Link className="link-underline-dark link-dark fw-bold" href="/signup">
                                        <span>¡Inscríbete ahora!</span>
                                    </Link>
                                </span>
                        </p>
                    </form>
                </div>

                <div className="d-none d-xl-inline col-xl-8">
                    <div className="bg-image-main"></div>
                </div>
            </div>
        </div>
    )
}