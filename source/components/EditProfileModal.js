import {useEffect, useState} from "react"

import Image from "next/image"

import {update} from "@/api/v1/account"
import Loading from "@/components/Loading"

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
            <div className={`${show ? 'd-block' : 'd-none'} position-fixed z-0 w-100 h-100`}></div>

            <div className={`${show ? 'd-block' : 'd-none'} d-flex flex-column flex-xl-row gap-5 align-items-center align-items-xl-stretch position-fixed top-50 start-50 translate-middle rounded shadow background-color-secundario-blanco z-1 w-75 h-75 p-5`}>
                <div className="position-relative w-50 h-100">
                    <Image className="rounded" src={default_user_data.foto} alt='' fill/>
                </div>

                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                    <div className="w-100">
                        <div class="mb-3">
                            <label className="form-label ms-regular-black">Link <span className="color-error">*</span></label>
                            <input type="text" className="form-control" value={portfolio} onChange={(e) => setPortfolio(e.target.value)}/>
                        </div>
                        <div class="mb-3">
                            <label className="form-label ms-regular-black">Descripción <span className="color-error">*</span></label>
                            <textarea className="form-control" rows={6} value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end gap-3">
                        <button className="btn  btn-font color-secundario-gris-claro background-color-secundario-blanco p-2" onClick={() => setShow(false)}>Cancelar</button>
                        <button className="btn btn-primary btn-font color-secundario-blanco background-color-principal p-2" onClick={handleSubmit}>Editar perfil</button>
                    </div>
                </div>
            </div>
        </>
    )
}