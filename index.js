
import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

let database_number = [];

// Endpoint SSE "/realtime"
app.get('/realtime', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Envia o valor atual do array para o cliente
  res.write(`data: ${JSON.stringify(database_number)}\n\n`);

  // Mantém a conexão aberta e atualiza o cliente com novos valores
  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify(database_number)}\n\n`);
  }, 1000);

  // Encerra a conexão quando o cliente se desconectar
  req.on('close', () => {
    clearInterval(intervalId);

  });
});

// Endpoint POST "/change"
app.post('/change', (req, res) => {
  const randomNum = Math.floor(Math.random() * 10); // Gera um número aleatório de 0 a 9
  database_number.push(randomNum); // Adiciona o número gerado ao array

  // Envia uma resposta de sucesso ao cliente
  res.status(200).json({ message: 'Number added successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
