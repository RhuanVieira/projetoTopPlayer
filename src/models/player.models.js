import {conexao } from '../config/bd.js';

export async function listarPlayer() {
    const [resultado] = await conexao.query(
        'SELECT id, nickname, plataforma FROM player'
    );
    return resultado;
    
}

export async function buscarPlayer(id){
     const [resultado] = await conexao.query(
        'SELECT id, nickname, plataforma FROM player WHERE id = ?',
        [id]
    );
    return resultado[0];

}

export async function criarPlayer(nickname, plataforma) {
    const [resultado] = await conexao.query(
        'INSERT INTO player (nickname, plataforma) VALUES (?, ?)'
        , [nickname, plataforma]
    );
    return resultado[0];    
}

export async function atualizarPlayer(nickname, plataforma, id){
    const [resultado] = await conexao.query(
        'UPDATE player SET nickname = ?, plataforma = ? WHERE id = ?', 
        [nickname, plataforma, id]
    );
    return resultado.affectedRows;
}

export async function deletarPlayer(id){
    const [resultado] = await conexao.query(
        'DELETE FROM  player WHERE id = ? '
        , [id]
    );
    return resultado.affectedRows;
}
