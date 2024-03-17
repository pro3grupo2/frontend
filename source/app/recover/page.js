"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation"; // Cambio en la importación
import Link from 'next/link';
import { signin, validate, crear_codigo } from '../../api/v1/auth';
import Image from 'next/image';
import {recover} from "../../api/v1/auth";

export default function RecoverPassword() {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1); // Add a state variable for the current step
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform any necessary actions before moving to the next step
        // Then increment the step
        setStep(step + 1);
        await recover(email);
    }
    if(step === 1) {
        return (
            <div className="container-fluid">
                <div className="row vh-100">
                    <div className="form-container col-12 col-xl-4 align-self-center px-3 ">
                        <div>
                            <h1 className="display-3 ms-extrabold">¿Has olvidado tu contraseña?</h1>
                            <p className="lead py-2 mb-4">
                                Indícanos cuál es tu correo electrónico y te enviaremos un enlace para que puedas recuperar tu contraseña.
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
                                    autoComplete="off"
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-5">
                                {/* Botón "Atrás" */}
                                <Link href="/signin">
                                    <button className="btn btn-secondary" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                                            <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#091229" />
                                        </svg>
                                    </button>
                                </Link>

                                {/* Botón "Siguiente" */}
                                <button className="btn btn-primary w-40 btn-lg" type="submit">
                                    SIGUIENTE
                                </button>
                            </div>
                            <p className="text-center mt-5">
                            <span>
                                ¿Recuerdas tu contraseña?{" "}
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

    if(step === 2) {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row vh-100 justify-content-center">
                    <div className="form-container col-12 col-xl-4 align-self-center px-3 ">
                        <h2>
                            Esperando la confirmacion del correo
                        </h2>

                    </div>
                </div>
            </div>
        );
    }


}