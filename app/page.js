"use client"

import React from 'react';
import Link from 'next/link';

const { me } = require('../api/sign');

async function ME(token) {
    const data = await me(token);
    console.log(data);
}

export default function HomePage() {
    return (
        <div className="container-fluid text-center mt-5">
            
        </div>
    )
}