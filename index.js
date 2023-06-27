
import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Transfer-Encoding', 'chunked');

  // Enviar o tempo a cada segundo
  const interval = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    res.write(`data: ${currentTime}\n\n`);
  }, 1000);

  // Finalizar a conexão após 10 segundos (apenas para este exemplo)
  setTimeout(() => {
    clearInterval(interval);
    res.end();
  }, 10000);
});

app.listen(3000, () => {
  console.log('Servidor escutando na porta 3000');
});
