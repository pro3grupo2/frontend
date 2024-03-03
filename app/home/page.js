"use client"
// pages/Home.js

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/home-styles.css';
import animations from '../styles/animations.css';

const Home = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition => prevPosition + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* Aplicar la animación al título */}
      <h1 className={`move-up-down ${styles.title}`}>Pronto estarán los proyectos aquí...</h1>
      <div className="square" style={{ left: position + 'px' }} />
    </div>
  );
};

export default Home;
