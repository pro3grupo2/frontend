"use client"

import {useEffect, useRef, useState} from 'react';
import useAuth from '@/hooks/useAuth';
import {useRouter} from 'next/navigation';
import {crear_proyecto, get_proyectos, subir_ficheros} from '@/api/v1/proyectos';
import ProjectCard from '@/components/ProjectCard';
import {me} from '@/api/v1/auth';
import Loading from '@/components/Loading';
import Filters from '@/components/Filters';

export default function Home() {
    const {user, isLoading} = useAuth();
    const [projects, setProjects] = useState([]);
    const [proyectosLoaded, setProyectosLoaded] = useState(false);
    const [area, setArea] = useState('area-todo');
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');
    const router = useRouter();

    const hiddenFileInput = useRef(null);

    //
    // Filtros aceptados en get_proyectos:
    //  - premiado: 'Type: Bool'
    //  - anio: 'Type: Year (YYYY)
    //  - titulaciones: 'Type: Int, Int, ..., Int'
    //  - busqueda: 'Type: String, Max-Length: 100'
    //
    // Los filtros se pasarán como un diccionario:
    //  {
    //    premiado: true,
    //    anio: 2021,
    //    titulaciones: '1,2,3',
    //    busqueda: 'busqueda'
    //  }
    // Si no se quiere aplicar un filtro, simplemente no se pasa en el diccionario.
    //
    // La llamada a la funcion quedara asi:
    //  get_proyectos(token, 0, {premiado: true, anio: 2021, titulaciones: '1,2,3', busqueda: 'busqueda'})
    //
    useEffect(() => {
        const token = localStorage.getItem('token');
        get_proyectos(token, 0, filters).then(data => {
            setProjects(data);
            setTimeout(() => {
                setProyectosLoaded(true);
            }, 1000);
        });
    }, []);

    if (isLoading || !proyectosLoaded) {
        return <Loading/>
    }

    const handleClick = () => {
        const portadaFile = document.getElementById('portada').files[0];
        const ficheroFile = document.getElementById('fichero').files[0];

        const token = localStorage.getItem('token');
        const data = subir_ficheros(token, ficheroFile, portadaFile).then(data => {
            const proyecto = crear_proyecto(token, `Titulo ${Date.now()}`, "Ficha de descripcion del proyecto comentando de que va", data.url, data.portada, 2024, ["oscar.viudez@live.u-tad.com"], [6], ["Premio 1"], true).then(console.log);
        });
    };

    const handleAreaClick = (id) => {
        let oldArea = document.getElementById(area);
        let newArea = document.getElementById(id);

        oldArea.classList.remove('active');
        newArea.classList.add('active');

        setArea(id);
    };

    const handleCardClick = (id) => {
        router.push(`/project/${id}`);
    };

    const onSearchChange = (event) => {
        setSearch(event.target.value);
        setFilters({...filters, busqueda: event.target.value});
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {           
            if (filters.busqueda === '') {
                delete filters.busqueda;
            }

            const token = localStorage.getItem('token');
            get_proyectos(token, 0, filters).then(data => {
                setProjects(data);
            });
        }
    };

    const killBot = async () => {
        for (let i = 0; i < 100; i++) {
            const data = await me("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sIjoiY29vcmRpbmFkb3IiLCJpYXQiOjE3MTAzNTE5NzMsImV4cCI6MTcxMDQzODM3M30.ppUCX18l3a6NFnym0SK4i0kaniu3eeo-M6V-cISfND4");
        }
    };

    if (projects.length === 0) {
        return (
            <div className="container-fluid p-5">
                <Filters onSearchChange={onSearchChange} handleSearch={handleSearch} handleAreaClick={handleAreaClick}/>

                <div className="text-center mt-5">
                    <h1 className="display-5 fw-bold">No hay proyectos que mostrar</h1>
                    <p className="lead">Parece que no hay proyectos que mostrar en este momento</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container-fluid p-5">
                <Filters onSearchChange={onSearchChange} handleSearch={handleSearch} handleAreaClick={handleAreaClick}/>

                <div className="row g-4 card-group mt-3">
                    {projects.map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick}/>)}
                </div>
            </div>
        );
    }
}