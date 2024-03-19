const EstructuraFormulariossignin = ({children}) => {
    return (
        <div className="d-flex flex-row flex-grow-1 justify-content-evenly align-items-center">
            <div className="flex-shrink-1 px-5 mx-xl-5 w-100 h-100">
                {children}
            </div>

            <div className="d-none d-xl-block bg-image-signin w-100 h-100" style={{maxWidth: '50%'}}></div>
        </div>
    )
}

module.exports = {
    EstructuraFormulariossignin
}
