"use client"

import { useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/NavBar';
import '../styles/signin-styles.css';
import Image from 'next/image'; // Importa la etiqueta <Image> de Next.js

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
            window.location.href = '/home';
        } else {
            setErrorMessage('Email o contraseña incorrectos');
        }
    };

    return (
        <div className="container">
            <div className="split-container">
                <div className="form-container">
                    <div className="text-container">
                        <h1>Iniciar Sesión con el Correo de U-tad</h1>
                        <p className="subtext">El desarrollo de proyectos es una carta de presentación de los conocimientos, experiencia y capacidad de trabajo en equipo.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo Electrónico"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                        <p><Link href="/recover"><span>¿Has olvidado la contraseña? </span></Link></p>
                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                        <p>¿Aún no tienes cuenta? <Link href="/signup">¡Inscríbete ahora!</Link></p>
                    </form>
                </div>
                <div className="image-container">
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
