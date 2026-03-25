import {conexao } from '../config/db.js';

export async function ListarJogo() {
    const [resultado] = await conexao.query(
        'SELECT id, nome, genero FROM jogos'
    );
    return resultado;
    
}

export async function BuscarJogoPorId(id){
     const [resultado] = await conexao.query(
        'SELECT id, nome, genero FROM jogos WHERE id = ?',
        [id]
    );
    return resultado[0];

}

export async function criarJogos(nome, genero) {
    const [resultado] = await conexao.query(
        'INSERT INTO jogos (nome, genero) VALUES (?, ?)'
        , [nome, genero]
    );
    return resultado[0];    
}

export async function Atualizar(nome, genero, id){
    const [resultado] = await conexao.query(
        'UPDATE jogos SET nome = ?, genero = ? WHERE id = ?', 
        [nome, genero, id]
    );
    return resultado.affectedRows;
}

export async function DeletarJogo(id){
    const [resultado] = await conexao.query(
        'DELETE FROM  jogos WHERE id = ? '
        , [id]
    );
    return resultado.affectedRows;
}
//UPDATE usuarios
//SET email = 'novo@email.com'
//WHERE id = 5;
