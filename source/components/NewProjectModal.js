import {useEffect, useRef, useState} from "react"

import {get_asignaturas} from "@/api/v1/asignaturas"
import {crear_proyecto, subir_ficheros} from "@/api/v1/proyectos"
import Loading from "@/components/Loading"
import "../styles/Signup.css"

export default function NewProjectModal({show, setShow}) {
    const
        [titulo, setTitulo] = useState(''),
        [ficha, setFicha] = useState(''),
        [portada, setPortada] = useState(''),
        [url, setUrl] = useState(''),
        [anio, setAnio] = useState(2024),
        [participantes, setParticipantes] = useState(''),
        [proyectos_asignaturas, setProyectosAsignaturas] = useState(''),
        [premiado, setPremiado] = useState(false),
        [loading, setLoading] = useState(false)

    const
        [asignaturas, setAsignaturas] = useState([]),
        [input_portada, setInputPortada] = useState(undefined),
        [input_url, setInputUrl] = useState(undefined)

    const
        input_portada_ref = useRef(null),
        input_url_ref = useRef(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return

        get_asignaturas(token)
            .then(data => {
                setAsignaturas(data ?? [])
            })
    }, [])


    const handleSubmit = async () => {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) return

        const data_subida = await subir_ficheros(token, input_url ?? null, input_portada ?? null)
        if (!data_subida) return setLoading(false)

        const data = await crear_proyecto(token, titulo, ficha, data_subida.url !== 'null' ? data_subida.url : url, data_subida.portada !== 'null' ? data_subida.portada : portada, parseInt(anio), participantes ? participantes.split(';') : undefined, proyectos_asignaturas.split(';').map(parseInt), undefined, !!+premiado)
        setLoading(false)
        if (data) window.location.reload()
    }

    if (loading) return <Loading/>

    return (
        <>
            <div className={`${show ? 'd-block' : 'd-none'} position-fixed z-2 w-100 h-100 backdrop`}></div>

            <div className={`${show ? 'd-block' : 'd-none'} d-flex flex-column flex-xl-row gap-5 justify-content-between align-items-center align-items-xl-stretch position-fixed top-50 start-50 translate-middle rounded shadow-lg background-color-secundario-blanco z-3 w-75 h-75 p-5 overflow-y-auto`} style={{maxWidth: 1176, minHeight: 677}}>

                <div className="d-flex flex-column justify-content-between w-100" style={{maxWidth: 488}}>
                    <div>
                        <div className="mb-3">
                            <label className="form-label ms-bold-body">Titulo <span className="color-error">*</span></label>
                            <input type="text" className="form-control border-normal" placeholder=" Título del proyecto" style={{height: 48, maxWidth: 488}} value={titulo} onChange={(e) => setTitulo(e.target.value.slice(0, 190))}/>
                        </div>

                        <div className="position-relative mb-3" style={{maxWidth: 488}}>
                            <label className="form-label ms-bold-body">Descripción <span className="color-error">*</span></label>
                            <textarea className="form-control border-normal" placeholder=" Descripción del proyecto" style={{height: 142, maxWidth: 488}} value={ficha} rows={8} onChange={(e) => setFicha(e.target.value.slice(0, 600))}></textarea>
                            <span className={`position-absolute bottom-0 end-0 ms-regular-subbody m-3 ${600 - ficha?.length <= 50 && 'color-error'}`}>{ficha?.length}/600</span>
                        </div>

                        <div>
                            <div className="mb-3">
                                <label className="form-label ms-bold-body ">Portada de proyecto <span className="color-error">*</span></label>
                                <p className="ms-regular">Esta será la imagen que represente tu trabajo, recomendamos una imagen horizontal.</p>

                            </div>


                            <div className={`form-control border-2 border-dark d-flex align-items-center justify-content-between ${!!portada && 'opacity-25'}`} style={{minHeight: 70, maxWidth: 488, backgroundColor: '#E4EAED', borderStyle: 'dashed',}}
                                 onClick={() => !portada && input_portada_ref.current.click()}>
                                <div>
                                    <p className="ms-bold-subbody mb-0 ">{!!input_portada ? `Archivo "${input_portada.name}" subido.` : 'Selecciona la portada desde tu ordenador.'}</p>
                                    <p className="ms-regular-subbody mb-0  mt-1">Archivos PNG, JPG y WEBP inferiores a 5 MB.</p>
                                </div>

                                <div className="border border-2 border-dark rounded" style={{display: "inline-flex", padding: "14px"}}>
                                    <img src="/icons/file.svg" alt="File Icon" width="20" height="19"/>
                                </div>

                                <input ref={input_portada_ref} className="d-none form-control border-normal" type="file" style={{height: 48, maxWidth: 488, display: "none"}} accept="image/x-png,image/gif,image/jpeg" onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) setInputPortada(e.target.files[0])
                                }}/>
                            </div>


                            <div className="d-flex justify-content-center align-items-center my-4">
                                <div className="linea"></div>
                                <span className="leyenda">or</span>
                                <div className="linea"></div>
                            </div>


                            <div className={`input-group mb-3 ${!!input_portada && 'opacity-25'}`} style={{height: 48, maxWidth: 488}}>
                                <span className="input-group-text border-normal fw-semibold">Enlace URL</span>
                                <input type="text" disabled={!!input_portada} className="form-control border-normal" value={portada} placeholder="Pega tu link aqui." onChange={(e) => {
                                    setInputPortada(undefined)
                                    setPortada(e.target.value)
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-between w-100" style={{maxWidth: 488}}>
                    <button type="button" className="btn-close position-absolute top-0 end-0 p-3" aria-label="Close" onClick={() => setShow(false)}/>
                    <div>
                        <div className="mb-3">
                            <label className="form-label ms-bold-body">Participantes del proyecto</label>
                            <input type="text" className="form-control border-normal" style={{height: 48, maxWidth: 488}} placeholder="Escribe los correos (separados por ;)" value={participantes} onChange={(e) => setParticipantes(e.target.value)}/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label ms-bold-body ">¿A qué asignatura pertenece? <span className="color-error">*</span></label>
                            <select className="form-select border-normal" style={{height: 48, maxWidth: 488}} onChange={(e) => setProyectosAsignaturas(e.target.value)}>
                                <option disabled selected>Asignatura</option>
                                {
                                    asignaturas.map
                                    (
                                        asignatura => asignatura.titulaciones_asignaturas[0] && <option value={asignatura.id}>{asignatura.titulo} ({asignatura.titulaciones_asignaturas[0].titulaciones.areas.titulo})</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="mb-3 d-flex flex-column flex-md-row align-items-start">
                            <div className="me-md-3 mb-md-0 mb-3"> {/* Agregamos clases de margen y ancho para dispositivos más pequeños */}
                                <label className="form-label ms-bold-body">¿Año? <span className="color-error">*</span></label>
                                <input type="number" min={1900} max={new Date().getFullYear()} step={1} className="form-control border-normal" style={{height: 48, maxWidth: 144}} value={anio} onChange={(e) => setAnio(e.target.value)}/>
                            </div>
                            <div>
                                <label className="form-label ms-bold-body mx-md-3">¿Ha obtenido algún premio? <span className="color-error">*</span></label>
                                <select className="form-select border-normal mx-md-3" style={{height: 48, maxWidth: 176}} onChange={(e) => setPremiado(e.target.value)}>
                                    <option disabled selected>Premiado</option>
                                    <option value={0}>No</option>
                                    <option value={1}>Sí</option>
                                </select>
                            </div>
                        </div>


                        <div>
                            <div className="mb-3">
                                <label className="form-label ms-bold-body">Fichero de proyecto <span className="color-error">*</span></label>
                                <p className="ms-regular">Sube el fichero .zip o el enlace de OneDrive donde está subido el proyecto.</p>

                            </div>

                            <div className={`form-control border-2 border-dark d-flex align-items-center justify-content-between ${!!url && 'opacity-25'}`} style={{
                                minHeight: 70, maxWidth: 488, backgroundColor: '#E4EAED',
                                borderStyle: 'dashed'
                            }}
                                 onClick={() => !url && input_url_ref.current.click()}>
                                <div>
                                    <p className="ms-bold-subbody mb-0 ">{!!input_url ? `Archivo "${input_url.name}" subido.` : 'Selecciona el fichero desde tu ordenador.'}</p>
                                    <p className="ms-regular-subbody mb-0  mt-1">Archivo .zip inferior a 5 MB</p>
                                </div>
                                <div className="border border-2 border-dark rounded" style={{display: "inline-flex", padding: "14px"}}>
                                    <img src="/icons/file.svg" alt="File Icon" width="20" height="19"/>
                                </div>

                                <input ref={input_url_ref} className="d-none form-control border-normal" style={{height: 48, maxWidth: 488, display: "none"}} type="file" accept=".zip,.rar,.7zip" onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) setInputUrl(e.target.files[0])
                                }}/>
                            </div>


                            <div className="d-flex justify-content-center align-items-center my-4">
                                <div className="linea"></div>
                                <span className="leyenda">or</span>
                                <div className="linea"></div>
                            </div>

                            <div className={`input-group mb-3 ${!!input_url && 'opacity-25'}`} style={{minHeight: 48, maxWidth: 488}}>
                                <span className="input-group-text border-dark fw-semibold">Enlace URL</span>
                                <input type="text" disabled={!!input_url} className="form-control border-normal" value={url} placeholder="Pega tu link aqui." onChange={(e) => {
                                    setInputUrl(undefined)
                                    setUrl(e.target.value)
                                }}/>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end gap-3">
                        <button className={`
                        ${(!titulo || !ficha || (!portada && !input_portada) || (!url && !input_url) || !proyectos_asignaturas || !anio || !premiado) && 'disabled'}
                        btn btn-primary btn-font fw-bold color-secundario-blanco background-color-principal p-2 w-100`} style={{maxWidth: '15.6rem', minHeight: 48}} onClick={handleSubmit}>SUBIR PROYECTO
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}