"use client"

import React, { useState } from 'react';
import { signup } from '../../api/sign';
import { useRouter } from "next/navigation";

export default function SignUp() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alias, setAlias] = useState('');
	const [recoveryPhrase, setRecoveryPhrase] = useState('');
    const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = { correo: email, nombre_completo: name, alias, password, frase_recuperacion: recoveryPhrase, rol: "alumno" };
		const data = await signup(body);
		console.log(data);
        router.push("/signin");
	};

	return (
        <div>
            
        </div>
    )
}