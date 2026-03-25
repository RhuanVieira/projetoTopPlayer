import db from '../config/db.js';

export const getRankingGeral = (req, res) => {
  const sql = `
    SELECT * FROM vw_ranking_por_jogo
    ORDER BY total_de_pontos DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getRankingPorJogo = (req, res) => {
  const { jogo_id } = req.params;

  const sql = `
    SELECT * FROM vw_ranking_por_jogo
    WHERE jogo_id = ?
    ORDER BY total_de_pontos DESC
  `;

  db.query(sql, [jogo_id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getTop10 = (req, res) => {
  const sql = `
    SELECT * FROM vw_ranking_por_jogo
    ORDER BY total_de_pontos DESC
    LIMIT 10
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};