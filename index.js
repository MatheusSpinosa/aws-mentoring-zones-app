const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Função para buscar a zona de disponibilidade da AWS
async function getAvailabilityZone() {
  try {
    const response = await axios.get('http://169.254.169.254/latest/meta-data/placement/availability-zone', { timeout: 1000 });
    return response.data;
  } catch (error) {
    return 'zona desconhecida';
  }
}

app.get('/', async (req, res) => {
  const zone = await getAvailabilityZone();
  res.send(`<html><body style='font-family:sans-serif;text-align:center;margin-top:50px;'><h1>disponível em <span style='color:#0078d7'>${zone}</span></h1></body></html>`);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
