"use client"

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signup } from '@/api/v1/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener el alias del correo electrónico (parte antes del @)
    const alias = email.substring(0, email.indexOf('@'));

    // Redireccionar a la página de registro de contraseña con el correo electrónico y el alias como parámetros en la URL
    router.push({
      pathname: '/signup/password',
      query: { email: email, alias: alias }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="form-container col-12 col-xl-4 align-self-center px-5 mt-5">
          <h1 className="display-3 ms-extrabold">Crear cuenta</h1>
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control py-2"
                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                required
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-5">
              {/* Botón "Atrás" */}
              <button className="btn btn-secondary" onClick={() => router.push('/signin')} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#091229" />
                </svg>
              </button>
              {/* Botón "SIGUIENTE" */}
              <button className="btn btn-primary w-40 btn-lg" type="submit">
                SIGUIENTE
              </button>
            </div>
          </form>
          <p className="text-center mt-5">
            <span>
              ¿Ya tienes una cuenta?{" "}
              <Link href="/signin">
                <a className="link-underline-dark link-dark fw-bold">Iniciar sesión</a>
              </Link>
            </span>
          </p>
        </div>
        <div className="d-none d-xl-inline col-xl-8">
          <div className="bg-image-main"></div>
        </div>
      </div>
    </div>
  );
}
