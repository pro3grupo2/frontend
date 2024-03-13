import Link from 'next/link';
import { handleClientScriptLoad } from 'next/script';
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


const Paso1 = ({ setNextPaso, setPreviousPaso, setPassword }) => {
    const [password, setPasswordValue] = useState('');
    const [confirmPassword, setConfirmPasswordValue] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPasswordValue(e.target.value);
        setPasswordError('');
    };

    const handleNextClick = () => {
        if (password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }

        setNextPaso();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (

        <div className="d-flex flex-row flex-grow-1 justify-content-evenly align-items-center">
            <div className="px-5 mx-xl-5 mt-0">
                <div className="pb-5 ">
                    <h1 className="display-5 custom-bold">Termina de configurar<br></br> tu cuenta</h1>
                    <p className="d-none fs-5 d-sm-block lead">
                        Paso 1 de 3. Crea una contraseña para continuar
                    </p>
                </div>
                <form className='row row-gap m-0'>
                    <div className="input-group mb-3 px-0" style={{ width: "65%" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            className="form-control py-3 fs-5"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Contraseña"
                            required
                            autoComplete="off"
                        />
                        <span className="input-group-text" onClick={togglePasswordVisibility}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" fill="black" />
                            </svg>
                        </span>
                    </div>
                    <div className='input-group mb-3 px-0' style={{ width: "65%" }}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id='confirmPassword'
                            className="form-control py-3 fs-5"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Repetir Contraseña"
                            required
                            autoComplete="off"
                        />
                        <span className="input-group-text" onClick={toggleConfirmPasswordVisibility}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" fill="black" />
                            </svg>
                        </span>
                    </div>
                    {passwordError && (
                        <div className="text-danger mb-3">{passwordError}</div>
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <button
                            type="button"
                            onClick={setPreviousPaso}
                            className="btn btn-outline-primary"
                            style={{ width: '48px', height: '48px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                                <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#091229" />
                            </svg>
                        </button>
                        <div className="d-flex justify-content-center" style={{ flexGrow: 1 }}>
                            <button
                                type="button"
                                onClick={handleNextClick}
                                className="btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold">
                                SIGUIENTE
                            </button>
                        </div>
                    </div>

                </form>
            </div>
            <div className="d-none d-xl-block w-100" style={{ maxWidth: '5%' }}></div>
            <div className="d-none d-xl-block bg-image-main w-100" style={{ maxWidth: '50%' }}></div>
        </div>
    )
}

const Paso2 = ({ setNextPaso, setPreviousPaso, setRol }) => {
    const [selectedType, setSelectedType] = useState('');

    const handleTypeSelection = (type) => {
        setSelectedType(type);
    };

    const handleNextClick = () => {
        if (selectedType) {
            setRol(selectedType);
            setNextPaso();
        } else {
            
            alert('Debes seleccionar un tipo de usuario');
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="col-12 col-md-5">
                <h1 className="display-5 custom-bold text-center text-md-start mb-4">Reservorio U-tad <br></br> personalizado para ti!</h1>
                <p className="fs-5 lead text-center text-md-start mb-4">
                    Paso 2 de 3. ¿Quién eres?
                </p>

                <div className="row justify-content-center justify-content-md-between mb-4">
                    <div className="col-6 col-md-auto mb-3 mb-md-0">
                        <button
                            className={`custom-button w-100 ${selectedType === 'Tipo1' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Tipo1')}>
                            <svg width="130" height="129" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle id="Ellipse 9" cx="65" cy="64.1468" r="64.1468" fill={selectedType === 'Tipo1' ? 'var(--color-principal)' : '#D9D9D9'} />
                            </svg>
                            <h3 className="text-center">Tipo de usuario 1</h3>
                        </button>
                    </div>
                    <div className="col-6 col-md-auto">
                        <button
                            className={`custom-button w-100 ${selectedType === 'Tipo2' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Tipo2')}>
                            <svg width="130" height="129" viewBox="0 0 130 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle id="Ellipse 9" cx="65" cy="64.1468" r="64.1468" fill={selectedType === 'Tipo2' ? 'var(--color-principal)' : '#D9D9D9'} />
                            </svg>
                            <h3 className="text-center">Tipo de usuario 2</h3>
                        </button>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <button
                        type="button"
                        onClick={setPreviousPaso}
                        className="btn btn-outline-primary"
                        style={{ width: '48px', height: '48px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                            <path d="M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z" fill="#091229" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={handleNextClick}
                        className="btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold">
                        SIGUIENTE
                    </button>
                </div>
            </div>
        </div>

    );
};







const Paso3 = ({ setNextPaso, setPreviousPaso, setNombreCompleto, setTitulacion }) => {
    return (
        <div className="input-group mb-3 px-0" style={{
            width: "75%", borderRadius: '0.25rem',
            backgroundColor: "var(--color-secundario-gris-claro-extra)", border: '3px solid transparent'
        }}>
            <input
                type="text"
                className="form-control py-3 fs-5"
                style={{ border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)" }}
                onChange={(e) => setNombreCompleto(e.target.value)}
                placeholder="Nombre Completo"
                required
                autoComplete="off"
            />

            <input
                type="number"
                className="form-control py-3 fs-5"
                style={{ border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)" }}
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

const PasoFin = ({ setNextPaso, setPreviousPaso }) => {
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