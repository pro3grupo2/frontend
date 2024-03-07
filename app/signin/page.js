"use client"

import {useState} from 'react';
import {useRouter} from "next/navigation";

import {signin} from '@/api/v1/auth';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await signin(email, password)
        if (token) {
            localStorage.setItem('token', token);
            router.push("/home");
        }
    }

    return (
        <div>

        </div>
    )
}