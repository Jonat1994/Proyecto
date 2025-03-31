"use client";

import { useState } from "react";
import React from "react";
import styles from './tareas.module.css';

const Tareas = () =>{
    const [proyecto, setProyecto] = useState('Proyecto A'); // Puedes cambiar el proyecto manualmente
  const [tareas, setTareas] = useState([
    { id: 1, nombre: 'Tarea 1', estado: 'Pendiente' },
    { id: 2, nombre: 'Tarea 2', estado: 'En Proceso' },
    { id: 3, nombre: 'Tarea 3', estado: 'Completada' },
  ]);

  return(
    <div className={styles.container}>
    <div className={styles.taskBox}>
      <h1 className={styles.title}>Tareas del {proyecto}</h1>
      <ul className={styles.taskList}>
        {tareas.map((tarea) => (
          <li key={tarea.id} className={styles.taskItem}>
            {tarea.nombre} - Estado: {tarea.estado}
            <div>
              <button className={styles.button}>Actualizar Estado</button>
              <button className={styles.button}>Proporcionar Comentarios</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default Tareas;