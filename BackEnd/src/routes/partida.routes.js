import {Router} from 'express';
import * as partidaController from '../controllers/partida.controller.js';

const router = Router();

router.get('/', partidaController.listar);
router.post('/', partidaController.criar);
router.delete('/:id', partidaController.deletar);

export default router;