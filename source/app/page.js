"use client"

import React from 'react';
import {useRouter} from "next/navigation";

export default function HomePage() {

    const router = useRouter();

    function handleAccess() {
        router.push('/home');
    }

    return (
        <div className="container-fluid bg-image-main text-center d-flex flex-column justify-content-center align-items-center mx-0">
            <h1 className="display-1 ms-extrabold mb-4">Trabajos de alumnos/nis</h1>
            <p className="ms-extrabold fs-2 mb-4">¡Descubre aquí el talento U-tad!</p>
            <p className="ms-light fs-5 mb-0">Bienvenido al repositorio de proyectos oficial de la U-tad.</p>
            <p className="ms-light fs-5 mb-5">Aquí podrás encontrar todo tipo de trabajos de los alumnos que se han formado aquí!</p>
            <button onClick={handleAccess} className="btn btn-primary mt-5 ms-button fs-2 px-5 w-50 border-5 btn-lg py-1 text-uppercase">Acceder</button>
        </div>
    )
}