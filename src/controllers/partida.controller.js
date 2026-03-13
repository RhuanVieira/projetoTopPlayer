import * as partidaModel from '../models/partida.models.js'

export async function listar(req, res) {
    try {
        const partida = await partidaModel.listarPartida();
        console.log("verificando...")
        console.log(partida)
        return res.status(200).json(partida);
    } 
    catch (error) {
        return res.status(500).json({ error: 'Erro ao listar players' });
    }
}


export async function criar(req, res) {
    
        const { jogos_id, player_id, pontos } = req.body;

        if (!jogos_id || !player_id || !pontos) {
            return res.status(400).json({ msg: 'jogos_id e player_id e pontos são obrigatórios' });
        }

        const id = await partidaModel.criarPartida(jogos_id, player_id, pontos);

        return res.status(201).json({ msg: 'partida criado com sucesso', id });
    
        return res.status(500).json({ error: 'Erro ao criar partida' });
    
}


export async function deletar(req, res) {
    
        const id = req.params.id;
        const partida = await partidaModel.deletarPlayer(id)
        if (!partida){
            return res.status(400).json({msg:"O id deve ser escolhido"});
        }

        console.log(partida)

        return res.status(200).json({ msg: 'partida deletado com sucesso' });
}