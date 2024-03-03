"use client"
// pages/recover/password.js
import { useState } from 'react';
import Link from 'next/link'; // Importa la etiqueta <Link> de Next.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/password-styles.css';

const RecoverPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        // Contraseña restablecida correctamente
        // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setErrorMessage('An unexpected error occurred');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Recuperar contraseña</h2>
      <p className="mb-4">Crear una nueva contraseña</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">Nueva contraseña:</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Repetir nueva contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Recuperar</button>
        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RecoverPasswordPage;
