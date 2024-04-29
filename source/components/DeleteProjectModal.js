import {useState} from "react"

import Loading from "@/components/Loading"
import "../styles/Signup.css"
import {eliminar_proyecto} from "@/api/v1/proyectos";

export default function DeleteProjectModal({project, show, setShow}) {
    const
        [loading, setLoading] = useState(false)

    if (loading) return <Loading/>

    const handleDeleteProject = async () => {
        const token = localStorage.getItem('token');
        const data = await eliminar_proyecto(token, project.id);
        if (data) history.back();
    }

    return (
        <>
            <div className={`${show ? 'd-block' : 'd-none'} position-fixed z-2 w-100 h-100 backdrop`}></div>

            <div className={`${show ? 'd-block' : 'd-none'} d-flex flex-column gap-3 justify-content-between align-items-center align-items-xl-end position-fixed top-50 start-50 translate-middle rounded shadow-lg background-color-secundario-blanco z-3 overflow-y-auto`} style={{maxWidth: '40.5625rem', maxHeight: '16.75rem'}}>
                <div className={'d-flex flex-column flex-md-row flex-nowrap align-items-center align-items-md-start gap-3 px-5 pt-5'}>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                            <path
                                d="M21.45 21.45H17.55V9.75H21.45M21.45 29.25H17.55V25.35H21.45M19.5 0C16.9392 0 14.4035 0.504382 12.0377 1.48435C9.67182 2.46432 7.52216 3.90068 5.71142 5.71142C2.05446 9.36838 0 14.3283 0 19.5C0 24.6717 2.05446 29.6316 5.71142 33.2886C7.52216 35.0993 9.67182 36.5357 12.0377 37.5157C14.4035 38.4956 16.9392 39 19.5 39C24.6717 39 29.6316 36.9455 33.2886 33.2886C36.9455 29.6316 39 24.6717 39 19.5C39 16.9392 38.4956 14.4035 37.5157 12.0377C36.5357 9.67182 35.0993 7.52216 33.2886 5.71142C31.4778 3.90068 29.3282 2.46432 26.9623 1.48435C24.5965 0.504382 22.0608 0 19.5 0Z"
                                fill="#091229"/>
                        </svg>
                    </p>

                    <div>
                        <p class={'ms-bold-body'}>
                            Estás a punto de eliminar un proyecto.
                            ¿Estás seguro de que quieres eliminarlo?
                        </p>
                        <p class={'ms-regular-subbody'}>
                            Una vez eliminado no podrás recuperarlo...
                        </p>
                    </div>
                </div>

                <div className={'d-flex flex-row justify-content-end gap-3 w-100 p-3'}>
                    <button className="btn btn-primary ms-button color-secundario-negro background-color-secundario-blanco p-2" style={{width: '11rem'}} onClick={() => setShow(false)}>Cancelar</button>
                    <button className="btn btn-primary ms-button color-secundario-blanco background-color-principal p-2" style={{width: '11rem'}} onClick={handleDeleteProject}>Eliminar</button>
                </div>
            </div>
        </>
    )
}