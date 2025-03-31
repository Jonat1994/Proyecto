"use client";

import React from 'react';
import styles from "./Menu.module.css";
import Image from 'next/image';

const MiembroMenu =({handleMenuClick}) => {
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
           <a href="#" onClick={() => handleMenuClick("proyectos")}>
             Accede a tus Proyectos
           </a>
           <a href="#" onClick={() => handleMenuClick("tareas")}>
             Actualiza Tareas
           </a>
           <a href="#" onClick={() => handleMenuClick("colaborar")}>
             Colabora
           </a>
         </nav>
       </header>     
    );

};

export default MiembroMenu;