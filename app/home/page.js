"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { me } from '@/api/v1/auth';

export default function Home() {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            router.push('/signin');
        } else {
            me(token).then((data) => {
                setUser(data);
                setIsLoading(false); // desactivo carga de pagina web
            }).catch(() => {
                // si token invalido entonces redirige
                router.push('/signin');
            });
        }
    }, [router]);

    if (isLoading) {
        return <div>Cargando...</div>; // pagina mientras verifica token
    }

    // si ha cargado pero hay algun problema con el user tambien redirige
    if (!user) {
        router.push('/signin');
        return null;
    }
    //contenido del home
    return ( 
        <div className="container-fluid text-center d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <h1 className="display-1 ms-extrabold">Bienvenido {user.rol}, {user.nombre_completo}!</h1>
        </div>
    );
}
