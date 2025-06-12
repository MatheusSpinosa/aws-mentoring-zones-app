const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Função para buscar a zona de disponibilidade da AWS (compatível com IMDSv2)
async function getAvailabilityZone() {
  try {
    // Primeiro, tenta obter o token IMDSv2
    const tokenResponse = await axios.put(
      'http://169.254.169.254/latest/api/token',
      null,
      { headers: { 'X-aws-ec2-metadata-token-ttl-seconds': '21600' }, timeout: 1000 }
    );
    const token = tokenResponse.data;
    // Usa o token para buscar a zona de disponibilidade
    const response = await axios.get(
      'http://169.254.169.254/latest/meta-data/placement/availability-zone',
      { headers: { 'X-aws-ec2-metadata-token': token }, timeout: 1000 }
    );
    return response.data;
  } catch (error) {
    // Se falhar (ex: fora da AWS ou IMDSv1), tenta sem token
    try {
      const response = await axios.get('http://169.254.169.254/latest/meta-data/placement/availability-zone', { timeout: 1000 });
      return response.data;
    } catch (err) {
      return 'zona desconhecida';
    }
  }
}

app.get('/', async (req, res) => {
  const zone = await getAvailabilityZone();
  res.send(`<html><body style='font-family:sans-serif;text-align:center;margin-top:50px;'><h1>disponível em <span style='color:#0078d7'>${zone}</span></h1></body></html>`);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
