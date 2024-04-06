import {useEffect, useState} from "react"

import {get_asignaturas} from "@/api/v1/asignaturas"
import {crear_proyecto, subir_ficheros} from "@/api/v1/proyectos"
import Loading from "@/components/Loading"

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

    useEffect(() => {
        const token = localStorage.getItem('token')
        get_asignaturas(token)
            .then(data => {
                setAsignaturas(data)
            })
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        const token = localStorage.getItem('token')
        let
            url_local = undefined,
            portada_local = undefined

        if (input_portada || input_url) {
            const data_subida = await subir_ficheros(token, input_url, input_portada)
            if (data_subida) {
                if (data_subida.url !== 'null') url_local = data_subida.url
                if (data_subida.portada !== 'null') portada_local = data_subida.portada
            }
        }

        const data = await crear_proyecto(token, titulo, ficha, url_local ?? url, portada_local ?? portada, anio, participantes.split(';'), proyectos_asignaturas.split(';').map(parseInt), undefined, !!premiado)
        setLoading(false)
        if (data) window.location.reload()
    }

    if (loading) return <Loading/>

    return (
        <>
            <div className={`${show ? 'd-block' : 'd-none'} position-fixed z-0 w-100 h-100`}></div>

            <div className={`${show ? 'd-block' : 'd-none'} d-flex flex-column flex-xl-row gap-5 align-items-center align-items-xl-stretch position-fixed top-50 start-50 translate-middle rounded shadow background-color-secundario-blanco z-1 w-75 h-75 p-5 overflow-y-scroll`}>
                <div className="d-flex flex-column justify-content-between w-50">
                    <div>
                        <div class="mb-3">
                            <label className="form-label ms-regular-black">Titulo <span className="color-error">*</span></label>
                            <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                        </div>

                        <div class="mb-3">
                            <label className="form-label ms-regular-black">Descripción <span className="color-error">*</span></label>
                            <textarea className="form-control" value={ficha} rows={8} onChange={(e) => setFicha(e.target.value)}></textarea>
                        </div>

                        <div>
                            <div class="mb-3">
                                <label className="form-label ms-regular-black">Portada de proyecto <span className="color-error">*</span></label>
                                <p className="ms-regular">Esta será la imagen que represente tu trabajo, resalta lo mas destacable.</p>
                                <input className="form-control" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) setInputPortada(e.target.files[0])
                                }}/>
                            </div>

                            <hr/>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Enlace URL</span>
                                <input type="text" className="form-control" value={portada} placeholder="Pega tu link aqui." onChange={(e) => setPortada(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-between w-50">
                    <div>
                        <div class="mb-3">
                            <label className="form-label ms-regular-black">Autor/es del proyecto <span className="color-error">*</span></label>
                            <input type="text" className="form-control" placeholder="Correos separados por ;" value={participantes} onChange={(e) => setParticipantes(e.target.value)}/>
                        </div>

                        <div class="mb-3">
                            <label className="form-label ms-regular-black">¿A qué asignatura pertenece? <span className="color-error">*</span></label>
                            <select className="form-select" onChange={(e) => setProyectosAsignaturas(e.target.value)}>
                                <option selected disabled>Selecciona las asignaturas</option>
                                {
                                    asignaturas.map
                                    (
                                        asignatura => <option value={asignatura.id}>{asignatura.titulo}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div class="mb-3">
                            <label className="form-label ms-regular-black">¿Año? <span className="color-error">*</span></label>
                            <input type="number" min={1900} max={2024} step={1} className="form-control" value={anio} onChange={(e) => setAnio(e.target.value)}/>
                        </div>

                        <div class="mb-3">
                            <label className="form-label ms-regular-black">¿Ha obtenido algún premio? <span className="color-error">*</span></label>
                            <select className="form-select" onChange={(e) => setPremiado(e.target.value)}>
                                <option selected value={0}>No</option>
                                <option value={1}>Si</option>
                            </select>
                        </div>

                        <div>
                            <div class="mb-3">
                                <label className="form-label ms-regular-black">Fichero de proyecto <span className="color-error">*</span></label>
                                <p className="ms-regular">Sube el fichero .zip o el enlace de OneDrive donde está subido el proyecto.</p>
                                <input className="form-control" type="file" accept=".zip,.rar,.7zip" onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) setInputUrl(e.target.files[0])
                                }}/>
                            </div>

                            <hr/>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Enlace URL</span>
                                <input type="text" className="form-control" value={url} placeholder="Pega tu link aqui." onChange={(e) => setUrl(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end gap-3">
                        <button className="btn  btn-font color-secundario-gris-claro background-color-secundario-blanco p-2" onClick={() => setShow(false)}>Cancelar</button>
                        <button className="btn btn-primary btn-font color-secundario-blanco background-color-principal p-2" onClick={handleSubmit}>Subir proyecto</button>
                    </div>
                </div>
            </div>
        </>
    )
}