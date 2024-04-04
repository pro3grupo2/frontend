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
            <div className='container text-center'>
                <h1 className="ms-extrabold">Trabajos de alumnos/is</h1>
                <p className="ms-semibold mt-4">¡Descubre aquí el talento U-tad!</p>
                <p className="ms-regular mt-3">Bienvenido al repositorio de proyectos oficial de la U-tad.<br />
                    Aquí podrás encontrar todo tipo de trabajos de los alumnos que se han formado aquí!
                </p>


                <div class="d-grid gap-2 col-4 mx-auto">
                    <button onClick={handleAccess} className="btn btn-primary ms-button mt-5 border-5 btn-lg ">Acceder</button>
                </div>
            </div>
        </div>
    );
}    