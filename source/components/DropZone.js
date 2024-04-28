function Dropzone({ inputPortada, setInputPortada }) {
    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) {
            setInputPortada(file)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files)
            setInputPortada(filesArray)
        }
    }

    return (
        <div className="dropzone" onDrop={handleDrop} onDragOver={handleDragOver}>
            {inputPortada !== null ? ( // Verificar que inputPortada no sea null antes de utilizarlo
                <img src={URL.createObjectURL(inputPortada)} alt="Portada" />
            ) : (
                <>
                    <Image src="../icons/file.svg" />
                    <p>Arrastra o selecciona la portada desde tu ordenador</p>
                </>
            )}
            <input className="form-control" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleFileChange} />
        </div>
    )
}
