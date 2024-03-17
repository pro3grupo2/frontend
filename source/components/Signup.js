import Link from 'next/link';
import React, {useEffect, useState} from 'react';

import {EstructuraFormularios} from '@/components/Estructura';

const ControladorSiguienteAtras = ({setNextPaso, setPreviousPaso}) => {
    return (
        <div className='d-flex justify-content-between aligns-items-center mt-5 m-0'>
            <button
                type='button'
                onClick={setPreviousPaso}
                className='btn btn-outline-primary'
                style={{width: '48px', height: '48px'}}>
                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16'
                     fill='none'>
                    <path
                        d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z'
                        fill='#091229'/>
                </svg>
            </button>
            <button
                type='button'
                onClick={setNextPaso}
                className='btn btn-primary btn-color-primary btn-outline-primary border-5 fs-5 fw-bold'>
                SIGUIENTE
            </button>
        </div>
    )
}

const PasoInicio = ({setNextPaso, setPreviousPaso, setEmail, mailEnviado}) => {
    const [email, setEmailLocal] = useState(mailEnviado || '');
    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (mailEnviado) {
            setEmailLocal(mailEnviado);
            setEmail(mailEnviado);
        }
    }, [mailEnviado, setEmail]);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmailLocal(value);
        setEmail(value);
        setEmailError(false);
        setErrorMessage('');
    };

    const handleEmailFocus = () => {
        setEmailError(false);
        setErrorMessage('');
    };

    const handleNextClick = () => {
        const isValidEmailFormat = validateEmailFormat(email);
        if (!isValidEmailFormat) {
            setEmailError(true);
            setErrorMessage('Ingrese correctamente su correo de U-tad.');
            return;
        }
        setNextPaso();
    };

    const validateEmailFormat = (email) => {
        const pattern = /^\w+\.\w+@(?:\w+\.)*u-tad\.com$/;

        return pattern.test(email);
    };

    return (
        <EstructuraFormularios>
            <div className='d-flex flex-column justify-content-evenly h-100'>
                <div>
                    <h1 className='display-5 custom-bold'>Crear cuenta</h1>
                    <p className='d-none fs-5 d-sm-block lead'>
                        Indícanos cuál es tu correo asociado a la U-tad.
                    </p>
                </div>

                <div>
                    <input
                        type='email'
                        className='form-control py-3 fs-5'
                        onChange={handleEmailChange}
                        onFocus={handleEmailFocus}
                        placeholder=' Correo electrónico'
                        style={{border: emailError ? '3px solid var(--color-error)' : '3px solid var(--color-secundario-gris-claro)'}}
                        required
                        autoComplete='off'
                        value={email}
                    />
                    {
                        emailError
                            ?
                            (
                                <div className='text-danger mt-2'>{errorMessage}</div>
                            )
                            :
                            (
                                // Espacio reservado para el mensaje de error sin alterar el layout
                                <div className='mt-2' style={{height: '1.5em'}}></div>
                            )
                    }

                    <ControladorSiguienteAtras setNextPaso={handleNextClick} setPreviousPaso={setPreviousPaso}/>
                </div>

                <div className='text-center pt-5'>
                    <span className='pe-1 fs-5'>¿Ya tienes una cuenta?</span>
                    <Link className='link-underline-dark link-dark fw-bold fs-5 ps-1' href='/signin'>Iniciar
                        sesión</Link>
                </div>
            </div>
        </EstructuraFormularios>
    )
}

const Paso1 = ({setNextPaso, setPreviousPaso, setPassword, passwordEnviado}) => {
    const [password, setPasswordValue] = useState(passwordEnviado || '');
    const [confirmPassword, setConfirmPasswordValue] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (passwordEnviado) {
            setPasswordValue(passwordEnviado);
            setPassword(passwordEnviado);
        }
    }, [passwordEnviado, setPassword]);

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

        // Verificar si la contraseña cumple con los requisitos
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial');
            return;
        }

        setPassword(password);
        setNextPaso();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleFocus = () => {
        setPasswordError(''); // O podría ser setPasswordError(false) dependiendo de cómo desees manejar el estado de error.
    };

    return (
        <EstructuraFormularios>
            <div className='d-flex flex-column justify-content-evenly h-100'>
                <div>
                    <h1 className='display-5 custom-bold'>Termina de configura tu cuenta</h1>
                    <p className='d-none fs-5 d-sm-block lead'>
                        Paso 1 de 3. Crea una contraseña para continuar
                    </p>
                </div>

                <div>
                    <div className='input-group mb-3'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            className="form-control py-3 fs-5 "
                            value={password}
                            onChange={handlePasswordChange}
                            onFocus={handleFocus}
                            placeholder='Contraseña'
                            required
                            autoComplete='off'
                            style={{border: passwordError ? '3px solid var(--color-error)' : '3px solid var(--color-secundario-gris-claro)'}}
                        />

                        <span className='input-group-text' onClick={togglePasswordVisibility}>
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z'
                                            fill='black'/>
                                    </svg>
                                </span>
                    </div>

                    <div className='input-group'>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            className={`form-control py-3 fs-5 `}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            onFocus={handleFocus}
                            placeholder='Repetir Contraseña'
                            required
                            autoComplete='off'
                            style={{border: passwordError ? '3px solid var(--color-error)' : '3px solid var(--color-secundario-gris-claro)'}}
                        />
                        <span className='input-group-text' onClick={toggleConfirmPasswordVisibility}>
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z'
                                            fill='black'/>
                                    </svg>
                                </span>
                    </div>

                    {
                        passwordError
                            ?
                            (
                                <div className='text-danger mt-2'>{passwordError}</div>
                            )
                            :
                            (
                                <div className='mt-2' style={{height: '1.5em'}}></div>
                            )
                    }
                </div>

                <ControladorSiguienteAtras setNextPaso={handleNextClick} setPreviousPaso={setPreviousPaso}/>
            </div>
        </EstructuraFormularios>
    )
}

const Paso2_user = ({setNextPaso, setPreviousPaso, setRol}) => {
    const [selectedType, setSelectedType] = useState('');

    const handleTypeSelection = (type) => {
        if (type === 'Alumno') {
            setRol('alumno');
        } else if (type === 'Alumni') {
            setRol('alumni');
        }
        setSelectedType(type);
    };

    const handleNextClick = () => {
        if (selectedType) {
            setNextPaso();
        } else {
            alert('Debes seleccionar un tipo de usuario');
        }
    };

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center mt-5'>
            <h1 className='display-5 custom-bold text-center text-md-start mb-4'>Reservorio U-tad personalizado para ti!</h1>
            <p className='fs-5 lead text-center text-md-start mb-4'>
                Paso 2 de 3. ¿Quién eres?
            </p>

            <div className='d-flex flex-column justify-content-center w-50 h-100'>
                <div className="d-flex flex-row justify-content-between">
                    <button
                        className={`custom-button ${selectedType === 'Alumno' ? 'selected' : ''}`}
                        onClick={() => handleTypeSelection('Alumno')}>
                        <svg className="d-none d-md-block"
                             width='130' height='129' viewBox='0 0 130 129' fill='none'
                             xmlns='http://www.w3.org/2000/svg'>
                            <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468'
                                    fill={selectedType === 'Alumno' ? 'var(--color-principal)' : '#D9D9D9'}/>
                        </svg>
                        <h3 className='text-center'>Alumno</h3>
                    </button>

                    <button
                        className={`custom-button ${selectedType === 'Alumni' ? 'selected' : ''}`}
                        onClick={() => handleTypeSelection('Alumni')}>
                        <svg className="d-none d-md-block"
                             width='130' height='129' viewBox='0 0 130 129' fill='none'
                             xmlns='http://www.w3.org/2000/svg'>
                            <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468'
                                    fill={selectedType === 'Alumni' ? 'var(--color-principal)' : '#D9D9D9'}/>
                        </svg>
                        <h3 className='text-center'>Alumni</h3>
                    </button>
                </div>

                <ControladorSiguienteAtras setNextPaso={handleNextClick} setPreviousPaso={setPreviousPaso}/>
            </div>
        </div>
    )
}

const Paso2_teacher = ({setNextPaso, setPreviousPaso, setRol}) => {
    const [selectedType, setSelectedType] = useState('');

    const handleTypeSelection = (type) => {
        if (type === 'Profesor') {
            setRol('profesor');
        } else if (type === 'Coordinador') {
            setRol('coordinador');
        } else if (type === 'Departamentos') {
            setRol('departamentos');
        }
        setSelectedType(type);
    };

    const handleNextClick = () => {
        if (selectedType) {
            setNextPaso();
        } else {
            alert('Debes seleccionar un tipo de usuario');
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
            <h1 className='display-5 custom-bold text-center mb-4'>Reservorio U-tad <br/> personalizado para ti! </h1>
            <p className='fs-5 lead text-center mb-4'> Paso 2 de 3. ¿Quién eres? </p>

            <div className="d-flex flex-column justify-content-center w-50 h-100">
                <div className='d-flex flex-row flex-wrap flex-xl-nowrap justify-content-center justify-content-xl-between'>
                    <button
                        className={`custom-button ${selectedType === 'Profesor' ? 'selected' : ''}`}
                        onClick={() => handleTypeSelection('Profesor')}>
                        <svg className="d-none d-md-block"
                             width='130' height='129' viewBox='0 0 130 129' fill='none'
                             xmlns='http://www.w3.org/2000/svg'>
                            <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468'
                                    fill={selectedType === 'Profesor' ? 'var(--color-principal)' : '#D9D9D9'}/>
                        </svg>
                        <h3 className='text-center'>Profesor</h3>
                    </button>

                    <button
                        className={`custom-button ${selectedType === 'Coordinador' ? 'selected' : ''}`}
                        onClick={() => handleTypeSelection('Coordinador')}>
                        <svg className="d-none d-md-block"
                             width='130' height='129' viewBox='0 0 130 129' fill='none'
                             xmlns='http://www.w3.org/2000/svg'>
                            <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468'
                                    fill={selectedType === 'Coordinador' ? 'var(--color-principal)' : '#D9D9D9'}/>
                        </svg>
                        <h3 className='text-center'>Coordinador</h3>
                    </button>

                    <button
                        className={`custom-button ${selectedType === 'Departamentos' ? 'selected' : ''}`}
                        onClick={() => handleTypeSelection('Departamentos')}>
                        <svg className="d-none d-md-block"
                             width='130' height='129' viewBox='0 0 130 129' fill='none'
                             xmlns='http://www.w3.org/2000/svg'>
                            <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468'
                                    fill={selectedType === 'Departamentos' ? 'var(--color-principal)' : '#D9D9D9'}/>
                        </svg>
                        <h3 className='text-center'>Departamentos</h3>
                    </button>
                </div>

                <ControladorSiguienteAtras setNextPaso={handleNextClick} setPreviousPaso={setPreviousPaso}/>
            </div>
        </div>
    )
}

const Paso_coordinador = ({setNextPaso, setPreviousPaso, setNombreCompleto, email}) => {

    const [digit1, setDigit1] = useState('');
    const [digit2, setDigit2] = useState('');
    const [digit3, setDigit3] = useState('');
    const [digit4, setDigit4] = useState('');
    const [codigo, setCodigo] = useState('');

    const handleDigitChange = (e) => {
        const {name, value} = e.target;
        const newVal = value.charAt(value.length - 1);
        switch (name) {
            case 'digit1':
                setDigit1(newVal);
                break;
            case 'digit2':
                setDigit2(newVal);
                break;
            case 'digit3':
                setDigit3(newVal);
                break;
            case 'digit4':
                setDigit4(newVal);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const completeCode = digit1 + digit2 + digit3 + digit4;
        setCodigo(completeCode);
    }, [digit1, digit2, digit3, digit4]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setNombreCompleto(`${formData.name} ${formData.lastName}`);

    };

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center mt-5'>
            <h1 className='display-5 custom-bold text-center mb-4'>Paso intermedio: Confirmación de rol</h1>
            <p className='fs-5 lead text-center mb-4'>Por favor, introduzca el código que un administrador le ha
                proporcionado previamente:</p>

            <div className='d-flex flex-column justify-content-center w-50 h-100'>
                <div className='d-flex flex-row justify-content-between'>
                    {[digit1, digit2, digit3, digit4].map((digit, index) => (
                        <input
                            key={`digit-${index + 1}`}
                            type='text'
                            name={`digit${index + 1}`}
                            value={digit}
                            onChange={handleDigitChange}
                            maxLength={1} // Restringe la entrada a un solo carácter
                            className='form-control'
                            autoComplete="off" // Evita la autocompletación del navegador
                            style={{
                                height: '50px', // Establece la altura para que sea cuadrada
                                width: '50px', // Establece el ancho igual a la altura para mantener la forma cuadrada
                                margin: '5px', // Añade un poco de margen para separar los inputs
                                textAlign: 'center', // Centra el texto horizontalmente
                            }}
                        />
                    ))}
                </div>

                <ControladorSiguienteAtras setNextPaso={handleSubmit} setPreviousPaso={setPreviousPaso}/>
            </div>
        </div>
    )
}

// CONTINUAR POR AQUI

const Paso3_user = ({setNextPaso, setPreviousPaso, setNombreCompleto, email}) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [formData, setFormData] = useState({});

    const procesarCorreo = (correo) => {
        const partes = correo.split('@');
        const alias = partes[0];
        const nombreApellido = partes[0].split('.');
        let nombre = nombreApellido[0];
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        let apellido = nombreApellido[1];
        apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);

        setNombre(nombre);
        setApellido(apellido);
        setFormData({
            name: nombre,
            title: '',
            specialty: '',
            lastName: apellido,
        })
    };

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            name: nombre,
            lastName: apellido
        }));
    }, [nombre, apellido]);

    useEffect(() => {
        procesarCorreo(email);
    }, [email]);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleCheckboxChange = (e) => {
        setFormData({...formData, terms: e.target.checked});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNombreCompleto(`${formData.name} ${formData.lastName}`);
    };

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className='display-5 custom-bold text-center mb-4'>Paso 3 de 3: Rellenar datos</h1>
                    <p className='fs-5 lead text-center mb-4'>Por favor, completa los siguientes campos:</p>
                    <form onSubmit={handleSubmit} className='w-100'>
                        <div className="row">
                            <div className="col">
                                <div className='mb-3'>
                                    <input type='text' name='name' value={formData.name} placeholder='Nombre'
                                           className='form-control' disabled/>
                                </div>
                            </div>
                            <div className="col">
                                <div className='mb-3'>
                                    <input type='text' name='lastName' value={formData.lastName} placeholder='Apellido'
                                           className='form-control' disabled/>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <select name='title' value={formData.title} onChange={handleInputChange}
                                    className='form-select'>
                                <option value=''>Titulación</option>
                                <option value='Grado'>Grado</option>
                                <option value='Postgrado'>Postgrado</option>
                                <option value='Ciclo Formativo'>Ciclo Formativo</option>
                                <option value='Titulos Propios'>Titulos Propios</option>
                                <option value='Otros Cursos'>Otros Cursos</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select name='specialty' value={formData.specialty} onChange={handleInputChange}
                                    className='form-select'>
                                <option value=''>Área</option>
                                <option value='DIDI'>DIDI</option>
                                <option value='INSO'>INSO</option>
                                <option value='ANIM'>ANIM</option>
                                <option value='DIPI'>DIPI</option>
                                <option value='MAIS'>MAIS</option>
                                <option value='ANIM3D'>ANIM3D</option>
                                <option value='DAM'>DAM</option>
                            </select>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-outline-primary' onClick={setPreviousPaso}
                                    style={{minWidth: '0', width: '48px', height: '48px'}}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16'
                                     fill='none'>
                                    <path
                                        d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z'
                                        fill='#091229'/>
                                </svg>
                            </button>
                            <button type='submit' onClick={setNextPaso}
                                    className='btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold'>CREAR
                                CUENTA
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Paso3_alumni = ({setNextPaso, setPreviousPaso, setNombreCompleto, email}) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [formData, setFormData] = useState({});

    const procesarCorreo = (correo) => {
        const partes = correo.split('@');
        const alias = partes[0];
        const nombreApellido = partes[0].split('.');
        let nombre = nombreApellido[0];
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        let apellido = nombreApellido[1];
        apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);

        setNombre(nombre);
        setApellido(apellido);
        setFormData({
            name: nombre,
            title: '',
            specialty: '',
            lastName: apellido,
        })
    };

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            name: nombre,
            lastName: apellido
        }));
    }, [nombre, apellido]);

    useEffect(() => {
        procesarCorreo(email);
    }, [email]);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleCheckboxChange = (e) => {
        setFormData({...formData, terms: e.target.checked});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNombreCompleto(`${formData.name} ${formData.lastName}`);
    };

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className='display-5 custom-bold text-center mb-4'>Paso 3 de 3: Rellenar datos</h1>
                    <p className='fs-5 lead text-center mb-4'>Por favor, completa los siguientes campos:</p>
                    <form onSubmit={handleSubmit} className='w-100'>
                        <div className="row">
                            <div className="col">
                                <div className='mb-3'>
                                    <input type='text' name='name' value={formData.name} placeholder='Nombre'
                                           className='form-control' disabled/>
                                </div>
                            </div>
                            <div className="col">
                                <div className='mb-3'>
                                    <input type='text' name='lastName' value={formData.lastName} placeholder='Apellido'
                                           className='form-control' disabled/>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <input type='text' name='anio' value={formData.name} placeholder='Año Graduación'
                                   className='form-control'/>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-outline-primary' onClick={setPreviousPaso}
                                    style={{minWidth: '0', width: '48px', height: '48px'}}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16'
                                     fill='none'>
                                    <path
                                        d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z'
                                        fill='#091229'/>
                                </svg>
                            </button>
                            <button type='submit' onClick={setNextPaso}
                                    className='btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold'>CREAR
                                CUENTA
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Paso3_teacher = ({setNextPaso, setPreviousPaso, setNombreCompleto, email}) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [formData, setFormData] = useState({});

    const procesarCorreo = (correo) => {
        const partes = correo.split('@');
        const alias = partes[0];
        const nombreApellido = partes[0].split('.');
        let nombre = nombreApellido[0];
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        let apellido = nombreApellido[1];
        apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);

        setNombre(nombre);
        setApellido(apellido);
        setFormData({
            name: nombre,
            title: '',
            specialty: '',
            lastName: apellido,
        })
    };

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            name: nombre,
            lastName: apellido
        }));
    }, [nombre, apellido]);

    useEffect(() => {
        procesarCorreo(email);
    }, [email]);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleCheckboxChange = (e) => {
        setFormData({...formData, terms: e.target.checked});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNombreCompleto(`${formData.name} ${formData.lastName}`);
    };

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className='display-5 custom-bold text-center mb-4'>Paso 3 de 3: Rellenar datos</h1>
                    <p className='fs-5 lead text-center mb-4'>Por favor, completa los siguientes campos:</p>
                    <form onSubmit={handleSubmit} className='w-100'>
                        <div className="row">
                            <div className="col">
                                <div className='mb-3'>
                                    <input type='text' name='name' value={formData.name} placeholder='Nombre'
                                           className='form-control' disabled/>
                                </div>
                            </div>
                            <div className="col">
                                <div className='mb-3'>
                                    <input type='text' name='lastName' value={formData.lastName} placeholder='Apellido'
                                           className='form-control' disabled/>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <select name='title' value={formData.title} onChange={handleInputChange}
                                    className='form-select'>
                                <option value=''>Especialidad</option>
                                <option value='Especialidad1'>Especialidad1</option>
                                <option value='Especialidad2'>Especialidad2</option>
                                <option value='Especialidad3'>Especialidad3</option>
                                <option value='Especialidad4'>Especialidad4</option>
                                <option value='Otros Especialidad'>Otros Especialidad</option>
                            </select>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-outline-primary' onClick={setPreviousPaso}
                                    style={{minWidth: '0', width: '48px', height: '48px'}}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16'
                                     fill='none'>
                                    <path
                                        d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z'
                                        fill='#091229'/>
                                </svg>
                            </button>
                            <button type='submit' onClick={setNextPaso}
                                    className='btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold'>CREAR
                                CUENTA
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Paso3_departamento = ({setNextPaso, setPreviousPaso, setNombreCompleto, email}) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [formData, setFormData] = useState({});

    const procesarCorreo = (correo) => {
        const partes = correo.split('@');
        const alias = partes[0];
        const nombreApellido = partes[0].split('.');
        let nombre = nombreApellido[0];
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        let apellido = nombreApellido[1];
        apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);

        setNombre(nombre);
        setApellido(apellido);
        setFormData({
            name: nombre,
            title: '',
            specialty: '',
            lastName: apellido,
        })
    };

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            name: nombre,
            lastName: apellido
        }));
    }, [nombre, apellido]);

    useEffect(() => {
        procesarCorreo(email);
    }, [email]);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleCheckboxChange = (e) => {
        setFormData({...formData, terms: e.target.checked});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNombreCompleto(`${formData.name} ${formData.lastName}`);
    };

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className='display-5 custom-bold text-center mb-4'>Paso 3 de 3: Rellenar datos</h1>
                    <p className='fs-5 lead text-center mb-4'>Por favor, completa los siguientes campos:</p>
                    <form onSubmit={handleSubmit} className='w-100'>
                        <div className="row">
                            <div className="col">
                                <div className='mb-3'>
                                    <input type='text' name='name' value={formData.name} placeholder='Nombre'
                                           className='form-control' disabled/>
                                </div>
                            </div>
                            <div className="col">
                                <div className='mb-3'>
                                    <input type='text' name='lastName' value={formData.lastName} placeholder='Apellido'
                                           className='form-control' disabled/>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <select name='title' value={formData.title} onChange={handleInputChange}
                                    className='form-select'>
                                <option value=''>Departamento</option>
                                <option value='Departamento1'>Departamento1</option>
                                <option value='Departamento2'>Departamento2</option>
                                <option value='Departamento3'>Departamento3</option>
                                <option value='Departamento4'>Departamento4</option>
                                <option value='Otros Departamento'>Otros Departamento</option>
                            </select>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-outline-primary' onClick={setPreviousPaso}
                                    style={{minWidth: '0', width: '48px', height: '48px'}}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16'
                                     fill='none'>
                                    <path
                                        d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z'
                                        fill='#091229'/>
                                </svg>
                            </button>
                            <button type='submit' onClick={setNextPaso}
                                    className='btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold'>CREAR
                                CUENTA
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const PasoFin = ({setNextPaso, setPreviousPaso}) => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-start text-center px-5'
             style={{minHeight: '60vh', margin: '50px auto'}}>
            <button
                className='btn btn-outline-primary position-absolute start-0'
                onClick={setPreviousPaso}
                style={{width: '48px', height: '48px', margin: '20px'}}
            >
                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16' fill='none'>
                    <path d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z'
                          fill='#091229'/>
                </svg>
            </button>
            <div className="container">
                <h1 className='display-5 custom-bold text-center mb-3'>¡Proceso de inscripción finalizado!</h1>
                <p className='fs-5 lead text-center mb-4'>
                    El desarrollo de proyectos es una parte fundamental de la <br></br>formación nuestros alumnos y
                    alumnas, y es también una <br></br> carta de presentación de tus conocimientos, experiencia
                    y <br></br> capacidad de trabajo en equipo.
                    ¡Descubre aquí el talento U-tad!
                </p>
                <button
                    type='button'
                    onClick={setNextPaso}
                    className='btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold mb-4'>
                    VER PROYECTOS
                </button>
            </div>
        </div>
    );
};


module.exports = {
    PasoInicio,
    Paso1,
    Paso2_user,
    Paso2_teacher,
    Paso_coordinador,
    Paso3_user,
    Paso3_alumni,
    Paso3_teacher,
    Paso3_departamento,
    PasoFin
}