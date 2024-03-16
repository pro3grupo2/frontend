"use client";
import "../globals.css";
import {useState} from 'react';
import {Paso1, Paso2_teacher, Paso2_user, Paso3_alumni, Paso3_departamento, Paso3_teacher, Paso3_user, Paso_coordinador, PasoFin, PasoInicio} from "@/components/Signup";

export default function SignUp() {
    const
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [rol, setRol] = useState(''),
        [nombre_completo, setNombreCompleto] = useState(''),
        [titulacion, setTitulacion] = useState(0)

    const [is_paso1, setIs_paso1] = useState(false)
    const [is_paso2_user, setIs_paso2_user] = useState(false)
    const [is_paso2_teacher, setIs_paso2_teacher] = useState(false)
    const [is_paso_coordinador, setIs_paso_coordinador] = useState(false)
    const [is_paso3_user, setIs_paso3_user] = useState(false)
    const [is_paso3_alumni, setIs_paso3_alumni] = useState(false)
    const [is_paso3_teacher, setIs_paso3_teacher] = useState(false)
    const [is_paso3_departamento, setIs_paso3_departamento] = useState(false)
    const [is_pasofin, setIs_pasofin] = useState(false)

    if (is_pasofin) return <PasoFin setNextPaso={() => {
        // TODO: Funcion para enviar los datos al servidor
        //signup(email, nombre_completo, email.split('@')[0], password, "recuperacion", rol)
    }} setPreviousPaso={() => setIs_pasofin(false)}/>

    if (is_paso3_user) return <Paso3_user setNextPaso={() => setIs_pasofin(true)} setPreviousPaso={() => setIs_paso3_user(false)} setNombreCompleto={setNombreCompleto} setTitulacion={setTitulacion} email={email}/>

    if (is_paso3_alumni) return <Paso3_alumni setNextPaso={() => setIs_pasofin(true)} setPreviousPaso={() => setIs_paso3_alumni(false)} setNombreCompleto={setNombreCompleto} setTitulacion={setTitulacion} email={email}/>

    if (is_paso3_teacher) return <Paso3_teacher setNextPaso={() => setIs_pasofin(true)} setPreviousPaso={() => setIs_paso3_teacher(false)} setNombreCompleto={setNombreCompleto} setTitulacion={setTitulacion} email={email}/>

    if (is_paso3_departamento) return <Paso3_departamento setNextPaso={() => setIs_pasofin(true)} setPreviousPaso={() => setIs_paso3_departamento(false)} setNombreCompleto={setNombreCompleto} setTitulacion={setTitulacion} email={email}/>

    if (is_paso_coordinador) return <Paso_coordinador setNextPaso={() => setIs_paso3_teacher(true)} setPreviousPaso={() => setIs_paso_coordinador(false)} setNombreCompleto={setNombreCompleto} setTitulacion={setTitulacion} email={email}/>

    if (is_paso2_user) return <Paso2_user setNextPaso={() => {
        if (rol === "alumno") {
            setIs_paso3_user(true)
        } else if (rol === "alumni") {
            setIs_paso3_alumni(true)
        }
    }} setPreviousPaso={() => setIs_paso2_user(false)} setRol={setRol}/>

    if (is_paso2_teacher) return <Paso2_teacher setNextPaso={() => {
        if (rol === "profesor") {
            setIs_paso3_teacher(true)
        } else if (rol === "coordinador") {
            setIs_paso_coordinador(true)
        } else if (rol === "departamentos") {
            setIs_paso3_departamento(true)
        }
    }} setPreviousPaso={() => setIs_paso2_teacher(false)} setRol={setRol}/>

    if (is_paso1) return <Paso1 setNextPaso={() => {
        if (email.endsWith("@u-tad.com")) {
            setIs_paso2_teacher(true)
        } else if (email.endsWith("@live.u-tad.com")) {
            setIs_paso2_user(true)
        } else if (email.endsWith("@ext.live.u-tad.com")) {

            console.log("Acciones para @ext.live.u-tad.com");
        }
    }} setPreviousPaso={() => setIs_paso1(false)} setPassword={setPassword} passwordEnviado={password}/>

    return <PasoInicio setNextPaso={() => setIs_paso1(true)} setPreviousPaso={null} setEmail={setEmail} mailEnviado={email}/>
}