import {conexao } from '../config/bd.js';

export async function ListarUsuarios() {
    const [resultado] = await conexao.query(
        'SELECT id, nome, email, senha_hash, criado_em FROM usuarios'
    );
    return resultado;
}

export async function buscarUsuarioPorId(id) {
    const [resultado] = await conexao.query(
        'SELECT id, nome, email, senha_hash, criado_em FROM usuarios WHERE id = ?',
        [id]
    );
    return resultado[0];
}

export async function criarUsuario(nome, email, senhaHash) {
    const [resultado] = await conexao.query(
        'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)'
        , [nome, email, senhaHash]
    );
    return resultado[0];    
}

export async function buscarUsuarioPorEmail(email) {
    const [resultado] = await conexao.query(
        'SELECT id, nome, email, senha_hash, criado_em FROM usuarios WHERE email = ?',
        [email]
    );
    return resultado[0];
}





