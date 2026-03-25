import express from 'express';
import usuarioRoutes from './routes/usuario.route.js';
import jogosRoutes from './routes/jogo.route.js';
import playersRoutes from './routes/player.route.js';
import partidasRoutes from './routes/partida.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API TopPlayer funcionando 🚀");
});


app.use('/usuarios', usuarioRoutes);
app.use("/jogos", jogosRoutes);
app.use("/players", playersRoutes);
app.use("/partidas", partidasRoutes);

export default app;