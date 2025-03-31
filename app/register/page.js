'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./register.module.css";

export default function Register() {
const [nombre_usuario, setnombre_usuario] = useState('');
const [contrasena, setcontrasena] = useState('');
const [error, setError] = useState(null);
const router = useRouter();

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch('/api/usuarios', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
nombre_usuario,
contrasena,
rol_id: 3, // Valor constante definido correctamente
}),
});

if (response.ok) {
const data = await response.json();
// Guarda el token en localStorage
localStorage.setItem('token', data.token);
// Redirecciona a la página principal
router.push('/');
} else {
const errorData = await response.json();
setError(errorData.message || 'Error al crear usuario');
}
} catch (err) {
setError('Hubo un problema con la conexión');
}
};

return (
<div className={styles.container}>
<div className={styles.loginBox}>
<h1 className={styles.title}>Registrarse</h1>
{error && <p className={styles.errorMessage}>{error}</p>}
<form className={styles.form} onSubmit={handleSubmit}>
<div className={styles.inputGroup}>
<label htmlFor="nombre_usuario">Nombre</label>
<input
type="text"
id="nombre_usuario"
placeholder="Ingrese su nombre"
value={nombre_usuario}
onChange={(e) => setnombre_usuario(e.target.value)}
required
/>
</div>
<div className={styles.inputGroup}>
<label htmlFor="contrasena">Contraseña</label>
<input
type="password"
id="contrasena"
placeholder="Ingrese una contraseña"
value={contrasena}
onChange={(e) => setcontrasena(e.target.value)}
required
/>
</div>
<button type="submit" className={styles.submitBtn}>
Registrarse
</button>
</form>
<p className={styles.registerLink}>
¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a>
</p>
</div>
</div>
);
}