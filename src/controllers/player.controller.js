import * as playerModel from '../models/player.models.js';

export async function listar(req, res) {
    try {
        const jogos = await playerModel.listarPlayer();
        console.log("verificando...")
        console.log(jogos)
        return res.status(200).json(jogos);
    } 
    catch (error) {
        return res.status(500).json({ error: 'Erro ao listar players' });
    }
}

export async function buscar(req, res) {
        const id = req.params.id;
        const jogo = await playerModel.buscarPlayer(id);

        if (!jogo) {
            return res.status(404).json({ error: 'player não encontrado' });
        }

        return res.status(200).json(jogo);
}

export async function criar(req, res) {
    try {
        const { nickname, plataforma } = req.body;

        if (!nickname || !plataforma) {
            return res.status(400).json({ msg: 'nickname e plataforma são obrigatórios' });
        }

        const id = await playerModel.criarPlayer(nickname, plataforma);

        return res.status(201).json({ msg: 'player criado com sucesso', id });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar player' });
    }
}

export async function atualizar(req, res) {
        const id = req.params.id;
        const { nickname, plataforma } = req.body;

        // validação mínima
        if (!nickname || !plataforma) {
            return res.status(400).json({ msg: 'Pelo menos um campo (nickname ou plataforma) deve ser enviado' });
        }
        const resultado = await playerModel.atualizarPlayer(nickname, plataforma, id);
        console.log(resultado);

        return res.status(200).json({ msg: 'player atualizado com sucesso' });
}

export async function deletar(req, res) {
    
        const id = req.params.id;
        const jogo = await playerModel.deletarPlayer(id)
        if (!jogo){
            return res.status(400).json({msg:"O id deve ser escolhido"});
        }

        console.log(jogo)

        return res.status(200).json({ msg: 'Player deletado com sucesso' });
}