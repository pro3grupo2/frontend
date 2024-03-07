"use client"

import React from 'react';
import Image from 'next/image';

import { me } from '@/api/v1/auth';

async function ME(token) {
    const data = await me(token);
    console.log(data);
}

export default function HomePage() {
    return (
        <div className="container-fluid bg-image-main text-center d-flex flex-column justify-content-center align-items-center mx-0">
            <h1 className="display-1 ms-black mb-4">Trabajos de alumnos/nis</h1>
            <p className="ms-extrabold fs-2 mb-4">¡Descubre aquí el talento U-tad!</p>
            <p className="ms-light fs-5 mb-0">Bienvenido al repositorio de proyectos oficial de la U-tad.</p>
            <p className="ms-light fs-5 mb-5">Aquí podrás encontrar todo tipo de trabajos de los alumnos que se han formado aquí!</p>
            <button className="btn btn-primary mt-5 ms-button fs-2 px-5 w-50 border-5 btn-lg py-1 text-uppercase">Acceder</button>
        </div>
    )
}