"use client"

import React from 'react';
import { useRouter } from "next/navigation";

export default function HomePage() {

    const router = useRouter();

    function handleAccess() {
        router.push('/home');
    }

    return (
        <div className="container-fluid bg-image-main d-flex flex-column justify-content-center align-items-center p-0">
            <div className='container text-center' style={{maxWidth:800}}>
                <h1 className="fw-bold display-3">Trabajos de alumnos/is</h1>
                <p className="fw-bold  mt-4">¡Descubre aquí el talento U-tad!</p>
                <p className="pe-1 mt-3">Bienvenido al repositorio de proyectos oficial de la U-tad.<br />
                    Aquí podrás encontrar todo tipo de trabajos de los alumnos que se han formado aquí!
                </p>

                <div className="container text-center d-grid gap-2" style={{maxWidth:512}}>
                    <button onClick={handleAccess} className="btn btn-primary ms-button mt-5 border-5 btn-lg text-center">Acceder</button>
                </div>
            </div>
        </div>
    );
}    