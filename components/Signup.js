const PasoInicio = ({setNextPaso, setPreviousPaso, setEmail}) => {
    return (
        <div className="input-group mb-3 px-0" style={{
            width: "75%", borderRadius: '0.25rem',
            backgroundColor: "var(--color-secundario-gris-claro-extra)", border: '3px solid transparent'
        }}>
            <input
                type="email"
                className="form-control py-3 fs-5"
                style={{border: 'none', backgroundColor: "var(--color-secundario-gris-claro-extra)"}}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo Electrónico"
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