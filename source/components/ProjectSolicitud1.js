import Image from 'next/image';
import "@/styles/project-card.css";
import { useState } from "react";

export default function ProjectSolicitud1({ project, handleAceptar, handleRechazar}) {

    return (
        <div className="col col-lg-3 col-sm-6 col-12 col-md-4 mb-4" style={{ height: 340 }}>
            <div className="position-relative shadow card border-0 rounded h-100">
                <div id="imageSize" className="position-relative">
                    <Image
                        src={project.portada.startsWith('http') ? project.portada : `https://api.reservorio-u-tad.com${project.portada}`}
                        className="card-image-top w-100 h-100 position-relative object-fit-cover border rounded-top"
                        layout="fill"
                        alt="Project Image"
                    />
                </div>
                <div className="card-body d-flex flex-column justify-content-start">
                    <h5 className="card-title fw-bold">{project.titulo}</h5>
                    <button onClick={() => handleAceptar(project.id)} className="nav-link text-dark active">Aceptar</button>
                    <button onClick={() => handleRechazar(project.id)} className="nav-link text-dark active">Rechazar</button>
                </div>
            </div>
        </div>
    )
}