import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo de U-tad a la izquierda */}
        <div>
          <Image src="/images/logo.png" alt="Logo de U-tad" height={100} width={180} />
        </div>
        {/* Información de contacto y botón de inicio de sesión a la derecha */}
        <div className="d-flex align-items-center">
          <p className="m-0 mr-3">900 373 379</p>
          <Link href="/signin">
            <button className="btn btn-primary">Sign in</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
