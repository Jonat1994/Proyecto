import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi_clave_secreta'; // Cambia esto por una clave segura

export async function POST(req) {
    try {
        const body = await req.json();
        const { nombre_usuario, contrasena, rol_id } = body;

        if (!nombre_usuario || !contrasena || !rol_id) {
            return new Response(JSON.stringify({ message: 'Todos los campos son obligatorios' }), { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Simulate user creation
        const nuevoUsuario = {
            id: Math.floor(Math.random() * 1000),
            nombre_usuario,
            contrasena: hashedPassword, // Save the hashed password
            rol_id,
        };

        // Generate a JWT token
        const token = jwt.sign(
            { id: nuevoUsuario.id, rol_id: nuevoUsuario.rol_id, nombre_usuario: nuevoUsuario.nombre_usuario },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return new Response(JSON.stringify({ token, user: nuevoUsuario }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error interno del servidor:', error);
        return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
    }
}
