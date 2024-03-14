"use client"

import { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { get_proyecto } from "@/api/v1/proyectos";

export default function Project({ params }) {
    const { user, isLoading } = useAuth();
    const [proyecto, setProyecto] = useState({});
    const [proyectoLoaded, setProyectoLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        get_proyecto(token, params.id).then(data => {
            setProyecto(data);
            setProyectoLoaded(true);
        });
    }, [params.id]);

    if (isLoading || !proyectoLoaded) {
        return <div className="text-center">Cargando...</div>;
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="display-1 ms-extrabold">{proyecto.titulo}</h1>
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-outline-primary me-2">Editar</button>
                    <button className="btn btn-outline-primary me-2">Descargar</button>
                </div>
            </div>
            <p className="fs-3 ms-extrabold mb-4">{proyecto.usuarios.nombre_completo}</p>
            <div className="bg-light p-5 rounded">
                <p>{proyecto.ficha}</p>
            </div>
        </div>
    );
}