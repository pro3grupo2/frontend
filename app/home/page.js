"use client"

import React from 'react';
import useAuth from '@/hooks/useAuth';

export default function Home() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container-fluid text-center d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <h1 className="display-1 ms-extrabold">Bienvenido {user.rol}, {user.nombre_completo}!</h1>
        </div>
    );
}
