"use client"
import React from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';

const HomePage = () => {
  return (
    <div className="main-content">
      <NavBar />
      <h1 className="title">Trabajos de alumnos/nis</h1>
      <h2 className="subtitle">¡Descubre el talento de U-tad!</h2>
      <div className="buttons">
        <Link href="/signup">
          <button className="btn btn-success">Sign up</button>
        </Link>
        <button className="btn btn-danger ml-2" onClick={() => ME(localStorage.getItem("token"))}>Me</button>
      </div>
    </div>
  );
};

export default HomePage;
