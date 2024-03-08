"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

import { signup } from '@/api/v1/auth';


export default function SignUp() {

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [alias, setAlias] = useState('');
    const [password, setPassword] = useState('');
    const [recoveryPhrase, setRecoveryPhrase] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await signup(email, fullName, alias, password, recoveryPhrase, "alumno")
        console.log(data);
        router.push("/signin");
    }
    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="form-container col-12 col-xl-4 align-self-center px-5 mt-5 ">
                    <div>
                        <h1 className="display-3 ms-extrabold">Crear cuenta</h1>
                        <p className="lead py-2 mb-4">
                            Indícanos tus datos para crear tu cuenta en U-tad.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="py-2 ">
                            <input
                                type="email"
                                id="email"
                                className="form-control py-2"
                                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo Electrónico"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="py-2 ">
                            <input
                                type="text"
                                id="fullName"
                                className="form-control py-2"
                                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Nombre Completo"
                                required
                            />
                        </div>
                        <div className="py-2 ">
                            <input
                                type="text"
                                id="alias"
                                className="form-control py-2"
                                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                                placeholder="Alias"
                                required
                            />
                        </div>
                        <div className="py-2 ">
                            <input
                                type="password"
                                id="password"
                                className="form-control py-2"
                                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="py-2 ">
                            <input
                                type="text"
                                id="recoveryPhrase"
                                className="form-control py-2"
                                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                value={recoveryPhrase}
                                onChange={(e) => setRecoveryPhrase(e.target.value)}
                                placeholder="Frase de Recuperación"
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-5">
                            {/* Nuevo botón a la izquierda */}
                            <button className="btn btn" type='button'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ width: "48px", height: "48px", padding: "16px", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px", flexShrink: "0", borderRadius: "8px", border: "1px solid var(--Color-Principal, #0065F3)", background: "var(--Color-Secundario-Blanco, #FFF)" }}>
                                    <path d="M48 4.28717L41.0938 11.1934L36.8066 6.90625L30 13.7129L34.2871 18L28.8066 23.4795L35.7129 30.3857L30.2129 35.8857L37.1191 42.7919L42.6074 37.3036L46.8945 41.5907L40 48L3.99997 12L0 8L36.8066 4.90625L41.0938 0L48 6.90625V4.28717Z" fill="#091229" />
                                </svg>

                            </button>

                            {/* Botón "SIGUIENTE" */}
                            <button className="btn btn-primary w-40 btn-lg" type="submit">
                                SIGUIENTE
                            </button>
                        </div>
                        <p className="text-center mt-5">
                            <span>
                                ¿Ya tienes una cuenta?{" "}
                                <Link className="link-underline-dark link-dark fw-bold" href="/signin">
                                    <span>Iniciar sesión</span>
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
    );
}
