"use client"
// pages/signin.js
import { useState } from 'react';
import Link from 'next/link'; // Importa la etiqueta <Link> de Next.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';

const { signin } = require('../../api/sign');

const SignInPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = { correo: email, password: password };
		const token = await signin(body);

		if (token) {
			localStorage.setItem('token', token);
			window.location.href = '/';
		} else {
			setErrorMessage('Email o contraseña incorrectos');
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
				<div className="mb-3">
					{/* Cambia el elemento <a> por <span> */}
					<p><Link href="/recover"><span>¿Has olvidado la contraseña? </span></Link></p>
				</div>
			</form>
		</div>
	);
};

export default SignInPage;
