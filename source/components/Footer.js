import React from 'react'
import Link from 'next/link' // Asegúrate de importar Link si estás usando Next.js
import Image from 'next/image' // Asegúrate de importar Image si estás usando Next.js

function Footer() {
    return (

        <footer className={'d-flex flex-column flex-md-row bottom-0  flex-nowrap justify-content-evenly align-items-center gap-4 gap-md-0 py-3 background-color-secundario-negro ms-bold-subbody w-100 mt-auto'}>
            <Link href="/home">
                <Image className="img-fluid" src="/images/logos/utad_white.svg" alt="Logo de U-tad" width={127} height={40}/>
            </Link>

            <Link className="color-secundario-blanco" href="/help">
                Centro de ayuda
            </Link>

            <p className={'d-none d-md-block color-secundario-blanco m-0 p-0'}>900 373 379</p>

            <p className={'d-none d-md-block color-secundario-blanco m-0 p-0'}>info@u-tad.com</p>
        </footer>

    )
}

export default Footer