"use client"

import React, {useState} from 'react';
import {signup} from '@/api/v1/auth';
import {useRouter} from "next/navigation";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alias, setAlias] = useState('');
    const [recoveryPhrase, setRecoveryPhrase] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await signup(email, name, alias, password, recoveryPhrase, "alumno")
        console.log(data);
        router.push("/signin");
    }

    return (
        <div>

        </div>
    )
}