// pages/information.js

import React from 'react';

const InformationPage = () => {
    return (
        <div className="container">
            <h2 className="mb-4">Añadir copy para esta pantalla</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre (Auto.)</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos (Auto.)</label>
                    <input type="text" className="form-control" id="apellidos" name="apellidos" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="grado" className="form-label">Grado</label>
                    <select className="form-select" id="grado" name="grado" required>
                        <option value="">Selecciona un grado</option>
                        <option value="bachillerato">Bachillerato</option>
                        <option value="licenciatura">Licenciatura</option>
                        <option value="maestria">Maestría</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="especialidad" className="form-label">Especialidad</label>
                    <select className="form-select" id="especialidad" name="especialidad" required>
                        <option value="">Selecciona una especialidad</option>
                        <option value="informatica">Informática</option>
                        <option value="medicina">Medicina</option>
                        <option value="arte">Arte</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="curso" className="form-label">Curso</label>
                    <select className="form-select" id="curso" name="curso" required>
                        <option value="">Selecciona un curso</option>
                        <option value="matematicas">Matemáticas</option>
                        <option value="historia">Historia</option>
                        <option value="literatura">Literatura</option>
                    </select>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="terminos" name="terminos" required/>
                    <label className="form-check-label" htmlFor="terminos">Acepto los términos y condiciones</label>
                </div>
                <button type="submit" className="btn btn-primary">CREAR CUENTA</button>
            </form>
        </div>
    );
};

export default InformationPage;
