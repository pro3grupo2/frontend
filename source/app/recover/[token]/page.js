"use client"
import {useState} from 'react';
import Link from 'next/link';
import {update} from "@/api/v1/account";
import { useRouter } from 'next/router';
import {EstructuraFormularios} from "@/components/Estructura";

export default function RecoverPassword({params}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter(); // Obtener el enrutador

    const handleSubmit = async (e) => {
        e.preventDefault();
        // No hay necesidad de realizar ninguna acción en la API
        // Simplemente navega a la página de recuperación de contraseña
        await update(params.token, undefined, password, undefined, undefined, undefined);
        router.push('/signin');
    }

    return (
        <EstructuraFormularios>
            <div>
                <h1 className="display-3 ms-extrabold">Recupera tu contraseña</h1>
            </div>
            <p>
                Crea una nueva contraseña
            </p>

            <form onSubmit={handleSubmit}>
                <div className="py-3 ">
                    <input
                        type="password"
                        id="password"
                        className="form-control py-3"
                        style={{backgroundColor: "var(--secundario-gris-claro)"}}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nueva Contraseña"
                        required
                        autoComplete="new-password"
                    />
                </div>
                <div className="py-3 ">
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control py-3"
                        style={{backgroundColor: "var(--secundario-gris-claro)"}}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmar Nueva Contraseña"
                        required
                        autoComplete="new-password"
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-5">
                    {/* Botón "Atrás" */}
                    <Link href="/signin">
                        <button className="btn var(--color-secundario-blanco)" type="button" style={{border: '2px solid var(--color-principal)'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"
                                 fill="none">
                                <path
                                    d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z"
                                    fill="#091229"/>
                            </svg>
                        </button>
                    </Link>

                    {/* Botón "Siguiente" */}
                    <button className="btn btn-primary w-40 btn-lg" type="submit" href="/home">
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
        </EstructuraFormularios>

    );
}