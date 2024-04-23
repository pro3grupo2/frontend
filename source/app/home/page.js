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
    const [area, setArea] = useState('0');
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');
    const [asignatura, setAsignatura] = useState("-1");
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
            setProyectosLoaded(true);
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        get_proyectos(token, 0, filters).then(data => {
            setProjects(data);
        }).catch(console.error);
    }, [filters]);

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

    const handleAnio = (anio) => {
        if (anio === "null") {
            setFilters(prevFilters => {
                const { anio, ...restFilters } = prevFilters;
                return { ...restFilters };
            });
            return;
        }

        setFilters({...filters, anio: anio});
    }

    const handleAreaClick = (id) => {
        let oldArea = document.getElementById(area);
        let newArea = document.getElementById(id.toString());

        oldArea.classList.remove('active');
        newArea.classList.add('active');

        setArea(id.toString());
        if (id === '0') {
            setFilters(prevFilters => {
                const { area, ...restFilters } = prevFilters;
                return { ...restFilters };
            });
            return;
        }
        setFilters({...filters, area: id.toString()});
    };

    const handleCardClick = (id) => {
        router.push(`/project/${id}`);
    };

    const onSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleAsignatura = (clase) => {
        let titulacion = clase.toString();
        
        if (titulacion === "-1") {
            setFilters(prevFilters => {
                const { titulaciones, ...restFilters } = prevFilters;
                return { ...restFilters };
            });
            return;
        }
        
        setFilters({...filters, titulaciones: titulacion});
    }
    
    const handlePremio = (premiado) => {
        if (premiado === "null") {
            setFilters(prevFilters => {
                const { premiado, ...restFilters } = prevFilters;
                return { ...restFilters };
            });
            return;
        }
    
        setFilters({...filters, premiado: premiado == "true"});
    }

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            if (search === '') {
                delete filters.busqueda;
                setFilters({...filters});
                return;
            }

            setFilters({...filters, busqueda: search});   
        }
    };

    if (projects.length === 0) {
        return (
            <div className="container-fluid p-5">
                <Filters onSearchChange={onSearchChange} handleSearch={handleSearch} handleAreaClick={handleAreaClick} handlePremio={handlePremio} handleAnio={handleAnio} handleAsignatura={handleAsignatura}/>

                <div className="container-fluid text-center d-flex flex-column justify-content-center align-items-center mt-5">
                    <h1 className="display-5 fw-bold w-50">Ups! No hemos encontrado resultados para su búsqueda.</h1>
                    <p className="lead mt-3">Comprueba el nombre del proyecto o el correo de los autores.</p>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="container-fluid p-5">
                    <Filters onSearchChange={onSearchChange} handleSearch={handleSearch} handleAreaClick={handleAreaClick} handlePremio={handlePremio} handleAnio={handleAnio} handleAsignatura={handleAsignatura}/>

                    <div className="row g-4 card-group mt-3">
                        {projects.map(project => <ProjectCard key={project.id} project={project} onClick={handleCardClick}/>)}
                    </div>
                </div>

                <div onClick={() => window.scrollTo(window.scrollY, 0)} className="position-fixed bottom-0 end-0 btn btn-primary rounded-circle me-3 mb-3" style={{width: 50 + 'px', height: 50 + 'px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-100 h-100" width="40" height="40" viewBox="0 0 32 32" fill="none">
                        <path d="M17.3338 26.6666H14.6671V10.6666L7.33376 18L5.44043 16.1066L16.0004 5.54663L26.5604 16.1066L24.6671 18L17.3338 10.6666V26.6666Z" fill="white"/>
                    </svg>
                </div>
            </>
        );
    }
}