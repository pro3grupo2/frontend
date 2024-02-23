"use client"
// pages/index.js
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <h2>Bienvenido a nuestra aplicación</h2>
      <div className="mt-3">
        <Link href="/signin">
          <button className="btn btn-primary mr-2">Sign in</button>
        </Link>
        <Link href="/signup">
          <button className="btn btn-success">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

