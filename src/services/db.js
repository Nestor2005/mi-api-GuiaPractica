// Importamos el paquete 'pg' que nos permite conectarnos a PostgreSQL
import pkg from 'pg';

// Importamos dotenv para leer las variables de entorno desde el archivo .env
import dotenv from 'dotenv';
dotenv.config();

// Extraemos la clase Pool de 'pg'
const { Pool } = pkg;

// Creamos y exportamos un pool de conexión reutilizable
export const pool = new Pool({
  user: process.env.DB_USER,        // Usuario de la BD
  host: process.env.DB_HOST,        // Host del servidor
  password: process.env.DB_PASSWORD,// Contraseña
  database: process.env.DB_NAME,    // Nombre de la BD
  port: process.env.DB_PORT         // Puerto de PostgreSQL
});
