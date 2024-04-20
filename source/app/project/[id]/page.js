"use client"

import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { get_proyecto, get_proyectos } from "@/api/v1/proyectos";
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import Loading from '@/components/Loading';
import Image from 'next/image';
import {useRouter} from "next/navigation";

export default function Project({ params }) {
    const { user, isLoading } = useAuth();
    const [proyecto, setProyecto] = useState({});
    const [userProjects, setUserProjects] = useState([]);
    const [otherProjects, setOtherProjects] = useState([]);
    const [proyectoLoaded, setProyectoLoaded] = useState(false);
    const router = useRouter();

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
        return <Loading />
    }

    const handleCardClick = (id) => {
        router.push(`/project/${id}`);
    };

    if (!proyecto) {
        return (
            <div className="container-fluid p-5 d-flex flex-column justify-content-center" style={{ height: '100vh' }}>
                <div className="text-center">
                    <h1 className="display-1 ms-black">Proyecto no encontrado</h1>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container-fluid p-5">
                <p className="fs-6 fw-bolder">Carrera/ Nombre_Proyecto/ Año</p>
                <h1 className="display-3 fw-bold">{proyecto.titulo}</h1>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <p className="fs-4 fw-light ms-font mt-3 mb-4">{proyecto.usuarios.nombre_completo}</p>
                    <div className="d-flex justify-content-end mb-3">
                        {user.rol === "coordinador" && 
                            <>
                                <button className="btn btn-outline-dark rounded-circle me-3 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 20H19V18H5M19 9H15V3H9V9H5L12 16L19 9Z" fill="#6E7377" />
                                    </svg>
                                </button>
                                <button className="btn btn-outline-dark rounded-circle me-3 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M20.71 7.04006C21.1 6.65006 21.1 6.00006 20.71 5.63006L18.37 3.29006C18 2.90006 17.35 2.90006 16.96 3.29006L15.12 5.12006L18.87 8.87006M3 17.2501V21.0001H6.75L17.81 9.93006L14.06 6.18006L3 17.2501Z" fill="#6E7377" />
                                    </svg>
                                </button>
                                <button className="btn btn-outline-dark rounded-circle me-3 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 20" fill="none">
                                        <path d="M15.2917 1.66667H11.6458L10.6042 0.625H5.39583L4.35417 1.66667H0.708334V3.75H15.2917M1.75 17.2917C1.75 17.8442 1.96949 18.3741 2.36019 18.7648C2.7509 19.1555 3.2808 19.375 3.83333 19.375H12.1667C12.7192 19.375 13.2491 19.1555 13.6398 18.7648C14.0305 18.3741 14.25 17.8442 14.25 17.2917V4.79167H1.75V17.2917Z" fill="#6E7377"/>
                                    </svg>
                                </button>
                            </>
                        }
                        {user.rol === "profesor" && 
                            <>
                                <button className="btn btn-outline-dark rounded-circle me-3 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 20H19V18H5M19 9H15V3H9V9H5L12 16L19 9Z" fill="#6E7377" />
                                    </svg>
                                </button>
                            </>
                        }
                    </div>
                </div>
                <div className="row">
                    <Image className="col" src={proyecto.portada.startsWith('http') ? proyecto.portada : `https://api.reservorio-u-tad.com${proyecto.portada}`} objectFit="cover" width={0} height={0} sizes="100vw" style={{ width: '65%', height: 'auto' }} alt="Project Image" />
                    <p className="col fs-5 ms-regular">{proyecto.ficha}</p>
                </div>
                <div className="row g-4 card-group mt-5">
                    {userProjects.length > 0 && (
                        <div className="col-12">
                            <h2 className="ms-black">Tus proyectos</h2>
                            <div className="row g-4">
                                {userProjects.map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick}/>)}
                            </div>
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    <hr className="w-50" />
                    <button className="w-25 btn btn-outline-secondary rounded-pill">Ver más +</button>
                    <hr className="w-50" />
                </div>
                <div className="row g-4 card-group mt-5">
                    {otherProjects.length > 0 && (
                        <div className="col-12">
                            <h2 className="ms-black">Otros proyectos</h2>
                            <div className="row g-4">
                                {otherProjects.map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick}/>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}