import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi_clave_secreta'; // Cambia esto por una clave segura y almacénala en variables de entorno

// Usuarios simulados (en un entorno real, esto vendría de una base de datos)
const usuariosSimulados = [
  { id: 1, nombre_usuario: 'admin', contrasena: '$2b$10$YRvnkrEwUTJc4wLi78sROZ2a6qjZk5YwMkLhKpr8QjB22JjJp9g.', rol_id: 1 }, // Contraseña hasheada
  { id: 2, nombre_usuario: 'gerente', contrasena: '$2b$10$YRvnkrEwUTJc4wLi78sROZ2a6qjZk5YwMkLhKpr8QjB22JjJp9g.', rol_id: 2 },
  { id: 3, nombre_usuario: 'miembro', contrasena: '$2b$10$YRvnkrEwUTJc4wLi78sROZ2a6qjZk5YwMkLhKpr8QjB22JjJp9g.', rol_id: 3 },
];

export async function POST(req) {
  try {
    const body = await req.json(); // Leer el cuerpo de la solicitud
    const { nombre_usuario, contrasena } = body;

    if (!nombre_usuario || !contrasena) {
      return new Response(JSON.stringify({ message: 'Todos los campos son obligatorios' }), { status: 400 });
    }

    // Buscar el usuario por nombre
    const usuarioEncontrado = usuariosSimulados.find(user => user.nombre_usuario === nombre_usuario);

    if (!usuarioEncontrado) {
      return new Response(JSON.stringify({ message: 'Usuario o contraseña incorrectos' }), { status: 401 });
    }

    // Verificar la contraseña hasheada
    const isMatch = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Usuario o contraseña incorrectos' }), { status: 401 });
    }

    // Generar un token JWT
    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
        rol_id: usuarioEncontrado.rol_id,
        nombre_usuario: usuarioEncontrado.nombre_usuario // <- Se incluye el nombre de usuario en el token
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}
