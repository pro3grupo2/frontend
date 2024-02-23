"use client"
// pages/recover.js
import { useState } from 'react';
import Link from 'next/link'; // Importa la etiqueta <Link> de Next.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';

const RecoverPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  /* try {
      const response = await fetch('/api/sendRecoveryEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Redirigir a la página de introducir nueva contraseña
        window.location.href = '/recover/password';
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setErrorMessage('An unexpected error occurred');
    }*/
    window.location.href="/recover/password"
  };

  return (
    <div className="container mt-5">
      <h2>¿Has olvidado tu contraseña?</h2>
      <p className="mb-4">Indícanos cuál es tu correo electrónico y te enviaremos un enlace para que puedas recuperar tu contraseña.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Siguiente</button>
        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RecoverPage;
