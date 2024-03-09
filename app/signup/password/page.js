"use client"
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { signup } from '@/api/v1/auth';

export default function SignUpPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { email, alias, type_user } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const data = await signup(email, password, alias); // Utilizando la función de registro con el correo electrónico, contraseña y alias
    console.log(data);
    router.push({
      pathname: '/signup/type_user',
      query: { email, alias, type_user }
    }); // Redirigir a la página de tipo de usuario con la consulta adicional
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="form-container col-12 col-xl-4 align-self-center px-3 ">
          <div>
            <h1 className="display-3 ms-extrabold">Crear contraseña</h1>
            <p className="lead py-2 mb-4">
              Crea una contraseña segura para tu cuenta.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="py-3">
              <input
                type="password"
                id="password"
                className="form-control py-3"
                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                autoComplete="new-password"
              />
            </div>
            <div className="py-3">
              <input
                type="password"
                id="confirmPassword"
                className="form-control py-3"
                style={{ backgroundColor: "var(--secundario-gris-claro)" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar Contraseña"
                required
                autoComplete="new-password"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-5">
              {/* Botón "Atrás" */}
              <Link href="/signup">
                <button className="btn btn-secondary" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                    <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#091229" />
                  </svg>
                </button>
              </Link>

              {/* Botón "Siguiente" */}
              <button className="btn btn-primary w-40 btn-lg" type="submit">
                SIGUIENTE
              </button>
            </div>
          </form>
          <p className="text-center mt-5">
            <span>
              ¿Recuerdas tu contraseña?{" "}
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
