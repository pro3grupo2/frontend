"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { signup } from '../../api/sign';
import '../styles/signup-styles.css';



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
        <div className="container">
            <div className="split-container">
                <div className="form-container">
                    <div className="text-container">
                        <h1>Configura tu cuenta</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="mb-3">
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                id="alias"
                                className="form-control"
                                placeholder="Alias"
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                id="recoveryPhrase"
                                className="form-control"
                                placeholder="Frase de recuperación"
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
                <div className="image-container">
                    {/* Aquí puedes añadir una imagen si deseas */}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;