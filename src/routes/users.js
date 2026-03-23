import { Router } from 'express';
import { getAllUsers, getUserByEmail, getUserByName, postCrearUsuario, actualizarUsuario, eliminarUsuario } from '../services/userServices.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/buscarPorEmail/:email', getUserByEmail);
router.get('/buscarPorNombre/:nombre', getUserByName);

router.post('/', async (req, res) => {
  try {
    const { nombre, documento, carnet, email, contrasenia } = req.body;
    const nuevoUsuario = await postCrearUsuario(nombre, documento, carnet, email, contrasenia);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /users/:id → actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, documento, carnet, email, contrasenia } = req.body;
    const usuarioActualizado = await actualizarUsuario(id, nombre, documento, carnet, email, contrasenia);
    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuarioActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id → eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await eliminarUsuario(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuarioEliminado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
