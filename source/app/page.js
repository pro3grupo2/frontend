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
            <h1 className="display-3 ms-extrabold mt-2">Trabajos de alumnos/nis</h1>
            <p className="ms-semibold fs-3 mb-5">¡Descubre aquí el talento U-tad!</p>
            <p className="ms-regular fs-5 mt-5">Bienvenido al repositorio de proyectos oficial de la U-tad.</p>
            <p className="ms-regular fs-5">Aquí podrás encontrar todo tipo de trabajos de los alumnos que se han formado aquí!</p>
            <button onClick={handleAccess} className="btn btn-primary ms-button fs-2  w-50 border-5 btn-lg text-uppercase">Acceder</button>
        </div>
    )
}