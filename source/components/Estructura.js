const EstructuraFormularios = ({ children, clase_imagen = 'bg-placeholder' }) => {
    return (
        <div className="d-flex flex-row flex-grow-1 justify-content-evenly align-items-center h-100 ">
            <div className="flex-grow-1 p-5 mx-sm-2 mx-md-5">
                {children}
            </div>

            <div className={`d-none d-xl-block ${clase_imagen} w-100 h-100`} style={{ maxWidth: '50%' }}></div>
        </div>
    )
}

module.exports = {
    EstructuraFormularios
}
