import dotenv from 'dotenv';
import app from './src/app.js';
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT} http://localhost:${PORT}`);

})