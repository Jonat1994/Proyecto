"use client";

import React, { useState } from "react";
import styles from './colaborar.module.css';

const Colaborar = () =>
{
    const [miembros, setMiembros] = useState([
        { id: 1, nombre: 'Juan Pérez', rol: 'Desarrollador' },
        { id: 2, nombre: 'Ana López', rol: 'Diseñadora' },
        { id: 3, nombre: 'Carlos García', rol: 'Gerente de Proyecto' },
      ]);

    return(
        <div className={styles.container}>
        <div className={styles.contentBox}>
          <h1 className={styles.title}>Colaborar con el Equipo</h1>
          <ul className={styles.ul}>
            {miembros.map((miembro) => (
              <li key={miembro.id} className={styles.li}>
                {miembro.nombre} - {miembro.rol}
                <button className={styles.buttonCollaborate}>Enviar Mensaje</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

};

export default Colaborar;