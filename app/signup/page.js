"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

import { signin } from '@/api/v1/auth';
import NavBar from "@/components/NavBar"
import { AlertContainer, create_alert } from "@/components/Alerts"

export default function SignUp() {
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [showPassword, setShowPassword] = useState(false);
    // const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();
    const [alerts, setAlerts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const [hasemail, setHasEmail] = useState(false);
    const [haspassword, setHasPassword] = useState(false);
    const [hasrol, setHasRol] = useState(false);
    const [hasdatos, setHasDatos] = useState(false);

    if (hasdatos) return (
        <div>
            Completed
        </div>
    )

    if (hasrol) return (
        <div>
            Datos
        </div>
    )

    if (haspassword) return (
        <></>
    )
    
    if (hasemail) return (
        <></>
    )

    return (
        <>
            <AlertContainer alerts={alerts} />

            <div className="d-flex flex-row flex-grow-1 justify-content-evenly align-items-center">
                <div className="flex-shrink- px-5 mx-xl-5">
                    <div className="pb-4">
                        <h1 className="display-4 ms-extrabold">Crear cuenta</h1>
                        <p className="d-none fs-5 d-sm-block lead">
                            Indícanos cuál es tu correo asociado a la U-tad.
                        </p>
                    </div>

                    <form className="row row-gap-3 m-0" onSubmit={handleSubmit}>
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

                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <button className="btn btn-secondary" onClick={() => router.push('/signin')} type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                                    <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#091229" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setHasEmail(true);
                                    router.push('/signup/password');
                                }}
                                className="w-40 btn btn-primary border-5 py-2 fs-1 fw-bold">
                                SIGUIENTE
                            </button>
                        </div>
                    </form>
                </div>
                <div className="d-none d-xl-block w-100" style={{ maxWidth: '5%' }}></div>
                <div className="d-none d-xl-block bg-image-main w-100" style={{ maxWidth: '50%' }}></div>
            </div>
        </>
    );
}