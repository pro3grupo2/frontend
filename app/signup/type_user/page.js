"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { signup } from '@/api/v1/auth';

const TypeUser = () => {
  const [selectedUser, setSelectedUser] = React.useState('');
  const router = useRouter(); 

  const handleSelectUser = (userType) => {
    setSelectedUser(userType);
  };

  const handleNext = () => {
    // Redirigir a la siguiente página con el tipo de usuario seleccionado
    router.push({
      pathname: '/signup/complete',
      query: { type_user: selectedUser }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-12 col-xl-4 px-5 mt-5">
          <h1 className="display-3 ms-extrabold text-center">Reservorio U-tad personalizado para ti!</h1>
          <p className='mb-0'>
          Paso 2 de 3. ¿Quién eres?
          </p>
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
            {/* Botón "Atrás" */}
            <Link href="/signup/password">
              <button className="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#091229" />
                </svg>
              </button>
            </Link>


            {/* Botón "Siguiente" */}
            <button className="btn btn-primary" onClick={handleNext} disabled={!selectedUser}>
              SIGUIENTE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeUser;