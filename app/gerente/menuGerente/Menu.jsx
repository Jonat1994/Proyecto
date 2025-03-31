// src/app/gerente/menuGerente/Menu.js
"use client";

import React from 'react';
import styles from './Menu.module.css';
import Image from 'next/image';
import Link from 'next/link';

const GerenteMenu = ({ handleMenuClick }) => {
    return (
        <header className={styles.header}>
            <Image
                src="/logo.png"
                alt="Logo de la aplicación"
                width={150}
                height={50}
                priority
            />
            <nav className={styles.nav}>
                <Link href="#" onClick={() => handleMenuClick("proyectos")}>
                    Gestion de Proyectos
                </Link>
                <Link href="#" onClick={() => handleMenuClick("tareas")}>
                    Asignar Tareas
                </Link>
                <Link href="#" onClick={() => handleMenuClick("actus")}>
                    Ver actualizaciones
                </Link>
                <Link href="#" onClick={() => handleMenuClick("contacto")}>
                    Contacto
                </Link>
            </nav>
        </header>
    );
};

export default GerenteMenu;
