"use client"

import { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { subir_ficheros, crear_proyecto } from '@/api/v1/proyectos';

export default function Home() {
    // TODO - Implementar tamaño máximo de fichero
    const { user, isLoading } = useAuth();
    const [projects, setProjects] = useState([]);

    const hiddenFileInput = useRef(null);

    useEffect(() => {
        // TODO - Obtener proyectos del usuario
        // const token = localStorage.getItem('token');
        // const proyectos = obtener_proyectos(token).then(console.log);
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    console.log(user);

    const handleChange = event => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const portada = event.target.files[1];
            const token = localStorage.getItem('token');
            const data = subir_ficheros(token, file, portada).then(data => {
                const proyecto = crear_proyecto(token, `Titulo ${Date.now()}`, "Ficha", data.url, data.portada, [2]).then(console.log);
            });
        }
    };

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <div className="container-fluid text-center d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <input type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                multiple={true}
            />
            <button className="btn btn-primary mt-3" onClick={handleClick}>Upload</button>
        </div>
    );
}