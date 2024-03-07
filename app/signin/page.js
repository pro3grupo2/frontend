"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

import { signin } from '@/api/v1/auth';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email); 

        const token = await signin(email, password)
        if (token) {
            localStorage.setItem('token', token);
            router.push("/home");
        }
    }

    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-md-6">
                    {/* Formulario */}
                    <div className="split-container">
                        <div className="form-container">
                            <div className="text-container ">
                                <h1 className='ms-black'>Iniciar Sesión con el Correo de U-tad</h1>
                                <p className="subtext py-2 mb-4">
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
                                        style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Correo Electrónico"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control py-3"
                                        style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Contraseña"
                                        required
                                    />
                                </div>
                                <p>
                                    <Link className="link-underline-dark link-dark fw-bold" href="/recover">
                                        <span >
                                            ¿Has olvidado la contraseña?
                                        </span>
                                    </Link>
                                </p>
                                <button
                                    type="submit"
                                    className="btn ms-black btn-primary mt-4 w-100 border-5 btn-lg py-3 fs-3">
                                    INICIAR SESIÓN
                                </button>
                            </form>
                            
                            <p className="text-center">
                                <span >
                                    ¿Aún no tienes cuenta?{" "}
                                    <Link className="link-underline-dark link-dark fw-bold" href="/signup">
                                        <span >¡Inscríbete ahora!</span>
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="image-container ">
                        <Image
                            src="/images/img_placeholder.png"
                            alt="Descripción de la imagen"
                            width={0}
                            height={0}
                            sizes="(max-width: 80px) 50vw, 100vw"
                            className="img-fluid h-100 w-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
