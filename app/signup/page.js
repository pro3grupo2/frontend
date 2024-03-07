"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

import { signup } from '@/api/v1/auth';


export default function SignUp() {

    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await signup(email, "alumno")
        console.log(data);
        router.push("/signin");
    }

    return (
        <div className="container-fluid">
            <div className="d-flex flex-row justify-content-center w-100">
                {/* Primer div */}
                <div className="col-md-6">
                    {/* Contenido del primer div */}
                    <div className="split-container">
                        <div className="form-container">
                            <div className="text-container mt-5 pt-3">
                                <h1>Termina de configurar <br /> tu cuenta</h1>
                                <p className="subtext">
                                    Indícanos cuál es tu correo asociado a la U-tad
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 mt-5">
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="  Correo Electrónico"
                                        required
                                    />
                                </div>
                            </form>

                            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                <button class="btn btn-primary me-md-2 mt-2 w-40 btn-lg 3" type="button">SIGUIENTE</button>
                            </div>
                            <p className="text-center mt-5 pt-5">
                                <span>
                                    ¿Ya tienes una cuenta?{" "}
                                    <Link className="link-underline-dark link-dark fw-bold" href="/signup">
                                        <span>Iniciar sesión</span>
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Segundo div */}
                <div className="col-md-6">
                    {/* Contenido del segundo div */}
                    <div className="d-flex justify-content-end">
                        <div className="image-container overflow-hidden w-100 h-100">
                            <Image
                                src="/images/img_placeholder.png"
                                alt="Descripción de la imagen"
                                width={750}
                                height={400}
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}