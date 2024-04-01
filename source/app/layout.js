import {Montserrat} from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from "@/components/NavBar";

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
        </div>
        </body>
        </html>
    )
}
