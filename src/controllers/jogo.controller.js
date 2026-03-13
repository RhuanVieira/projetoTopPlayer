import * as jogoModel from '../models/jogo.models.js';

export async function listar(req, res) {
    try {
        const jogos = await jogoModel.ListarJogo();
        console.log("verificando...")
        console.log(jogos)
        return res.status(200).json(jogos);
    } 
    catch (error) {
        return res.status(500).json({ error: 'Erro ao listar jogos' });
    }
}

export async function buscar(req, res) {
        const id = req.params.id;
        const jogo = await jogoModel.BuscarJogoPorId(id);

        if (!jogo) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }

        return res.status(200).json(jogo);
}

export async function criar(req, res) {
    try {
        const { nome, genero } = req.body;

        if (!nome || !genero) {
            return res.status(400).json({ msg: 'Nome e gênero são obrigatórios' });
        }

        const id = await jogoModel.criarJogos(nome, genero);

        return res.status(201).json({ msg: 'Jogo criado com sucesso', id });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar jogo' });
    }
}

export async function atualizar(req, res) {
        const id = req.params.id;
        const { nome, genero } = req.body;

        // validação mínima
        if (!nome || !genero) {
            return res.status(400).json({ msg: 'Pelo menos um campo (nome ou gênero) deve ser enviado' });
        }
        const resultado = await jogoModel.Atualizar(nome, genero, id);
        console.log(resultado);

        return res.status(200).json({ msg: 'Jogo atualizado com sucesso' });
}

export async function deletar(req, res) {
    
        const id = req.params.id;
        const jogo = await jogoModel.DeletarJogo(id)
        if (!jogo){
            return res.status(400).json({msg:"O id deve ser escolhido"});
        }

        console.log(jogo)

        return res.status(200).json({ msg: 'Jogo deletado com sucesso' });
}