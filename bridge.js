const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const BINANCE_FUTURES_URL = "https://fapi.binance.com";

app.get('/', (req, res) => {
  res.send('Puente Binance Activo y Operativo');
});

app.post('/api/fapi/*', async (req, res) => {
  try {
    const endpointPath = req.params[0];
    const { apiKey, apiSecret, method = 'POST', params = {} } = req.body;

    if (!apiKey || !apiSecret) {
      return res.status(400).json({ error: "Faltan credenciales apiKey o apiSecret" });
    }

    const timestamp = Date.now();
    const queryParams = { ...params, timestamp };

    const queryString = Object.keys(queryParams)
      .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    const signature = crypto
      .createHmac('sha256', apiSecret)
      .update(queryString)
      .digest('hex');

    const targetUrl = `${BINANCE_FUTURES_URL}/fapi/${endpointPath}?${queryString}&signature=${signature}`;

    const binanceResponse = await axios({
      method: method.toLowerCase(),
      url: targetUrl,
      headers: {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/json'
      }
    });

    return res.status(binanceResponse.status).json(binanceResponse.data);
  } catch (error) {
    const errData = error.response ? error.response.data : { message: error.message };
    const errStatus = error.response ? error.response.status : 500;
    return res.status(errStatus).json(errData);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor puente escuchando en puerto ${PORT}`);
});
