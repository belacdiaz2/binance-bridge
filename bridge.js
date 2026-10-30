const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const BINANCE_FUTURES_URL = "https://fapi.binance.com";

// Verificación de estado
app.get('/', (req, res) => {
  res.json({ status: "ok", message: "Puente Binance Activo y Operativo" });
});

// Manejador universal para cualquier ruta de /fapi
app.all(['/fapi/*', '/api/fapi/*'], async (req, res) => {
  try {
    // Extrae la ruta real después de /fapi/
    const fullPath = req.originalUrl.replace(/^\/api/, '');
    const { apiKey, apiSecret, params: customParams = {} } = req.body || {};

    const key = apiKey || req.headers['x-mbx-apikey'];
    const secret = apiSecret || req.headers['x-mbx-secret'];

    // Para peticiones públicas (precios, libros, etc.)
    if (!secret && !key) {
      const response = await axios({
        method: req.method.toLowerCase(),
        url: `${BINANCE_FUTURES_URL}${fullPath}`,
        headers: { 'Content-Type': 'application/json' }
      });
      return res.status(response.status).json(response.data);
    }

    // Para peticiones firmadas (órdenes, saldos)
    const timestamp = Date.now();
    const queryParams = { ...req.query, ...customParams, timestamp };

    const queryString = Object.keys(queryParams)
      .map(k => `${k}=${encodeURIComponent(queryParams[k])}`)
      .join('&');

    const signature = crypto
      .createHmac('sha256', secret)
      .update(queryString)
      .digest('hex');

    const targetUrl = `${BINANCE_FUTURES_URL}${req.path.replace(/^\/api/, '')}?${queryString}&signature=${signature}`;

    const binanceResponse = await axios({
      method: req.method.toLowerCase(),
      url: targetUrl,
      headers: {
        'X-MBX-APIKEY': key,
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
  console.log(`Servidor puente escuchando en el puerto ${PORT}`);
});
