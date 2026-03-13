import {conexao } from '../config/bd.js';

export async function listarPartida() {
    const [resultado] = await conexao.query(
        `SELECT partidas.id, j.nome, p.nickname, partidas.pontos, partidas.data_partida FROM partidas
        INNER JOIN player AS p ON partidas.player_id = p.id
        INNER JOIN jogos AS j ON partidas.jogos_id = j.id`
    );
    return resultado;
    
}

export async function criarPartida(nome, genero, pontos) {
    const [resultado] = await conexao.query(
        'INSERT INTO partidas (jogos_id, player_id, pontos) VALUES (?, ?, ?)',
        [jogos_id, player_id, pontos]
    );
    return resultado[0];    
}

export async function deletarPartida(id){
    const [resultado] = await conexao.query(
        'DELETE FROM  partidas WHERE id = ? '
        , [id]
    );
    return resultado.affectedRows;
}