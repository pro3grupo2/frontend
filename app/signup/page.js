"use client"

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signup } from '@/api/v1/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email) {
      try {
        // Llamada a la función signup para registrar el correo electrónico
        const alias = email.substring(0, email.indexOf('@'));
        await signup(email, alias); // Enviar correo electrónico y alias al servidor
  
        // Redireccionar a la página de registro de contraseña con el correo electrónico y alias como parámetros en la URL
        router.push({
          pathname: '/signup/password',
          query: { email: email, alias: alias }
        });
      } catch (error) {
        console.error("Error al registrar el correo electrónico:", error);
      }
    } else {
      console.error("El correo electrónico está vacío");
    }
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
              <button className="btn btn-secondary" onClick={() => router.push('/signin')} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#091229" />
                </svg>
              </button>
              <button className="btn btn-primary w-40 btn-lg" type="submit">
                SIGUIENTE
              </button>
            </div>
          </form>
          <p className="text-center mt-5">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/signin">
              <span className="link-underline-dark link-dark fw-bold">Iniciar sesión</span>
            </Link>
          </p>
        </div>
        <div className="d-none d-xl-inline col-xl-8">
          <div className="bg-image-main"></div>
        </div>
      </div>
    </div>
  );
}
