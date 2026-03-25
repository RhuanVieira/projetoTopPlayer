import conexao from '../config/db.js';

export async function criarUsuario(nome, email, senha) {
    const sql = `
        INSERT INTO usuarios (nome, email, senha_hash)
        VALUES (?, ?, ?)
    `;

    const [result] = await conexao.execute(sql, [nome, email, senha]);

    return result.insertId;
}