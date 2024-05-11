import {useState} from "react"

import {useAuth} from "@/context/authContext"

import {actualizar_proyecto} from "@/api/v1/proyectos"

import Loading from "@/components/Loading"

import "../styles/Signup.css"

export default function NewPremiosModal({show, setShow, proyecto}) {
    const {token} = useAuth()

    const
        [premio_input, setPremioInput] = useState(''),
        [premios, setPremios] = useState([]),
        [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!token) return
        setLoading(true)

        const data = await actualizar_proyecto(token, proyecto.id, undefined, undefined, undefined, undefined, undefined, undefined, premios, true, undefined)
        setLoading(false)
        if (data) window.location.reload()
    }

    if (loading) return <Loading/>

    return (
        <>
            <div className={`${show ? 'd-block' : 'd-none'} position-fixed z-2 w-100 h-100 backdrop`}></div>

            <div className={`${show ? 'd-block' : 'd-none'} d-flex flex-column gap-5 justify-content-between align-items-center align-items-xl-stretch position-fixed top-50 start-50 translate-middle rounded shadow-lg background-color-secundario-blanco z-3 w-75 p-5 overflow-y-auto`} style={{maxWidth: '40.5625rem', minHeight: '16.75rem'}}>
                <button type="button" className="btn-close position-absolute top-0 end-0 p-3" aria-label="Close" onClick={() => {
                    setPremioInput('')
                    setPremios([])
                    setShow(false)
                }}/>

                <div className={'d-flex flex-column flex-nowrap gap-5'}>
                    <div className="mb-3">
                        <label className="form-label ms-bold-body">Titulo <span className="color-error">*</span></label>
                        <input type="text" className="form-control border-normal" placeholder="Nombre del premio" style={{height: '2.5rem'}} value={premio_input}
                               onChange={(e) => setPremioInput(e.target.value)}
                               onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                       if (!premio_input) return
                                       setPremios([...premios, premio_input])
                                       setPremioInput('')
                                   }
                               }}
                        />
                    </div>

                    {
                        premios.length > 0 &&
                        <div className="mb-3">
                            <label className="form-label ms-bold-body">Premios</label>
                            <div className="d-flex flex-column gap-3">
                                {
                                    premios.map((premio, index) => (
                                        <div key={index} className="d-flex flex-row justify-content-between align-items-center border rounded p-3">
                                            <p className={'ms-regular m-0 p-0'}>{premio}</p>
                                            <button className="btn-close" onClick={() => setPremios(premios.filter((_, i) => i !== index))}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>

                <div className="d-flex flex-row justify-content-end gap-3">
                    <button
                        disabled={premios.length === 0}
                        className="btn btn-primary ms-button color-secundario-blanco background-color-principal p-2" onClick={handleSubmit}>Agregar premios
                    </button>
                </div>
            </div>
        </>
    )
}