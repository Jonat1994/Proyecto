"use client";

import React, { useState, useEffect } from 'react';
import styles from './GestionProyectos.module.css';

const GestionProyectos = () => {
    const [proyectos, setProyectos] = useState([]);
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [gerenteId, setGerenteId] = useState('');
    const [editProyectoId, setEditProyectoId] = useState(null);
    const [activeModal, setActiveModal] = useState(null);

    // Obtener proyectos (GET)
    const obtenerProyectos = async () => {
        try {
            const response = await fetch('/api/proyectosGerentes/2'); // Ajusta esto según sea necesario
            const data = await response.json();
            setProyectos(data);
        } catch (error) {
            console.error('Error al obtener proyectos:', error);
        }
    };

    useEffect(() => {
        obtenerProyectos();
    }, []);

    const openModal = (modalId, proyecto = {}) => {
        if (modalId === 'editModal') {
            // Asignar los valores del proyecto a los estados
            setNombreProyecto(proyecto.nombre || '');
            setDescripcion(proyecto.descripcion || '');
            setFechaInicio(proyecto.fecha_inicio ? proyecto.fecha_inicio.split('T')[0] : '');
            setFechaFin(proyecto.fecha_fin ? proyecto.fecha_fin.split('T')[0] : '');
            setGerenteId(proyecto.gerente_id || '');
            setEditProyectoId(proyecto.id);
        } else if (modalId === 'addModal') {
            // Restablecer valores al abrir el modal de agregar
            setNombreProyecto('');
            setDescripcion('');
            setFechaInicio('');
            setFechaFin('');
            setGerenteId('');
            setEditProyectoId(null);
        }
        setActiveModal(modalId);
    };

    const closeModal = () => {
        setActiveModal(null);
        setEditProyectoId(null);
    };

    // Crear proyecto (POST)
    const crearProyecto = async () => {
        try {
            const response = await fetch('/api/proyectos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombreProyecto,
                    descripcion: descripcion,
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin,
                    gerente_id: gerenteId,
                }),
            });
            if (response.ok) {
                await obtenerProyectos(); // Recarga automática
                closeModal();
            }
        } catch (error) {
            console.error('Error al crear proyecto:', error);
        }
    };

    // Actualizar proyecto (PATCH)
    const actualizarProyecto = async () => {
        if (!editProyectoId) {
            console.error('El ID del proyecto a editar es inválido.');
            return; // Sale de la función si el ID es inválido
        }

        try {
            const response = await fetch(`/api/proyectos`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editProyectoId,
                    nombre: nombreProyecto,
                    descripcion: descripcion,
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin,
                    gerente_id: gerenteId,
                }),
            });

            if (response.ok) {
                await obtenerProyectos(); // Recarga automática
                closeModal();
            } else {
                const errorData = await response.json();
                console.error('Error al actualizar proyecto:', errorData);
            }
        } catch (error) {
            console.error('Error al actualizar proyecto:', error);
        }
    };

    // Eliminar proyecto (DELETE)
    const eliminarProyecto = async (id) => {
        try {
            const response = await fetch(`/api/proyectos`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                await obtenerProyectos(); // Recarga automática
                closeModal();
            }
        } catch (error) {
            console.error('Error al eliminar proyecto:', error);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2 className={styles.title}>Lista de Proyectos</h2>
                <button onClick={() => openModal('addModal')} className={styles.modalBtn}>
                    Agregar Proyecto
                </button>
                <table className={styles.styledTable}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos.map((proyecto) => (
                            <tr key={proyecto.id}>
                                <td>{proyecto.nombre}</td>
                                <td>{proyecto.descripcion}</td>
                                <td>{proyecto.fecha_inicio}</td>
                                <td>{proyecto.fecha_fin}</td>
                                <td className={styles.buttonContainer}>
                                    <button className={styles.editBtn} onClick={() => openModal('editModal', proyecto)}>
                                        Editar
                                    </button>
                                    <button className={styles.deleteBtn} onClick={() => eliminarProyecto(proyecto.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* Modal para editar proyecto */}
                {activeModal === 'editModal' && (
                    <div className={`${styles.modal} ${styles.active}`}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={closeModal}>&times;</span>
                            <h2 className={styles.modalTitle}>Editar Proyecto</h2>
                            <input
                                type="text"
                                value={nombreProyecto}
                                onChange={(e) => setNombreProyecto(e.target.value)}
                                placeholder="Nombre del Proyecto"
                                className={styles.modalInput}
                            />
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Descripción"
                                className={styles.modalInput}
                            />
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className={styles.modalInput}
                            />
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className={styles.modalInput}
                            />
                            <input
                                type="text"
                                value={gerenteId}
                                onChange={(e) => setGerenteId(e.target.value)}
                                placeholder="ID del Gerente"
                                className={styles.modalInput}
                            />
                            <div className={styles.modalBtnContainer}>
                                <button onClick={actualizarProyecto} className={styles.modalBtn}>
                                    Actualizar Proyecto
                                </button>
                                <button onClick={closeModal} className={styles.modalBtn}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para agregar proyecto */}
                {activeModal === 'addModal' && (
                    <div className={`${styles.modal} ${styles.active}`}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={closeModal}>&times;</span>
                            <h2 className={styles.modalTitle}>Agregar Proyecto</h2>
                            <input
                                type="text"
                                value={nombreProyecto}
                                onChange={(e) => setNombreProyecto(e.target.value)}
                                placeholder="Nombre del Proyecto"
                                className={styles.modalInput}
                            />
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Descripción"
                                className={styles.modalInput}
                            />
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className={styles.modalInput}
                            />
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className={styles.modalInput}
                            />
                            <input
                                type="text"
                                value={gerenteId}
                                onChange={(e) => setGerenteId(e.target.value)}
                                placeholder="ID del Gerente"
                                className={styles.modalInput}
                            />
                            <div className={styles.modalBtnContainer}>
                                <button onClick={crearProyecto} className={styles.modalBtn}>
                                    Crear Proyecto
                                </button>
                                <button onClick={closeModal} className={styles.modalBtn}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GestionProyectos;
