"use client"

import {useRouter} from "next/navigation"

import NavBar from "@/components/NavBar"
import {AuthProvider} from "@/context/authContext"

import {page_texts} from "@/lang"

export default function HomePage() {
    const
        router = useRouter()

    const page = page_texts(localStorage.getItem('lang') ?? "EN")

    return (
        <AuthProvider redirect={false}>
            <NavBar lang={localStorage.getItem("lang") ?? "EN"}/>
            <div className="container-fluid bg-image-main d-flex flex-column justify-content-center align-items-center text-center p-0">
                <h1 className="fw-bold display-3">{page.title}</h1>
                <p className="fw-bold  mt-4 fs-5">{page.subtitle}</p>
                <p className="pe-1 mt-3 fs-5">
                    {page.description_1}
                    <br/>
                    {page.description_2}
                </p>

                <div className="container text-center d-grid gap-2" style={{maxWidth: '32rem'}}>
                    <button onClick={() => router.push('/home')} className="btn btn-primary mt-5 btn-lg text-center fw-bold fs-3" style={{maxWidth: 512, height: 64}}>{page.button_text}</button>
                </div>
            </div>
        </AuthProvider>
    )
}