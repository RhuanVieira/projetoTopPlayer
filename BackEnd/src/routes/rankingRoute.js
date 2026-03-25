import express from 'express';
import {
  getRankingGeral,
  getRankingPorJogo,
  getTop10
} from '../controllers/rankingController.js';

const router = express.Router();


router.get('/', getRankingGeral);
router.get('/top10', getTop10);
router.get('/:jogo_id', getRankingPorJogo);

export default router; 