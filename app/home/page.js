"use client"

import { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { subir_ficheros, crear_proyecto, get_proyectos, validar_proyecto } from '@/api/v1/proyectos';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
    // TODO - Implementar tamaño máximo de fichero
    const { user, isLoading } = useAuth();
    const [projects, setProjects] = useState([]);
    const router = useRouter();

    const hiddenFileInput = useRef(null);

    useEffect(() => {
        // TODO - Obtener proyectos del usuario
        const token = localStorage.getItem('token');
        get_proyectos(token).then(data => {
            setProjects(data);
            console.log(data);
        });
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

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

    const handleCardClick = (id) => {
        router.push(`/project/${id}`);
    };

    return (
        <div className="container-fluid p-5 d-flex flex-column justify-content-center" style={{ height: '100vh' }}>
            <input type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                multiple={true}
            />
            <div className="row g-4 card-group mt-5">
                {projects.map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick}/>)}
            </div>
        </div>
    );
}