"use client";

import React, {useState} from "react";
import Link from 'next/link'; 
import styles from './proyectos.module.css';


const Proyectos = () =>{
    const [proyectos, setProyectos] = useState([
        { id: 1, nombre: 'Proyecto A', tareas: 5 },
        { id: 2, nombre: 'Proyecto B', tareas: 3 },
        { id: 3, nombre: 'Proyecto C', tareas: 8 },
      ]);

    return(
        <div className={styles.container}>
      <div className={styles.projectBox}>
        <h1 className={styles.title}>Proyectos Asignados</h1>
        <ul className={styles.projectList}>
          {proyectos.map((proyecto) => (
            <li key={proyecto.id} className={styles.projectItem}>
              <Link href={`/miembros/tareas?id=${proyecto.id}`} className={styles.link}>
                {proyecto.nombre} - {proyecto.tareas} Tareas
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
};

export default Proyectos;