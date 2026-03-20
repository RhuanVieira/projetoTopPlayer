// src/controllers/rankingController.js

const rankingModel = require('../models/ranking.model');

exports.getRankingGeral = (req, res, db) => {
  rankingModel.getRankingGeral(db, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar ranking' });
    }

    res.json(results);
  });
};


exports.getRankingPorJogo = (req, res, db) => {
  const { jogo_id } = req.params;

  rankingModel.getRankingPorJogo(db, jogo_id, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar ranking por jogo' });
    }

    res.json(results);
  });
};


exports.getTop10 = (req, res, db) => {
  rankingModel.getTop10(db, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar top 10' });
    }

    res.json(results);
  });
};