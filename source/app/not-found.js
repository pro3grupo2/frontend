import Link from "next/link"
import Image from "next/image"

import "../styles/not-found.css"

export default function Notfound() {
    return (
        <div class="container-fluid d-flex flex-row gap-5 justify-content-evenly mt-5 h-100">
            <Image src="/icons/404.svg" alt="404" width="0" height="0" className="d-none d-xl-block w-25 h-50 mt-5" />

            <div className="d-flex flex-column justify-content-between gap-5 w-50 h-50 mt-5">
                <div className="d-flex flex-column gap-3">
                    <h1 className=" fw-bold display-4">Ups! Parece que <br/>esta página no <br/> existe</h1>
                    <p className="notfound-subtitle">Puede que la URL esté mal escrita o que el enlace ya no exista. <br />Prueba alguna de estas opciones:</p>

                    <div className="d-flex flex-column flex-sm-row gap-3">
                        <Link href="/home" className="notfound-boton btn btn-primary w-25  color-secundario-blanco p-2" style={{ minWidth: "fit-content" }}>Proyectos</Link>
                        <Link href="/soporte" className="notfound-boton btn btn-outline-primary w-25 p-2" style={{ minWidth: "fit-content" }}>Centro de ayuda</Link>
                    </div>
                </div>
                <hr />
                <div className="notfound-footer">
                    <p>Si no encuentras lo que buscas o necesitas ayuda siempre puedes contactar con el servicio de atención al cliente llamando al <span className="notfound-footer-detail">900 373 379</span> o enviando un correo a <span className="notfound-footer-detail">reservorio@u-tad.com</span></p>
                    <a href="https://u-tad.com/contacto/" target="_blank" className="ms-link">Centro de Ayuda</a>
                    <span className="m-3">|</span>
                    <a href="/home" target="_blank" className="ms-link">Sobre U-Reservorio</a>


                </div>
            </div>
        </div>
    )
}