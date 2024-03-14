"use client"

import { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { get_proyecto } from "@/api/v1/proyectos";

export default function Project({ params }) {
    const { user, isLoading } = useAuth();
    const [proyecto, setProyecto] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        get_proyecto(token, params.id).then(data => {
            setProyecto(data);
        });
    }, [params.id]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container-fluid d-flex justify-content-center">
            <h1>{proyecto.titulo}</h1>
            <h3></h3>
        </div>
    );
}