"use client"
// pages/signin.js
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirigir a la página principal u otra página después de iniciar sesión
        window.location.href = '/';
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
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignInPage;
