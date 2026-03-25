CREATE DATABASE db_top_player;

CREATE TABLE usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(120) NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE,
	senha_hash VARCHAR(255) NOT NULL,
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jogos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(120) NOT NULL,
	genero VARCHAR(80)
);

CREATE TABLE player(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nick VARCHAR(120) NOT NULL,
	plataforma ENUM('PC','PS','XOBX', 'MOBILE','NINTENDO','OUTROS') DEFAULT 'OUTROS',
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partida(
	id INT AUTO_INCREMENT PRIMARY KEY,
	jogo_id INT NOT NULL,
	player_id INT NOT NULL,
	pontos INT NOT NULL,
	data_partida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (jogo_id) REFERENCES jogos(id) ON DELETE CASCADE,
	FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE
);

USE db_top_player;
RENAME TABLE usuario TO usuarios;

CREATE VIEW vw_ranking_por_jogo AS
SELECT 
  p.id,
  SUM(p.pontos) AS total_de_pontos,
  j.nome AS jogo_nome, 
  p.player_id,
  pl.nick, 
  pl.plataforma,
  COUNT(*) AS total_de_partida
FROM partida p
JOIN jogos j ON j.id = p.jogo_id
JOIN player pl ON pl.id = p.player_id
GROUP BY p.id, j.nome, p.player_id, pl.nick, pl.plataforma
ORDER BY total_de_pontos DESC;
SELECT * FROM vw_ranking_por_jogo