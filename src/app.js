import express from 'express';
import usuarioRoutes from './routes/usuario.route.js';
import jogosRoutes from './routes/jogo.route.js';
import playersRoutes from './routes/player.route.js';
import partidasRoutes from './routes/partida.routes.js';
import rankingRoutes from './routes/ranking.route.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/usuarios', usuarioRoutes);
app.use("/jogos", jogosRoutes);
app.use("/players", playersRoutes);
app.use("/partidas", partidasRoutes);
app.use("/ranking", rankingRoutes);

export default app;