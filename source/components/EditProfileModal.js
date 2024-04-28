import React, {useEffect, useState} from "react"

import Image from "next/image"

import {update} from "@/api/v1/account"
import Loading from "@/components/Loading"
import "../styles/Signup.css"

export default function EditProfileModal({show, setShow, default_user_data}) {
    const
        [portfolio, setPortfolio] = useState(''),
        [descripcion, setDescripcion] = useState(''),
        [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(default_user_data)
        setPortfolio(default_user_data.portfolio)
        setDescripcion(default_user_data.descripcion)
    }, [default_user_data])

    const handleSubmit = async () => {
        setLoading(true)
        const token = localStorage.getItem('token')
        const data = await update(token, undefined, undefined, descripcion, portfolio, undefined, undefined)
        setLoading(false)
        if (data) window.location.reload()
    }

    if (loading) return <Loading/>

    return (
        <>
            <div className={`${show ? 'd-block' : 'd-none'} position-fixed z-0 w-100 h-100 backdrop`}></div>

            <div className={`${show ? 'd-block' : 'd-none'} d-flex flex-column flex-xl-row gap-5 justify-content-between align-items-center align-items-xl-stretch position-fixed top-50 start-50 translate-middle rounded shadow-lg background-color-secundario-blanco z-1 w-75 h-75 p-5 overflow-y-auto`} style={{maxWidth: '73.5rem', maxHeight: '38.625rem'}}>
                <div className={'position-relative w-100 h-100'} style={{maxWidth: '30.625rem'}}>
                    <Image className={"rounded"} src={default_user_data.foto} objectFit={'cover'} width={0} height={0} fill sizes={'1'} alt={default_user_data.foto}/>
                </div>

                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                    <div className="w-100">
                        <button type="button" className="btn-close position-absolute top-0 end-0 p-3" aria-label="Close" onClick={() => setShow(false)}/>


                        <label className=" ms-regular-black">Link <span className="color-error">*</span></label>
                        <div class="input-group mb-3">
                            <span class="input-group-text border-normal fw-semibold">Enlace URL</span>
                            <input type="text" className="form-control border-normal " placeholder="Pega tu link aqui." value={portfolio} onChange={(e) => setPortfolio(e.target.value)}/>
                        </div>
                        <div class="mb-3">
                            <label className="form-label ms-regular-black">Descripción <span className="color-error">*</span></label>
                            <textarea className="form-control border-normal" placeholder="Descripción del proyecto " rows={6} value={descripcion} onChange={(e) => setDescripcion(e.target.value.slice(0, 140))}></textarea>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end gap-3">
                        <button className="btn btn-primary btn-font color-secundario-blanco background-color-principal p-2" onClick={handleSubmit}>Editar perfil</button>
                    </div>
                </div>
            </div>
        </>
    )
}