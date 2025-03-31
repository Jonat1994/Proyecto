"use client";

import React from 'react';
import styles from "./Menu.module.css";
import Image from 'next/image';

const AdminMenu = ({handleMenuClick}) => {
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
          <a href="#" onClick={() => handleMenuClick("gestionUsuarios")}>
            Gestion Usuarios
          </a>
          <a href="#" onClick={() => handleMenuClick("gestionProyectos")}>
            Gestion Proyectos
          </a>
          <a href="#" onClick={() => handleMenuClick("gestionTareas")}>
          Gestion Tareas
          </a>
          <a href="#" onClick={() => handleMenuClick("prueba")}>
            Prueba
          </a>
        </nav>
      </header>
    );
  };

  export default AdminMenu;
