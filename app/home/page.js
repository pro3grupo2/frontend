"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { me } from '@/api/v1/auth';

export default function Home() {
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            me(token).then((data) => {
                setUser(data);
                console.log(data);
            });
        } else {
            router.push('/signin');
        }
    }, []);

    if (user === undefined) {
        router.push('/signin');
    }

    return (
        <div className="container-fluid text-center d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <h1 className="display-1 ms-extrabold">Bienvenido {user.rol}, {user.nombre_completo}!</h1>
        </div>
    )
}