'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from "./page.module.css";

export default function Login() { 

  const [nombre_usuario, setnombre_usuario] = useState('');
  const [contrasena, setcontrasena] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: nombre_usuario,
          contrasena: contrasena,
        }),
      });
         

      if (response.ok) {
        const data = await response.json();
       
        localStorage.setItem('token', data.token);
        router.push('/home'); 
      } else {
        const errorData = await response.json();
       
        setError(errorData.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      
      setError('Hubo un problema con la conexión');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
         {error && <p className={styles.errorMessage}>{error}</p>}
        <form className={styles.form}  onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="nombre_usuario">Usuario</label>
            <input type="text" id="nombre_usuario" placeholder="Ingrese su usuario" value={nombre_usuario}  onChange={(e) => setnombre_usuario(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="contrasena">Contraseña</label>
            <input type="password" id="contrasena" placeholder="Ingrese su contraseña" value={contrasena} onChange={(e) => setcontrasena(e.target.value)} required />
          </div>
          <button type="submit" className={styles.submitBtn}>Entrar</button>
        </form>
            
        <p className={styles.registerLink}>
          ¿No tienes cuenta? <a href="/register">Regístrate.!</a>
        </p>
      </div>
    </div>
  );
}
