"use client"

import React from 'react'
import { useRouter } from "next/navigation"

export default function HomePage() {

    const router = useRouter()

    function handleAccess() {
        router.push('/home')
    }

    return (
        <div className="container-fluid bg-image-main d-flex flex-column justify-content-center align-items-center p-0">
            <div className='container text-center' style={{ maxWidth: 800 }}>
                <h1 className="fw-bold display-3">Trabajos de alumnos/is</h1>
                <p className="fw-bold  mt-4 fs-5">¡Descubre aquí el talento U-tad!</p>
                <p className="pe-1 mt-3 fs-5">Bienvenido al repositorio de proyectos oficial de la U-tad.<br />
                    Aquí podrás encontrar todo tipo de trabajos de los alumnos que se han formado aquí!
                </p>

                <div className="container text-center d-grid gap-2" style={{ maxWidth: 512 }}>
                    <button onClick={handleAccess} className="btn btn-primary mt-5 btn-lg text-center fw-bold fs-3" style={{ maxWidth: 512, height: 64 }}>ACCEDER</button>
                </div>
            </div>
        </div>
    )
}    