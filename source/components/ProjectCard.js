import Image from 'next/image';
import "@/styles/project-card.css";
import {useState} from "react";

export default function ProjectCard({project, onClick, isHome = false}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isShown, setIsShown] = useState(false);

    const handleHover = (hover) => {
        setIsHovered(hover && isHome);
        setTimeout(() => {
            setIsShown(hover && isHome);
        }, 100);
    }

    const processMail = (mail) => {
        const mailParts = mail.split('@');
        return mailParts[1] === "live.u-tad.com" || mailParts[1] === "u-tad.com" || mailParts[1] === "ext.u-tad.com" ? mailParts[0].split('.').map(text => [text[0].toUpperCase(), text.slice(1)].join("")).join(" ") : mail;
    }

    return (
        <div className="col col-lg-3 col-sm-6 col-12 col-md-4 mb-4" style={{height: 340}}>
            <div className="project-card position-relative shadow card border-0 rounded h-100" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onClick={() => onClick(project.id)}>
                {project.premiado &&
                    <div className="bg-primary rounded position-absolute top-0 end-0 z-3 p-2">
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 17 20" fill="none">
                            <path
                                d="M16.8904 17.37L12.8804 16L11.5004 20L8.42035 14L5.50035 20L4.12035 16L0.110352 17.37L3.03035 11.37C2.07035 10.17 1.50035 8.65 1.50035 7C1.50035 5.14348 2.23785 3.36301 3.5506 2.05025C4.86336 0.737498 6.64384 0 8.50035 0C10.3569 0 12.1373 0.737498 13.4501 2.05025C14.7629 3.36301 15.5004 5.14348 15.5004 7C15.5004 8.65 14.9304 10.17 13.9704 11.37L16.8904 17.37ZM3.50035 7L6.19035 8.34L6.00035 11.34L8.50035 9.68L11.0004 11.33L10.8304 8.34L13.5004 7L10.8204 5.65L11.0004 2.67L8.50035 4.31L6.00035 2.65L6.17035 5.66L3.50035 7Z"
                                fill="white"/>
                        </svg>
                    </div>
                }
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
                    <p className="card-text text-secondary-emphasis">
                        {isHovered && isHome && project.participantes.length > 0
                            ? project.participantes.map(participante => processMail(participante.correo)).join(', ')
                            : project.usuarios.nombre_completo
                        }
                    </p>
                    {isHovered && isShown && isHome &&
                        <p className="card-text text-secondary-emphasis">
                            {project.ficha.slice(0, 100) + (project.ficha.length > 100 ? "..." : "")}
                        </p>
                    }
                    {
                        project.estado === 'rechazado'
                            ? <span className="badge bg-danger">Rechazado</span>
                            : project.estado === 'pendiente'
                                ? <span className="badge bg-warning">Pendiente</span>
                                : null
                    }
                </div>
            </div>
        </div>
    )
}