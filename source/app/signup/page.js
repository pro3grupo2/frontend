"use client"

import "../globals.css"
import { useState } from 'react'
import { useRouter } from "next/navigation"

import { Paso1, Paso2_live_utad_com, Paso2_utad_com, Paso_coordinador, PasoFin, PasoInicio } from "@/components/Signup"
import Loading from "@/components/Loading"

import { signup } from "@/api/v1/auth"
import { create_alert } from "@/components/Alerts"

export default function SignUp() {
    const
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [rol, setRol] = useState(''),
        [codigo, setCodigo] = useState([]),
        [loading, setLoading] = useState(false),
        [alerts, setAlerts] = useState([]),
        router = useRouter()

    const
        [paso_password, setPaso_password] = useState(false),
        [paso_rol_alumnos, setPaso_rol_alumnos] = useState(false),
        [paso_rol_admins, setPaso_rol_admins] = useState(false),
        [paso_verificacion_coordinador, setPaso_verificacion_coordinador] = useState(false),
        [paso_final, setPaso_final] = useState(false)

    const handleSignup = async () => {
        setLoading(true)
        const alias = email.split("@")[0]
        const data = await signup(
            email,
            alias.replace(".", " "),
            alias,
            password,
            `Soy ${alias}`,
            "https://u-tad.com",
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            rol,
            2024,
            codigo.length ? codigo.join('') : undefined,
            (response) => {
                create_alert(setAlerts, `${response.path ?? ''}: ${response.msg ?? response}`, 'danger')
            }
        )
        setLoading(false)

        if (!data) return

        setPaso_final(true)
    }

    if (loading) return <Loading />

    if (paso_final) return <PasoFin
        setNextPaso={() => {
            router.push("/signin")
        }}
        setPreviousPaso={() => setPaso_final(false)}
    />

    if (paso_verificacion_coordinador) return <Paso_coordinador
        setNextPaso={handleSignup}
        setPreviousPaso={() => setPaso_verificacion_coordinador(false)}
        setCodigo={setCodigo}
        alerts={alerts}
        setAlerts={setAlerts}
    />

    if (paso_rol_alumnos) return <Paso2_live_utad_com
        setNextPaso={handleSignup}
        setPreviousPaso={() => setPaso_rol_alumnos(false)}
        setRol={setRol}
        alerts={alerts}
        setAlerts={setAlerts}
    />

    if (paso_rol_admins) return <Paso2_utad_com
        setNextPaso={() => {
            rol === "coordinador"
                ? setPaso_verificacion_coordinador(true)
                : handleSignup()
        }}
        setPreviousPaso={() => setPaso_rol_admins(false)}
        setRol={setRol}
        alerts={alerts}
        setAlerts={setAlerts}
    />

    if (paso_password) return <Paso1
        setNextPaso={() => {
            if (email.endsWith("@u-tad.com")) setPaso_rol_admins(true)
            else if (email.endsWith("@live.u-tad.com")) setPaso_rol_alumnos(true)
            else if (email.endsWith("@ext.live.u-tad.com")) console.log("Acciones para @ext.live.u-tad.com")
        }}
        setPreviousPaso={() => setPaso_password(false)}
        setPassword={setPassword}
        password={password}
    />

    return <PasoInicio
        setNextPaso={() => setPaso_password(true)}
        setPreviousPaso={() => router.push("/signin")}
        setEmail={setEmail}
        email={email}
    />
}