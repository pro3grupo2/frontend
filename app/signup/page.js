"use client";

import {useState} from 'react';
import {Paso1, Paso2, Paso3, PasoFin, PasoInicio} from "@/components/Signup";

export default function SignUp() {
    const
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [rol, setRol] = useState(''),
        [nombre_completo, setNombreCompleto] = useState(''),
        [titulacion, setTitulacion] = useState(0)

    const [is_paso1, setIs_paso1] = useState(false)
    const [is_paso2, setIs_paso2] = useState(false)
    const [is_paso3, setIs_paso3] = useState(false)
    const [is_pasofin, setIs_pasofin] = useState(false)

    if (is_pasofin) return <PasoFin setNextPaso={() => {
        // TODO: Funcion para enviar los datos al servidor
        // signup(email, nombre_completo, email.split('@')[0], password, "recuperacion", rol)
    }} setPreviousPaso={() => setIs_pasofin(false)}/>

    if (is_paso3) return <Paso3 setNextPaso={() => setIs_pasofin(true)} setPreviousPaso={() => setIs_paso3(false)} setNombreCompleto={setNombreCompleto} setTitulacion={setTitulacion}/>

    if (is_paso2) return <Paso2 setNextPaso={() => setIs_paso3(true)} setPreviousPaso={() => setIs_paso2(false)} setRol={setRol}/>

    if (is_paso1) return <Paso1 setNextPaso={() => setIs_paso2(true)} setPreviousPaso={() => setIs_paso1(false)} setPassword={setPassword}/>

    return <PasoInicio setNextPaso={() => setIs_paso1(true)} setPreviousPaso={null} setEmail={setEmail}/>
}