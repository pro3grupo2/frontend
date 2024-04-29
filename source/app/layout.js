import {Montserrat} from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";

import NavBar from "@/components/NavBar";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const montserrat = Montserrat({subsets: ["latin"]});

export const metadata = {
    title: "Reservorio U-Tad",
    description: "Reservorio de proyectos de U-Tad",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={montserrat.className}>
        <div className="d-flex flex-column vh-100 p-0 m-0">
            <NavBar/>
            {children}

            <footer className={'d-flex flex-row flex-nowrap justify-content-evenly align-items-center py-3 background-color-secundario-negro ms-bold-subbody mt-auto'}>
                <Link href="/home">
                    <Image className="img-fluid" src="/images/logos/utad_white.svg" alt="Logo de U-tad" width={127} height={40}/>
                </Link>

                <Link className="color-secundario-blanco" href="/help">
                    Centro de ayuda
                </Link>

                <p className={'color-secundario-blanco m-0 p-0'}>900 373 379</p>

                <p className={'color-secundario-blanco m-0 p-0'}>info@u-tad.com</p>
            </footer>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
        </body>
        </html>
    )
}
