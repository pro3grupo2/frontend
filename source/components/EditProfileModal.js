import React, {useEffect, useRef, useState} from "react"

import Image from "next/image"

import {useAuth} from "@/context/authContext"

import {subir_ficheros} from "@/api/v1/proyectos"

import Loading from "@/components/Loading"

import "../styles/Signup.css"

export default function EditProfileModal({show, setShow}) {
    const {usuario, token, account_update} = useAuth()

    const
        [portfolio, setPortfolio] = useState(''),
        [descripcion, setDescripcion] = useState(''),
        [foto_perfil, setFotoPerfil] = useState(''),
        [loading, setLoading] = useState(false)

    const
        input_foto_perfil_ref = useRef(null)

    useEffect(() => {
        setPortfolio(usuario.portfolio)
        setDescripcion(usuario.descripcion)
        setFotoPerfil(usuario.foto)
    }, [usuario])

    const handleSubmit = async () => {
        if (!token) return setLoading(false)

        await account_update(undefined, undefined, descripcion, portfolio, undefined, undefined, () => alert('Error al actualizar el perfil'))
        setLoading(false)
        setShow(false)
    }

    if (loading) return <Loading/>

    return (
        <>
            <div className={`${show ? 'd-block' : 'd-none'} position-fixed z-2 w-100 h-100 backdrop`}></div>

            <div className={`${show ? 'd-block' : 'd-none'} d-flex flex-column flex-xl-row gap-5 justify-content-between align-items-center align-items-xl-stretch position-fixed top-50 start-50 translate-middle rounded shadow-lg background-color-secundario-blanco z-3 w-75 h-75 p-5 overflow-y-auto`} style={{maxWidth: '73.5rem', maxHeight: '38.625rem'}}>
                <div className={'clickable position-relative w-100 h-100'} style={{maxWidth: '30.625rem'}} onClick={() => input_foto_perfil_ref.current.click()}>
                    <Image className={"rounded"} src={foto_perfil?.startsWith('http') ? foto_perfil : `https://api.reservorio-u-tad.com${foto_perfil ?? '/files/0/fcc5ccaf95f83cba44186b36a2fadde4.jpeg'}`} objectFit={'cover'} width={0} height={0} fill sizes={'1'} alt={foto_perfil}/>
                    <Image src="/icons/Editar.svg" width={32} height={32} className="position-absolute top-0 end-0 rounded p-1 m-2" style={{backgroundColor: 'var(--color-principal)'}} alt="Edit"/>
                </div>

                <input ref={input_foto_perfil_ref} className="d-none form-control" type="file" style={{zIndex: -1}} accept="image/x-png,image/gif,image/jpeg" onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        if (!token) return setLoading(false)

                        subir_ficheros(token, null, e.target.files[0] ?? null)
                            .then(data => {
                                if (!data) return
                                account_update(undefined, undefined, undefined, undefined, data.portada !== 'null' ? data.portada : undefined, undefined, () => alert('Error al subir la imagen'))
                            })
                    }
                }}/>

                <div className="flex-grow-1 d-flex flex-column justify-content-between">

                    <div className="w-100" style={{maxWidth: 488}}>
                        <button type="button" className="btn-close position-absolute top-0 end-0 p-3" aria-label="Close" onClick={() => setShow(false)}/>

                        <label className=" ms-bold-body">Portfolio <span className="color-error">*</span></label>
                        <div class="input-group mb-3" style={{height: 48, maxWidth: 488}}>
                            <span class="input-group-text border-normal fw-semibold">Enlace URL</span>
                            <input type="text" className="form-control border-normal " placeholder="Pega tu link aqui." value={portfolio} onChange={(e) => setPortfolio(e.target.value.slice(0, 190))}/>
                        </div>
                        <div class="position-relative mb-3">
                            <label className="form-label ms-bold-body">Descripción <span className="color-error">*</span></label>
                            <textarea className="form-control border-normal" style={{height: 147, maxWidth: 488}} placeholder="Descripción del proyecto " rows={6} value={descripcion} onChange={(e) => setDescripcion(e.target.value.slice(0, 140))}></textarea>
                            <span className={`position-absolute bottom-0 end-0 ms-regular-subbody m-3 ${140 - descripcion?.length <= 50 && 'color-error'}`}>{descripcion?.length}/140</span>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end gap-3">
                        <button className="btn ms-button color-secundario-gris FW-BOLD background-color-secundario-blanco p-2" onClick={() => setShow(false)}>Cancelar</button>
                        <button className="btn btn-primary ms-button fw-bold color-secundario-blanco background-color-principal p-2 w-100" style={{maxWidth: '15.6rem', minHeight: 48}} onClick={handleSubmit}>Guardar</button>
                    </div>
                </div>
            </div>
        </>
    )
}