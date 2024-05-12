import {useEffect, useState} from "react"

import Image from 'next/image'

import {placeholder} from "@/api/v1/image_placeholder"
import {EMAIL_TERMINATIONS} from "@/utils/validation"

import "@/styles/project-card.css"

export default function ProjectCard({project, onClick, isHome = false}) {
    const [isHovered, setIsHovered] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [src, setSrc] = useState(placeholder())
    const [blurUrl, setBlurUrl] = useState(placeholder())

    useEffect(() => {
        setSrc(project.portada.startsWith('http') ? project.portada : `https://api.reservorio-u-tad.com${project.portada}`)
        setIsLoaded(true)
    }, [project])

    const handleHover = (hover) => {
        setIsHovered(hover && isHome)
        setTimeout(() => {
            setIsShown(hover && isHome)
        }, 100)
    }

    const processMail = (mail) => {
        const mailParts = mail.split('@')
        return EMAIL_TERMINATIONS.includes(mailParts[1]) ? mailParts[0].split('.').map(text => text.charAt(0).toUpperCase() + text.slice(1)).join(" ") : mail
    }

    return (
        <div className="clickable col col-lg-3 col-sm-6 col-12 col-md-4 mb-4" style={{height: '18rem'}}>
            <div className="project-card position-relative shadow card border-0 rounded h-100" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onClick={() => onClick(project.id)}>
                {
                    project.premiado &&
                    <div className="position-absolute top-0 end-0 z-1 p-2" style={{borderRadius: '0rem 0.5rem', backgroundColor: "var(--color-principal)"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.39 19.37L16.38 18L15 22L11.92 16L8.99999 22L7.61999 18L3.60999 19.37L6.52999 13.37C5.56999 12.17 4.99999 10.65 4.99999 9C4.99999 7.14348 5.73748 5.36301 7.05024 4.05025C8.36299 2.7375 10.1435 2 12 2C13.8565 2 15.637 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14348 19 9C19 10.65 18.43 12.17 17.47 13.37L20.39 19.37ZM6.99999 9L9.68999 10.34L9.49999 13.34L12 11.68L14.5 13.33L14.33 10.34L17 9L14.32 7.65L14.5 4.67L12 6.31L9.49999 4.65L9.66999 7.66L6.99999 9Z"
                                  fill="white"/>
                        </svg>
                    </div>
                }
                {
                    project.estado !== 'aceptado'
                    &&
                    <div className="position-absolute top-0 start-0 z-1 px-3 py-2" style={{borderRadius: '0.5rem 0rem', backgroundColor: project.estado === 'rechazado' ? "var(--color-error)" : "var(--color-pendiente)"}}>
                        <p className={'ms-bold-body color-secundario-blanco m-0 p-0'}>
                            {
                                project.estado === 'rechazado'
                                    ?
                                    'RECHAZADO'
                                    :
                                    'PENDIENTE'
                            }
                        </p>
                    </div>
                }
                <div id="imageSize" className="position-relative">
                    <Image
                        src={src}
                        className="card-image-top w-100 h-100 position-relative object-fit-cover border rounded-top"
                        layout="fill"
                        placeholder="blur"
                        blurDataURL={blurUrl}
                        alt="Project Image"
                    />
                </div>
                <div className={`card-body d-flex flex-column ${isHovered && isShown && isHome ? "justify-content-around" : "justify-content-between"} ${!isLoaded && "placeholder-glow"}`}>
                    <div>
                        <h5 className={`card-title fw-bold ${!isLoaded && "placeholder"}`}>{project.titulo}</h5>
                        <p className={`card-text text-secondary ms-font pt-1 ${!isLoaded && "placeholder"}`}>
                            {
                                [project.usuarios.nombre_completo, ...project.participantes.map(participante => participante.correo)]
                                    .map(processMail)
                                    .reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])
                                    .slice(0, !isHovered ? 2 : undefined)
                                    .join(', ')
                            }
                        </p>
                    </div>
                    {
                        isHovered
                        && isShown
                        && isHome
                        &&
                        <p className={`card-text text-secondary overflow-hidden ms-regular ${!isLoaded && "d-none"}`} style={{height: '2.5rem'}}>
                            {project.ficha.slice(0, 127).trim()}{project.ficha.length > 127 && '...'}
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}