"use client"
// pages/register.js
import React, { useState } from 'react';
import Link from 'next/link';

const { signup } = require('../../api/sign');

const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alias, setAlias] = useState('');
	const [recoveryPhrase, setRecoveryPhrase] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = { correo: email, nombre_completo: name, alias, password, frase_recuperacion: recoveryPhrase };
		const data = await signup(body);
		console.log(data);
		window.location.href="/";
	};

	return (
		<div className="container mt-5">
			<h2>Registro</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Nombre:</label>
					<input
						type="text"
						className="form-control"
						id="name"
						placeholder="Enter your name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Correo electrónico:</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Contraseña:</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="alias">Alias:</label>
					<input
						type="text"
						className="form-control"
						id="alias"
						placeholder="Enter alias"
						value={alias}
						onChange={(e) => setAlias(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="recoveryPhrase">Recover phrase:</label>
					<input
						type="text"
						className="form-control"
						id="recoveryPhrase"
						placeholder="Enter recovery phrase"
						value={recoveryPhrase}
						onChange={(e) => setRecoveryPhrase(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">Registrarse</button>
				{errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
			</form>
			<div className="mt-3">
				<p>¿Ya tienes una cuenta? <Link href="/signin">Inicia sesión aquí</Link></p>
			</div>
		</div>
	);
};

export default RegisterPage;
