"use client"

import { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { crear_proyecto, get_proyectos, subir_ficheros } from '@/api/v1/proyectos';
import ProjectCard from '@/components/ProjectCard';
import { me } from '@/api/v1/auth';
import Loading from '@/components/Loading';

export default function Home() {
    const { user, isLoading } = useAuth();
    const [projects, setProjects] = useState([]);
    const [proyectosLoaded, setProyectosLoaded] = useState(false);
    const router = useRouter();

    const hiddenFileInput = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        get_proyectos(token).then(data => {
            setProjects(data);
            setTimeout(() => {
                setProyectosLoaded(true);
            } , 1000);
        });
    }, []);

    if (isLoading || !proyectosLoaded) {
        return <Loading />
    }

    const handleClick = () => {
        const portadaFile = document.getElementById('portada').files[0];
        const ficheroFile = document.getElementById('fichero').files[0];
        
        const token = localStorage.getItem('token');
        const data = subir_ficheros(token, ficheroFile, portadaFile).then(data => {
            const proyecto = crear_proyecto(token, `Titulo ${Date.now()}`, "Ficha", data.url, data.portada, [2]).then(console.log);
        });
    };

    const handleCardClick = (id) => {
        router.push(`/project/${id}`);
    };

    const killBot = async () => {
        for (let i = 0; i < 100; i++) {
            const data = await me("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sIjoiY29vcmRpbmFkb3IiLCJpYXQiOjE3MTAzNTE5NzMsImV4cCI6MTcxMDQzODM3M30.ppUCX18l3a6NFnym0SK4i0kaniu3eeo-M6V-cISfND4");
        }
    }

    if (projects.length === 0) {
        return (
            <div className="container-fluid p-5 d-flex flex-column justify-content-center" style={{ height: '100vh' }}>
                <div className="text-center">
                    <label htmlFor="portada">Portada: </label>
                    <input id="portada" type="file" ref={hiddenFileInput} accept='image/*' title="Select File"/>
                    <br />
                    <label htmlFor="fichero">Proyecto: </label>
                    <input id="fichero" type="file" ref={hiddenFileInput} title="Select File"/>
                    <br />
                    <button className="btn btn-primary" onClick={handleClick}>Subir</button>
                    <h1 className="display-1 ms-black">No hay proyectos</h1>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container-fluid p-5 d-flex flex-column justify-content-center mt-5" style={{ height: '800vh' }}>
                <div className="row d-flex align-items-center p-2 border border-black border-1 rounded mb-4">
                    <div className="col">
                        <span className="me-5">Filtro</span>
                        <svg className="ms-5" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                            <path d="M3 7H15V5H3M0 0V2H18V0M7 12H11V10H7V12Z" fill="black" />
                        </svg>
                    </div>
                    <div className="col">
                        <select className="form-select py-2 px-5 border border-black">
                            <option>Año</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select py-2 px-5 border border-black">
                            <option>Asignatura</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select py-2 px-5 border border-black">
                            <option>Clase</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select py-2 px-5 border border-black">
                            <option>Filtro</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select py-2 px-5 border border-black">
                            <option>Filtro</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <div className="container-fluid d-flex justify-content-center">
                            <ul className="nav nav-underline">
                                <li className="nav-item me-5">
                                    <button className="nav-link text-dark">TODO</button>
                                </li>
                                <li className="nav-item me-5">
                                    <button className="nav-link text-dark active">ANIMACION</button>
                                </li>
                                <li className="nav-item me-5">
                                    <button className="nav-link text-dark">DISEÑO DIGITAL</button>
                                </li>
                                <li className="nav-item me-5">
                                    <button className="nav-link text-dark">INGENIERIA Y CIENCIAS</button>
                                </li>
                                <li className="nav-item me-5">
                                    <button className="nav-link text-dark">VIDEOJUEGOS</button>
                                </li>
                            </ul>
                        </div>
                        <hr className="m-0"></hr>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <div className="d-flex flex-wrap gap-2">
                            <span className="btn btn-outline-dark rounded-pill me-2">
                                Filtro <span className="ms-3" aria-hidden="true">&times;</span>
                            </span>
                            <span className="btn btn-outline-dark rounded-pill me-2">
                                Filtro <span className="ms-3" aria-hidden="true">&times;</span>
                            </span>
                        </div>
                    </div>
                    <hr className="m-3"></hr>
                </div>

                <div className="row g-4 card-group mt-5">
                    {projects.map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick} />)}
                </div>
            </div>
        );
    }
}