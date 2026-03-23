// Importamos nuestro pool de conexiones a la BD
import { pool } from './db.js';

// ==============================================
// Obtener todos los usuarios
// ==============================================
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==============================================
// Buscar usuario por email
// ==============================================
export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM public.usuarios WHERE email = $1',
      [email]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==============================================
// Buscar usuario por nombre (LIKE)
// ==============================================
export const getUserByName = async (req, res) => {
  const { nombre } = req.params;
  try {
    // Construimos el patrón de búsqueda con porcentajes para el LIKE
    const buscar = `%${nombre}%`;
    const result = await pool.query(
      'SELECT * FROM public.usuarios WHERE nombre LIKE $1',
      [buscar]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo usuario
export const postCrearUsuario = async (nombre, documento, carnet, email, contrasenia) => {
  try {
    const query = `
      INSERT INTO public.usuarios 
      (nombre, documento, carnet, email, contrasenia, bloqueado, ultimo_login, activo)
      VALUES ($1, $2, $3, $4, $5, 'N', null, 'A')
      RETURNING *;
    `;
    const result = await pool.query(query, [nombre, documento, carnet, email, contrasenia]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Actualizar un usuario por ID
export const actualizarUsuario = async (id, nombre, documento, carnet, email, contrasenia) => {
  try {
    const query = `
      UPDATE public.usuarios
      SET nombre = $2,
          documento = $3,
          carnet = $4,
          email = $5,
          contrasenia = $6
      WHERE id_usuario = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id, nombre, documento, carnet, email, contrasenia]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Eliminar un usuario por ID
export const eliminarUsuario = async (id) => {
  try {
    const query = `DELETE FROM public.usuarios WHERE id_usuario = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

