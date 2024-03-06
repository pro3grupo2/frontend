"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation";

const { signin } = require('../../api/sign');

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { correo: email, password: password };
        const token = await signin(body);

        if (token) {
            localStorage.setItem('token', token);
            router.push("/home");
        }
    };

    return (
        <div>

        </div>
    )
}