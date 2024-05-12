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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16 0C15.1 0 14 1 14 2H6C6 1 4.9 0 4 0H0V9C0 10 1 11 2 11H4.2C4.6 13 5.9 14.7 9 15V17.08C6 17.54 6 20 6 20H14C14 20 14 17.54 11 17.08V15C14.1 14.7 15.4 13 15.8 11H18C19 11 20 10 20 9V0H16ZM4 9H2V2H4V9ZM18 9H16V2H18V9Z"
                                  fill="white"/>
                        </svg>
                    </div>
                }
                {
                    project.estado !== 'aceptado'
                    &&
                    <div className="position-absolute top-0 start-0 z-1 p-2" style={{borderRadius: '0.5rem 0rem', backgroundColor: project.estado === 'rechazado' ? "var(--color-error)" : "var(--color-titulacion-anim3d)"}}>
                        {
                            project.estado === 'rechazado'
                                ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M17.6568 7.75736L13.4142 12L17.6568 16.2426L16.2426 17.6569L12 13.4142L7.75735 17.6569L6.34313 16.2426L10.5858 12L6.34313 7.75736L7.75735 6.34315L12 10.5858L16.2426 6.34315L17.6568 7.75736Z"
                                          fill="white"/>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 20H11V8L5.50002 13.5L4.08002 12.08L12 4.16L19.92 12.08L18.5 13.5L13 8V20Z"
                                          fill="white"/>
                                </svg>
                        }
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
                            {project.ficha}
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}