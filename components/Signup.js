import Link from 'next/link';
import { handleClientScriptLoad } from 'next/script';
import { useState } from 'react';
import styles from '../app/globals.css';

const PasoInicio = ({ setNextPaso, setEmail }) => { 
    const [email, setEmailLocal] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
    
        const { nombre, apellido, alias } = procesarCorreo(email);
        console.log('Nombre:', nombre);
        console.log('Apellido:', apellido);
        console.log('Alias:', alias);
    
        setNextPaso();
    };
    
    const validateEmailFormat = (email) => {
        // Expresión regular para validar el correo
        const pattern = /^\w+\.\w+@(?:\w+\.)*u-tad\.com$/;
    
        // Verificar si el correo coincide con el patrón
        return pattern.test(email);
    };
    
    // La función de procesarCorreo puede ir dentro del componente ya que solo se utiliza aquí.
    const procesarCorreo = (correo) => {
        const partes = correo.split('@');
        const alias = partes[0];
        const nombreApellido = partes[0].split('.');
        const nombre = nombreApellido[0];
        const apellido = nombreApellido[1] ? nombreApellido[1] : '';

        return {
            nombre,
            apellido,
            alias
        };
    };

    return (
        <>
            <div className='d-flex flex-row flex-grow-1 justify-content-evenly align-items-center'>
                <div className='flex-shrink- px-5 mx-xl-5 w-100' style={{ height: '90%' }}>
                    <div className='d-flex flex-column justify-content-between h-100'>
                        <div className='pb-4 mt-5'>
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
                                style={{ border: emailError ? '3px solid var(--color-error)' : '3px solid var(--color-secundario-gris-claro)' }}
                                required
                                autoComplete='off'
                                value={email}
                            />
                            {emailError && (
                                <div className='text-danger mt-2'>{errorMessage}</div>
                            )}
                            <div className='d-flex justify-content-between aligns-items-center mt-5  m-0'>
                                <Link href='/signin'>
                                    <button className='btn btn-outline-primary' type='button' style={{ width: '48px', height: '48px' }} >
                                        <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16' fill='none'>
                                            <path d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z' fill='#091229' />
                                        </svg>
                                    </button>
                                </Link>
                                <button
                                    type='button'
                                    onClick={handleNextClick}
                                    className='btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold'
                                >
                                    SIGUIENTE
                                </button>
                            </div>
                        </div>
                        <div className='col-12 text-center mb-5'>
                            <span className='pe-1 fs-5'>¿Ya tienes una cuenta?</span>
                            <Link className='link-underline-dark link-dark fw-bold fs-5 ps-1' href='/signin'>Iniciar sesión</Link>
                        </div>
                    </div>
                </div>
                <div className='d-none d-xl-block w-100' style={{ maxWidth: '5%' }}></div>
                <div className='d-none d-xl-block bg-image-main w-100' style={{ maxWidth: '50%' }}></div>
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

    return (
        <div className='d-flex flex-row flex-grow-1 justify-content-evenly align-items-center'>
            <div className='px-5 mx-xl-5 mt-0'>
                <div className='pb-5 '>
                    <h1 className='display-5 custom-bold'>Termina de configurar<br></br> tu cuenta</h1>
                    <p className='d-none fs-5 d-sm-block lead'>
                        Paso 1 de 3. Crea una contraseña para continuar
                    </p>
                </div>
                <form className='row row-gap m-0'>
                    <div className='input-group mb-3 px-0' style={{ width: '80%' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            className={`form-control py-3 fs-5 ${passwordError ? 'is-invalid' : ''}`}
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder='Contraseña'
                            required
                            autoComplete='off'
                        />
                        <span className='input-group-text' onClick={togglePasswordVisibility}>
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z' fill='black' />
                            </svg>
                        </span>
                    </div>
                    <div className='input-group mb-3 px-0' style={{ width: '80%' }}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            className={`form-control py-3 fs-5 ${passwordError ? 'is-invalid' : ''}`}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder='Repetir Contraseña'
                            required
                            autoComplete='off'
                        />
                        <span className='input-group-text' onClick={toggleConfirmPasswordVisibility}>
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z' fill='black' />
                            </svg>
                        </span>
                    </div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='300'
                        height='200'
                        viewBox='0 0 300 200'
                        fill='none'
                        style={{ borderColor: passwordError ? 'var(--color-error)' : 'initial' }}
                    >
                        <mask id='path-1-inside-1_32_432' fill='white'>
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M24.4069 0C19.9886 0 16.4069 3.58172 16.4069 8V88.3481L0.61786 94.8773C-0.205953 95.218 -0.205954 96.3848 0.61786 96.7255L16.4069 103.255V187C16.4069 191.418 19.9886 195 24.4069 195H230.383C234.801 195 238.383 191.418 238.383 187V8C238.383 3.58172 234.801 0 230.383 0H24.4069Z'
                            />
                        </mask>
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M24.4069 0C19.9886 0 16.4069 3.58172 16.4069 8V88.3481L0.61786 94.8773C-0.205953 95.218 -0.205954 96.3848 0.61786 96.7255L16.4069 103.255V187C16.4069 191.418 19.9886 195 24.4069 195H230.383C234.801 195 238.383 191.418 238.383 187V8C238.383 3.58172 234.801 0 230.383 0H24.4069Z'
                            fill='white'
                        />
                        <path
                            d='M16.4069 88.3481L16.789 89.2722L17.4069 89.0167V88.3481H16.4069ZM0.61786 94.8773L0.23572 93.9532H0.23572L0.61786 94.8773ZM0.61786 96.7255L0.235719 97.6496H0.235719L0.61786 96.7255ZM16.4069 103.255H17.4069V102.586L16.789 102.331L16.4069 103.255ZM17.4069 8C17.4069 4.13401 20.5409 1 24.4069 1V-1C19.4363 -1 15.4069 3.02944 15.4069 8H17.4069ZM17.4069 88.3481V8H15.4069V88.3481H17.4069ZM1 95.8014L16.789 89.2722L16.0247 87.424L0.23572 93.9532L1 95.8014ZM1 95.8014H1L0.23572 93.9532C-1.4119 94.6345 -1.41191 96.9683 0.235719 97.6496L1 95.8014ZM16.789 102.331L1 95.8014L0.235719 97.6496L16.0247 104.179L16.789 102.331ZM17.4069 187V103.255H15.4069V187H17.4069ZM24.4069 194C20.5409 194 17.4069 190.866 17.4069 187H15.4069C15.4069 191.971 19.4363 196 24.4069 196V194ZM230.383 194H24.4069V196H230.383V194ZM237.383 187C237.383 190.866 234.249 194 230.383 194V196C235.354 196 239.383 191.971 239.383 187H237.383ZM237.383 8V187H239.383V8H237.383ZM230.383 1C234.249 1 237.383 4.13401 237.383 8H239.383C239.383 3.02943 235.354 -1 230.383 -1V1ZM24.4069 1H230.383V-1H24.4069V1Z'
                            fill='#091229'
                            mask='url(#path-1-inside-1_32_432)'
                        />
                        <text x='30' y='30' fill='#000' fontFamily='Montserrat' fontSize='16' fontWeight='700'>Tu contraseña debe </text>
                        <text x='35' y='50' fill='#000' fontFamily='Montserrat' fontSize='16' fontWeight='700'>tener al menos:</text>
                        <text x='30' y='80' fill='#000' fontFamily='Montserrat' fontSize='14' fontWeight='400'>- Mínimo 8 caracteres</text>
                        <text x='30' y='100' fill='#000' fontFamily='Montserrat' fontSize='14' fontWeight='400'>- Mínimo 1 Mayúscula</text>
                        <text x='30' y='120' fill='#000' fontFamily='Montserrat' fontSize='14' fontWeight='400'>- Mínimo 1 número</text>
                        <text x='30' y='140' fill='#000' fontFamily='Montserrat' fontSize='14' fontWeight='400'>- Mínimo 1 carácter especial</text>
                    </svg>

                    {passwordError && (
                        <div className='text-danger mb-3'>{passwordError}</div>
                    )}
                    <div className='d-flex justify-content-between aligns-items-center mt-5  m-0'>
                        <button
                            type='button'
                            onClick={setPreviousPaso}
                            className='btn btn-outline-primary'
                            style={{ width: '48px', height: '48px' }}>
                            <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16' fill='none'>
                                <path d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z' fill='#091229' />
                            </svg>
                        </button>
                        <button
                            type='button'
                            onClick={handleNextClick}
                            className='btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold'>
                            SIGUIENTE
                        </button>
                    </div>
                </form>
            </div>
            <div className='d-none d-xl-block w-100' style={{ maxWidth: '5%' }}></div>
            <div className='d-none d-xl-block bg-image-main w-100' style={{ maxWidth: '50%' }}></div>
        </div>
    )
};

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
        <div className='container d-flex justify-content-center align-items-center mt-5'>
            <div className='col-12 col-md-5'>
                <h1 className='display-5 custom-bold text-center text-md-start mb-4'>Reservorio U-tad <br></br> personalizado para ti!</h1>
                <p className='fs-5 lead text-center text-md-start mb-4'>
                    Paso 2 de 3. ¿Quién eres?
                </p>

                <div className='row justify-content-center justify-content-md-between mb-4'>
                    <div className='col-6 col-md-auto mb-3 mb-md-0'>
                        <button
                            className={`custom-button w-100 ${selectedType === 'Tipo1' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Tipo1')}>
                            <svg width='130' height='129' viewBox='0 0 130 129' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill={selectedType === 'Tipo1' ? 'var(--color-principal)' : '#D9D9D9'} />
                            </svg>
                            <h3 className='text-center'>Tipo de usuario 1</h3>
                        </button>
                    </div>
                    <div className='col-6 col-md-auto'>
                        <button
                            className={`custom-button w-100 ${selectedType === 'Tipo2' ? 'selected' : ''}`}
                            onClick={() => handleTypeSelection('Tipo2')}>
                            <svg width='130' height='129' viewBox='0 0 130 129' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <circle id='Ellipse 9' cx='65' cy='64.1468' r='64.1468' fill={selectedType === 'Tipo2' ? 'var(--color-principal)' : '#D9D9D9'} />
                            </svg>
                            <h3 className='text-center'>Tipo de usuario 2</h3>
                        </button>
                    </div>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                    <button
                        type='button'
                        onClick={setPreviousPaso}
                        className='btn btn-outline-primary'
                        style={{ width: '48px', height: '48px' }}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16' fill='none'>
                            <path d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z' fill='#091229' />
                        </svg>
                    </button>
                    <button
                        type='button'
                        onClick={handleNextClick}
                        className='btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold'>
                        SIGUIENTE
                    </button>
                </div>
            </div>
        </div>

    );
};


const Paso3 = ({ setNextPaso, setPreviousPaso, setNombreCompleto, setTitulacion }) => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        specialty: '',
        course: '',
        terms: false,
        lastName: '',
        class: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, terms: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        setNombreCompleto(`${formData.name} ${formData.lastName}`);
    };

    return (
        <div className='container d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
            <h1 className='display-5 custom-bold text-center mb-4'>Paso 3 de 3: Rellenar datos</h1>
            <p className='fs-5 lead text-center mb-4'>Por favor, completa los siguientes campos:</p>

            <form onSubmit={handleSubmit} className='w-50'>
                <div className='d-flex justify-content-center w-100 mb-3'>
                    <input type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder='Nombre(Auto.)' className='form-control nombre-style' style={{ width: '232px', height: '48px', padding: '16px 32px', borderRadius: '8px', border: '1px solid var(--Color-Secundario-Negro, #091229)' }} />
                    <input type='text' name='lastName' value={formData.lastName} onChange={handleInputChange} placeholder='Apellido(Auto.)' className='form-control apellido-style' style={{ width: '232px', height: '48px', padding: '16px 32px', borderRadius: '8px', border: '1px solid var(--Color-Secundario-Negro, #091229)', marginLeft: '16px' }} />
                </div>

                <div className='d-flex justify-content-center w-100 mb-3'>
                    <select name='title' value={formData.title} onChange={handleInputChange} className='form-select titulacion-style' style={{ width: '480px', height: '48px', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                        <option value=''>Titulación</option>
                        <option value='Grado'>Grado</option>
                        <option value='Postgrado'>Postgrado</option>
                        <option value='Ciclo Formativo'>Ciclo Formativo</option>
                        <option value='Titulos Propios'>Titulos Propios</option>
                        <option value='Otros Cursos'>Otros Cursos</option>
                    </select>
                </div>

                <div className='d-flex justify-content-center w-100 mb-3'>
                    <select name='specialty' value={formData.specialty} onChange={handleInputChange} className='form-select especialidad-style' style={{ width: '480px', height: '48px', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                        <option value=''>Especialidad</option>
                        <option value='DIDI'>DIDI</option>
                        <option value='INSO'>INSO</option>
                        <option value='ANIM'>ANIM</option>
                        <option value='DIPI'>DIPI</option>
                        <option value='MAIS'>MAIS</option>
                        <option value='ANIM3D'>ANIM3D</option>
                        <option value='DAM'>DAM</option>
                    </select>
                </div>

                <div className='d-flex justify-content-center w-100 mb-3'>
                    <div className='me-2 w-70'>
                        <select name='course' value={formData.course} onChange={handleInputChange} className='form-select curso-style' style={{ width: '320px', height: '48px', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                            <option value=''>Curso</option>
                            <option value='1º'>1º</option>
                            <option value='2º'>2º</option>
                            <option value='3º'>3º</option>
                            <option value='4º'>4º</option>
                        </select>
                    </div>
                    <div className='ms-2 w-30'>
                        <select name='class' value={formData.class} onChange={handleInputChange} className='form-select clase-style' style={{ width: '144px', height: '48px', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                            <option value=''>Clase</option>
                            <option value='A'>Grupo A</option>
                            <option value='B'>Grupo B</option>
                            <option value='C'>Grupo C</option>
                            <option value='D'>Grupo D</option>
                        </select>
                    </div>
                </div>

                <div className='d-flex px-5 w-100 mb-3 custom-bold'>
                    <div className='form-check'>
                        <input type='checkbox' id='termsCheckbox' className='form-check-input' checked={formData.terms} onChange={handleCheckboxChange} />
                        <label htmlFor='termsCheckbox' className='form-check-label underline fs-5 fw-bold'>Aceptar términos y condiciones</label>
                    </div>
                </div>

                <div className='d-flex justify-content-between w-100 mb-3 px-5'>
                    <button
                        className='btn btn-outline-primary'
                        onClick={setPreviousPaso}
                        style={{ width: '48px', height: '48px' }}
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16' fill='none'>
                            <path d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z' fill='#091229' />
                        </svg>
                    </button>
                    <button
                        type='button'
                        onClick={setNextPaso}
                        className='btn btn-primary btn-color-primary btn-outline-primary border-5 py-1 px-5 fs-5 fw-bold'>
                        CREAR CUENTA
                    </button>
                </div>
            </form>
        </div>
    );
};

const PasoFin = ({ setNextPaso, setPreviousPaso }) => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-start text-center px-5' style={{ minHeight: '60vh', margin: '50px auto' }}>
            <button
                className='btn btn-outline-primary position-absolute start-0'
                onClick={setPreviousPaso}
                style={{ width: '48px', height: '48px', margin: '20px' }}
            >
                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16' fill='none'>
                    <path d='M10 1.4303L8.48329 -1.48327e-06L1.39876e-06 8L8.48329 16L10 14.5697L3.03342 8L10 1.4303Z' fill='#091229' />
                </svg>
            </button>
            <div className="container">
                <h1 className='display-5 custom-bold text-center mb-3'>¡Proceso de inscripción finalizado!</h1>
                <p className='fs-5 lead text-center mb-4'>
                    El desarrollo de proyectos es una parte fundamental de la <br></br>formación nuestros alumnos y alumnas, y es también una <br></br> carta de presentación de tus conocimientos, experiencia y <br></br> capacidad de trabajo en equipo.
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
    Paso2,
    Paso3,
    PasoFin
}