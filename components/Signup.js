import Link from 'next/link';
import { useState } from 'react';

const PasoInicio = ({ setNextPaso, setPreviousPaso, setEmail }) => {
    const [email, setEmailLocal] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmailLocal(value);
        setEmail(value);
    };

    const handleEmailFocus = () => {
        setEmailError(false);
    };

    const handleNextClick = () => {
        const isValidEmail = email.includes('@');
        setEmailError(!isValidEmail); 
        if (isValidEmail) {
            setNextPaso();
        }
    };

    return (
        <>
            <div className="d-flex flex-row flex-grow-1 justify-content-evenly align-items-center">
                <div className="flex-shrink- px-5 mx-xl-5 w-100" style={{ height: '90%' }}>
                    <div className="d-flex flex-column justify-content-between h-100">
                        <div className="pb-4 mt-5">
                            <h1 className="display-4 ms-extrabold">Crear cuenta</h1>
                            <p className="d-none fs-5 d-sm-block lead">
                                Indícanos cuál es tu correo asociado a la U-tad.
                            </p>
                        </div>
                        <div>
                            <input
                                type="email"
                                className="form-control py-3 fs-5"
                                onChange={handleEmailChange}
                                onFocus={handleEmailFocus}
                                placeholder="Correo Electrónico"
                                style={{ border: emailError ? '3px solid var(--color-error)' : `3px solid #091229` }}
                                required
                                autoComplete="off"
                                value={email}
                            />
                            <div className="d-flex justify-content-between mt-5">
                                <Link href="/signin">
                                    <button className="btn btn-outline-primary" type="button" style={{width: '60px', height: '60px'}} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                                            <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#091229" />
                                        </svg>
                                    </button>
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleNextClick}
                                    className="btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-3 fw-bold">
                                    Siguiente
                                </button>
                            </div>
                        </div>
                        
                        <div className="col-12 text-center mb-5">
                            <span className="pe-1 fs-5">¿Ya tienes una cuenta?</span>
                            <Link className="link-underline-dark link-dark fw-bold fs-5 ps-1" href="/signin">Iniciar sesión</Link>
                        </div>
                    </div>
                </div>
                <div className="d-none d-xl-block w-100" style={{ maxWidth: '5%' }}></div>
                <div className="d-none d-xl-block bg-image-main w-100" style={{ maxWidth: '50%' }}></div>
            </div>
        </>
    );
};


const Paso1 = ({setNextPaso, setPreviousPaso, setPassword}) => {
    return (
        <div className="input-group mb-3 px-0" style={{
            width: "75%", borderRadius: '0.25rem',
            backgroundColor: "var(--color-secundario-gris-claro-extra)", border: '3px solid transparent'
        }}>
            <input
                type="text"
                className="form-control py-3 fs-5"
                style={{border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)"}}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                autoComplete="off"
            />

            <button
                type="button"
                onClick={setPreviousPaso}
                className="w-100 btn btn-primary border-5 py-2 fs-1 fw-bold">
                Volver
            </button>

            <button
                type="button"
                onClick={setNextPaso}
                className="w-100 btn btn-primary border-5 py-2 fs-1 fw-bold">
                Siguiente
            </button>
        </div>
    )
}

const Paso2 = ({setNextPaso, setPreviousPaso, setRol}) => {
    return (
        <div className="input-group mb-3 px-0" style={{
            width: "75%", borderRadius: '0.25rem',
            backgroundColor: "var(--color-secundario-gris-claro-extra)", border: '3px solid transparent'
        }}>
            <input
                type="text"
                className="form-control py-3 fs-5"
                style={{border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)"}}
                onChange={(e) => setRol(e.target.value)}
                placeholder="Rol"
                required
                autoComplete="off"
            />

            <button
                type="button"
                onClick={setPreviousPaso}
                className="w-100 btn btn-primary border-5 py-2 fs-1 fw-bold">
                Volver
            </button>

            <button
                type="button"
                onClick={setNextPaso}
                className="w-100 btn btn-primary border-5 py-2 fs-1 fw-bold">
                Siguiente
            </button>
        </div>
    )
}

const Paso3 = ({setNextPaso, setPreviousPaso, setNombreCompleto, setTitulacion}) => {
    return (
        <div className="input-group mb-3 px-0" style={{
            width: "75%", borderRadius: '0.25rem',
            backgroundColor: "var(--color-secundario-gris-claro-extra)", border: '3px solid transparent'
        }}>
            <input
                type="text"
                className="form-control py-3 fs-5"
                style={{border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)"}}
                onChange={(e) => setNombreCompleto(e.target.value)}
                placeholder="Nombre Completo"
                required
                autoComplete="off"
            />

            <input
                type="number"
                className="form-control py-3 fs-5"
                style={{border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)"}}
                onChange={(e) => setTitulacion(e.target.value)}
                placeholder="Titulación"
                required
                autoComplete="off"
            />

            <button
                type="button"
                onClick={setPreviousPaso}
                className="w-100 btn btn-primary border-5 py-2 fs-1 fw-bold">
                Volver
            </button>

            <button
                type="button"
                onClick={setNextPaso}
                className="w-100 btn btn-primary border-5 py-2 fs-1 fw-bold">
                Siguiente
            </button>
        </div>
    )
}

const PasoFin = ({setNextPaso, setPreviousPaso}) => {
    return (
        <div onClick={setNextPaso}>
            <h1>Fin</h1>
            <button
                type="button"
                onClick={setNextPaso}
                className="w-100 btn btn-primary border-5 py-2 fs-1 fw-bold">
                Registrar
            </button>

            <button
                type="button"
                onClick={setPreviousPaso}
                className="w-100 btn btn-primary border-5 py-2 fs-1 fw-bold">
                Volver
            </button>
        </div>
    )
}

module.exports = {
    PasoInicio,
    Paso1,
    Paso2,
    Paso3,
    PasoFin
}