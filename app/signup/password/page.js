"use client"

import { AlertContainer, create_alert } from "@/components/Alerts"
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function SignUpPassword() {
    const [alerts, setAlerts] = useState([])
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hasPassword, setHasPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <AlertContainer alerts={alerts} />

            <div className="d-flex flex-row flex-grow-1 justify-content-evenly align-items-center">
                <div className="flex-shrink- px-5 mx-xl-5">
                    <div className="pb-4">
                        <h1 className="display-4 ms-extrabold">Termina de configurar tu cuenta</h1>
                        <p className="d-none fs-5 d-sm-block lead">
                            Paso 1 de 3. Crea una contraseña para continuar
                        </p>
                    </div>

                    <form className="row row-gap-3 m-0" onSubmit={handleSubmit}>
                        <div className="input-group mb-3 px-0" style={{ width: "75%" }}>
                            <input
                                type="password" // Cambiado a type="password" para ocultar la contraseña
                                id="password" // Cambiado a id="password" para el campo de contraseña
                                className="form-control py-3 fs-5"
                                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                value={password} // Cambiado a value={password} para vincular el estado de la contraseña
                                onChange={(e) => setPassword(e.target.value)} // Cambiado a onChange={(e) => setPassword(e.target.value)} para actualizar el estado de la contraseña
                                placeholder="Contraseña" // Cambiado a placeholder="Contraseña" para indicar que es un campo de contraseña
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="input-group mb-3 px-0" style={{ width: "75%" }}>
                            <input
                                type="password"
                                id="confirmPassword" // Nuevo id para el campo de confirmación de contraseña
                                className="form-control py-3 fs-5"
                                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                                value={confirmPassword} // Nuevo estado para la confirmación de la contraseña
                                onChange={(e) => setConfirmPassword(e.target.value)} // Nueva función onChange para actualizar el estado de la confirmación de la contraseña
                                placeholder="Confirmar Contraseña" // Placeholder para indicar que es un campo de confirmación de contraseña
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
                                    // Aquí deberías realizar la validación de la contraseña y enviarla al servidor si es válida
                                    // Actualmente, solo establece el estado de hasPassword en true, lo cual es un placeholder
                                    setHasPassword(true);
                                    router.push('./password/role');
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