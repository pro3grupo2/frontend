"use client"

import {useEffect, useState} from 'react';
import useAuth from '@/hooks/useAuth';
import {get_proyecto, get_proyectos} from "@/api/v1/proyectos";
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';

export default function Project({params}) {
    const {user, isLoading} = useAuth();
    const [proyecto, setProyecto] = useState({});
    const [userProjects, setUserProjects] = useState([]);
    const [otherProjects, setOtherProjects] = useState([]);
    const [proyectoLoaded, setProyectoLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        get_proyecto(token, params.id).then(data => {
            setProyecto(data);
            setProyectoLoaded(true);
        });
    }, [params.id]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (user) {
            get_proyectos(token).then(data => {
                setUserProjects(data.filter(project => project.usuarios.id === user.id));
                setOtherProjects(data.filter(project => project.usuarios.id !== user.id));
            });
        }
    }, [user]);

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
        return (
            <div className="container py-5">
                <p className="text-decoration-underline fs-5 ms-black">Carrera/Nombre_Proyecto/Año</p>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <h1 className="display-1 ms-black">{proyecto.titulo}</h1>
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-outline-dark rounded-pill me-2 p-3"><span className="me-4">Editar</span> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8.91984 0.000121768L6.91984 0.00012168L6.91984 12.0001L1.41984 6.50012L-0.000156749 7.92012L7.91984 15.8401L15.8398 7.92012L14.4198 6.50012L8.91984 12.0001L8.91984 0.000121768Z" fill="black"/>
                            </svg>
                        </button>
                        <Link href={`https://api.reservorio-u-tad.com${proyecto.url}`} className="btn btn-outline-dark rounded-pill me-2 p-3"><span className="me-4">Descargar</span> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8.91984 0.000121768L6.91984 0.00012168L6.91984 12.0001L1.41984 6.50012L-0.000156749 7.92012L7.91984 15.8401L15.8398 7.92012L14.4198 6.50012L8.91984 12.0001L8.91984 0.000121768Z" fill="black"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <p className="fs-3 ms-extrabold mt-3 mb-4">{proyecto.usuarios.nombre_completo}</p>
                <img src={`https://api.reservorio-u-tad.com${proyecto.portada}`} className="object-fit-fill" alt="Project Image" style={{width: "100%", height: "500px"}}/>
                <p className="fs-5 ms-regular my-4">{proyecto.ficha}</p>
                <div className="row g-4 card-group mt-5">
                    {userProjects.length > 0 && (
                        <div className="col-12">
                            <h2 className="ms-black">Tus proyectos</h2>
                            <div className="row g-4">
                                {userProjects.map(project => <ProjectCard key={project.id} project={project}/>)}
                            </div>
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    <hr className="w-50"/>
                    <button className="w-25 btn btn-outline-secondary rounded-pill">Ver más +</button>
                    <hr className="w-50"/>
                </div>
                <div className="row g-4 card-group mt-5">
                    {otherProjects.length > 0 && (
                        <div className="col-12">
                            <h2 className="ms-black">Otros proyectos</h2>
                            <div className="row g-4">
                                {otherProjects.map(project => <ProjectCard key={project.id} project={project}/>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}