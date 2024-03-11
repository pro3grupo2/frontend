"use client"

import { useState } from "react";

export default function RolePage() {
    const [selectedUser, setSelectedUser] = useState('');
    
    const handleSelectUser = (user) => {
        setSelectedUser(user);
    }

    return (
        <div className="container-fluid">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-12 col-xl-4 px-5 mt-5">
                    <h1 className="display-3 ms-extrabold text-center">Reservorio U-tad personalizado para ti!</h1>
                    <p className='mb-0'>Paso 2 de 3. ¿Quién eres?</p>
                    <div className="d-flex justify-content-center mt-5">
                        <button
                            className={`btn btn-primary me-3 ${selectedUser === 'alumno' && 'active'}`}
                            onClick={() => handleSelectUser('alumno')}
                        >
                            Alumno
                        </button>
                        <button
                            className={`btn btn-primary ${selectedUser === 'profesor' && 'active'}`}
                            onClick={() => handleSelectUser('profesor')}
                        >
                            Profesor
                        </button>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <button className="btn btn-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                            </svg>

                        </button>

                        <button className="btn btn-primary" disabled={!selectedUser}>
                            SIGUIENTE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}