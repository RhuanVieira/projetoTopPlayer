// src/models/ranking.model.js

exports.getRankingGeral = (db, callback) => {
  const sql = `
    SELECT * FROM vw_ranking_por_jogo
    ORDER BY total_de_pontos DESC
  `;

  db.query(sql, callback);
};


exports.getRankingPorJogo = (db, jogo_id, callback) => {
  const sql = `
    SELECT * FROM vw_ranking_por_jogo
    WHERE jogo_id = ?
    ORDER BY total_de_pontos DESC
  `;

  db.query(sql, [jogo_id], callback);
};


exports.getTop10 = (db, callback) => {
  const sql = `
    SELECT * FROM vw_ranking_por_jogo
    ORDER BY total_de_pontos DESC
    LIMIT 10
  `;

  db.query(sql, callback);
};