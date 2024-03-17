"use client"

import {useEffect, useState} from 'react';
import useAuth from '@/hooks/useAuth';
import {get_proyecto} from "@/api/v1/proyectos";
import ProjectCard from '@/components/ProjectCard';

export default function Project({params}) {
    const {user, isLoading} = useAuth();
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
        return (
            <div className="container-fluid p-5 d-flex flex-column justify-content-center" style={{height: '100vh'}}>
                <div className="text-center">
                    <h1 className="display-1 ms-black">Cargando...</h1>
                </div>
            </div>
        );
    }

    if (!proyecto) {
        return (
            <div className="container-fluid p-5 d-flex flex-column justify-content-center" style={{height: '100vh'}}>
                <div className="text-center">
                    <h1 className="display-1 ms-black">Proyecto no encontrado</h1>
                </div>
            </div>
        );
    } else {
        console.log(proyecto);
        return (
            <div className="container py-5">
                <p className="text-decoration-underline fs-5 ms-black">Carrera/Nombre_Proyecto/Año</p>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="display-1 ms-black">{proyecto.titulo}</h1>
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-outline-dark rounded-pill me-2"><span className="me-3">Editar</span> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8.91984 0.000121768L6.91984 0.00012168L6.91984 12.0001L1.41984 6.50012L-0.000156749 7.92012L7.91984 15.8401L15.8398 7.92012L14.4198 6.50012L8.91984 12.0001L8.91984 0.000121768Z" fill="black"/>
                            </svg>
                        </button>
                        <button className="btn btn-outline-dark rounded-pill me-2"><span className="me-3">Descargar</span> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8.91984 0.000121768L6.91984 0.00012168L6.91984 12.0001L1.41984 6.50012L-0.000156749 7.92012L7.91984 15.8401L15.8398 7.92012L14.4198 6.50012L8.91984 12.0001L8.91984 0.000121768Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <p className="fs-3 ms-extrabold mt-3 mb-4">{proyecto.usuarios.nombre_completo}</p>
                <svg className="" width="70%" height="40%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
                <p className="fs-5 ms-regular my-4">{proyecto.ficha}</p>
                <div className="row g-4 card-group mt-5">
                    {/* Show only 3 projects of the same user */}
                    <ProjectCard project={proyecto}/>
                    <ProjectCard project={proyecto}/>
                    <ProjectCard project={proyecto}/>
                </div>
                <div className="d-flex justify-content-center">
                    <hr className="w-50"/>
                    <button className="w-25 btn btn-outline-secondary rounded-pill">Ver más +</button>
                    <hr className="w-50"/>
                </div>
                <div className="row g-4 card-group mt-5">
                    {/* Show only 3 projects of the same user */}
                    <ProjectCard project={proyecto}/>
                    <ProjectCard project={proyecto}/>
                    <ProjectCard project={proyecto}/>
                    <ProjectCard project={proyecto}/>
                    <ProjectCard project={proyecto}/>
                    <ProjectCard project={proyecto}/>
                </div>
            </div>
        );
    }
}