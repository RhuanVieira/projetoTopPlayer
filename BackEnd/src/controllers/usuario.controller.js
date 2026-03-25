import * as usuarioModel from '../models/usuario.models.js';
import crypto from 'crypto';

// LISTAR
export async function listar(req, res) {
    try {
        const usuarios = await usuarioModel.ListarUsuarios();
        res.status(200).json(usuarios);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro ao listar usuários" });
    }
}

// BUSCAR POR ID
export async function buscarPorId(req, res) {
    try {
        const id = req.params.id;
        const usuario = await usuarioModel.buscarUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        res.status(200).json(usuario);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro ao buscar usuário" });
    }
}

// CRIAR
export async function criar(req, res) {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ msg: "Campos obrigatórios" });
        }

        const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

        await usuarioModel.criarUsuario(nome, email, senhaHash);

        res.status(201).json({ msg: "Usuário criado com sucesso" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro ao criar usuário" });
    }
}

// LOGIN (o seu já tava certo)
export async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ msg: 'Email e senha são obrigatórios' });
        }

        const usuario = await usuarioModel.buscarUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ msg: 'Credenciais inválidas' });
        }

        const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

        if (senhaHash !== usuario.senha_hash) {
            return res.status(401).json({ msg: 'Credenciais inválidas' });
        }

        const token = crypto.randomBytes(24).toString('hex');

        res.status(200).json({
            msg: 'Login bem-sucedido',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Erro no login' });
    }
}

// ATUALIZAR
export async function atualizar(req, res) {
    try {
        const id = req.params.id;
        const { nome, email } = req.body;

        await usuarioModel.atualizarUsuarios(nome, email, id);

        res.status(200).json({ msg: "Usuário atualizado" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro ao atualizar" });
    }
}

// DELETAR
export async function deletar(req, res) {
    try {
        const id = req.params.id;

        await usuarioModel.deletarUsuarios(id);

        res.status(200).json({ msg: "Usuário deletado" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro ao deletar" });
    }
}