"use client";

import React, { useState, useEffect } from 'react';
import styles from './GestionTareas.module.css';

const GestionTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [nombreTarea, setNombreTarea] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [proyectoId, setProyectoId] = useState('');
  const [asignadoA, setAsignadoA] = useState('');
  const [editTareaId, setEditTareaId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  // Obtener tareas (GET)
  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await fetch('/api/tareas');
        const data = await response.json();
        setTareas(data);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      }
    };
    obtenerTareas();
  }, []);

  const openModal = (modalId, tarea = null) => {
    if (modalId === 'editModal' && tarea) {
      setNombreTarea(tarea.nombre || '');
      setDescripcion(tarea.descripcion || '');
      setEstado(tarea.estado || '');
      setProyectoId(tarea.proyecto_id || '');
      setAsignadoA(tarea.asignado_a || '');
      setEditTareaId(tarea.id);
    } else if (modalId === 'createModal') {
      // Resetear los valores para crear una nueva tarea
      setNombreTarea('');
      setDescripcion('');
      setEstado('');
      setProyectoId('');
      setAsignadoA('');
      setEditTareaId(null);
    }
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditTareaId(null);
  };

  // Crear tarea (POST)
  const crearTarea = async () => {
    try {
      const response = await fetch('/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreTarea,
          descripcion: descripcion,
          estado: estado,
          proyecto_id: proyectoId,
          asignado_a: asignadoA,
        }),
      });
      if (response.ok) {
        const nuevaTarea = await response.json();
        setTareas([...tareas, nuevaTarea]);
        closeModal();
      } else {
        console.error('Error al crear tarea:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  // Actualizar tarea (PATCH)
  const actualizarTarea = async () => {
    try {
      const response = await fetch(`/api/tareas/${editTareaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreTarea,
          descripcion: descripcion,
          estado: estado,
          proyecto_id: proyectoId,
          asignado_a: asignadoA,
        }),
      });
      if (response.ok) {
        const tareaActualizada = await response.json();
        setTareas(tareas.map(tarea => (tarea.id === editTareaId ? tareaActualizada : tarea)));
        closeModal();
      } else {
        console.error('Error al actualizar tarea:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  // Eliminar tarea (DELETE)
  const eliminarTarea = async (id) => {
    try {
      const response = await fetch(`/api/tareas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTareas(tareas.filter(tarea => tarea.id !== id));
        closeModal();
      } else {
        console.error('Error al eliminar tarea:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Lista de Tareas</h2>
        
        {/* Botón para agregar una nueva tarea */}
        <button className={styles.editBtn}  onClick={() => openModal('createModal')}>
          Agregar Tarea
        </button>

        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id}>
                <td>{tarea.nombre}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.estado}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => openModal('editModal', tarea)}>
                    Editar
                  </button>
                  <button className={styles.deleteBtn} onClick={() => eliminarTarea(tarea.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Crear */}
        <div className={`${styles.modal} ${activeModal === 'createModal' ? styles.active : ''}`}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h3 className={styles.modalTitle}>Crear Tarea</h3>
            <input
              type="text"
              placeholder="Nombre de la tarea"
              value={nombreTarea}
              onChange={(e) => setNombreTarea(e.target.value)}
              className={styles.modalInput}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className={styles.modalInput}
            />
            <input
              type="text"
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className={styles.modalInput}
            />
            <input
              type="number"
              placeholder="ID del Proyecto"
              value={proyectoId}
              onChange={(e) => setProyectoId(e.target.value)}
              className={styles.modalInput}
            />
            <input
              type="number"
              placeholder="ID del Asignado"
              value={asignadoA}
              onChange={(e) => setAsignadoA(e.target.value)}
              className={styles.modalInput}
            />
            <div className={styles.modalBtnContainer}>
              <button className={styles.modalBtn} onClick={crearTarea}>
                Crear Tarea
              </button>
            </div>
          </div>
        </div>

        {/* Modal Editar */}
        <div className={`${styles.modal} ${activeModal === 'editModal' ? styles.active : ''}`}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h3 className={styles.modalTitle}>Editar Tarea</h3>
            <input
              type="text"
              placeholder="Nombre de la tarea"
              value={nombreTarea}
              onChange={(e) => setNombreTarea(e.target.value)}
              className={styles.modalInput}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className={styles.modalInput}
            />
            <input
              type="text"
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className={styles.modalInput}
            />
            <input
              type="number"
              placeholder="ID del Proyecto"
              value={proyectoId}
              onChange={(e) => setProyectoId(e.target.value)}
              className={styles.modalInput}
            />
            <input
              type="number"
              placeholder="ID del Asignado"
              value={asignadoA}
              onChange={(e) => setAsignadoA(e.target.value)}
              className={styles.modalInput}
            />
            <div className={styles.modalBtnContainer}>
              <button className={styles.modalBtn} onClick={actualizarTarea}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>

        {/* Modal Eliminar */}
        <div className={`${styles.modal} ${activeModal === 'deleteModal' ? styles.active : ''}`}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h3 className={styles.modalTitle}>¿Estás seguro de que deseas eliminar esta tarea?</h3>
            <div className={styles.modalBtnContainer}>
              <button className={styles.modalBtn} onClick={() => eliminarTarea(editTareaId)}>
                Eliminar
              </button>
              <button className={styles.modalBtn} onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionTareas;
