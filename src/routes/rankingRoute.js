app.get('/ranking', (req, res) => {
  const sql = 'SELECT * FROM vw_ranking_por_jogo';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});