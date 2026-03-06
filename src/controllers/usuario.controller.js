import * as usuarioModel from '../models/usuario.models.js';
import crypto from 'crypto';

export async function listar(req, res) {
    const usuarios = await usuarioModel.ListarUsuarios();
    res.status(200).json(usuarios);
}

export async function buscarPorId(req, res) {
    const id  = req.params.id;
    const usuario = await usuarioModel.buscarUsuarioPorId(id);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
}

export async function criar(req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(404).json({ msg: 'Nome, email e senha são obrigatórios' });
    }

    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');
    const id = await usuarioModel.criarUsuario(nome, email, senhaHash);
    res.status(201).json({ msg: 'Usuário criado com sucesso' });
}

export async function login(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ msg: 'Email e senha são obrigatórios' });
    }

    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
    if (!usuario) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');
    if (senhaHash !== usuario.senha_hash) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = crypto.randomBytes(24).toString('hex');
    return res.status(200).json({ msg: 'Login bem-sucedido', token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
}