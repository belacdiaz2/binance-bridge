





Inicio



Editar con el chat
BotsAlpha
BotsAlpha

Principal
Close
La respuesta de Base44 está lista.
Respuesta de Base44
No, no está activo. Revisé el servidor y no hay nada guardado:

0 configuraciones y 0 llaves en la base de datos: el guardado nunca se completó, así que tampoco hay operaciones registradas.
El motivo no son tus llaves: Binance rechaza las conexiones desde la región donde vive este servidor (EE. UU., error 451). Cualquier guardado que valide contra Binance falla ahí.
El motor programado sí está encendido y corre cada 5 minutos, pero sin configuración activa no ejecuta nada.
Para que opere de verdad hay que apuntar el motor a un exchange al que este servidor sí llegue (MEXC, BingX, Gate u OKX responden bien) o pasar por un puente propio fuera de EE. UU. Dime por cuál te vas y lo dejo operando.

3 hours ago


Tu mensaje
Y si agregamos un vpn?

3 hours ago


Revertir
Respuesta de Base44

Pensó durante 8s
Un VPN no resuelve esto: las órdenes no salen de tu teléfono ni de tu PC, salen del servidor de la app (que está en EE. UU.). Un VPN en tu equipo solo cambia la IP de tu navegador, no la del servidor.

Lo que sí funciona es un puente: un proxy pequeño en un servidor tuyo fuera de EE. UU. que reciba las órdenes de la app y las reenvíe a Binance. Yo puedo dejar la app preparada para usar ese puente con un token propio, así Binance ve otra región.

Dos advertencias antes de seguir: nunca uses un VPN o proxy público/gratuito para esto, verían tus API keys en texto plano y podrían vaciar la cuenta; y el puente tiene que ser tuyo, con su propio secreto.

Si no tienes un servidor propio, lo pragmático es operar en MEXC o BingX, que sí responden desde este servidor y funcionan con la misma lógica de márgenes y TP/SL que ya está montada.

¿Tienes un VPS o servidor fuera de EE. UU.? Si sí, te dejo la app lista para pegar la URL del puente.

3 hours ago


Tu mensaje
No , estoy operando en Binance ,cómo podemos hacer

3 hours ago


Revertir
Respuesta de Base44
Con una máquina fuera de EE. UU. sí se resuelve: dejo la app preparada para enviar las órdenes a Binance a través de un puente tuyo.


Actualicé binance, bot Engine y 5 más
Respuesta de Base44
La app ya está lista para eso: en Configuración → Puente de conexión puedes poner la URL y el token de tu puente, y todas las órdenes saldrán por ahí.

Lo que falta es la máquina que haga de puente, porque las órdenes salen del servidor de la app, no de tu navegador. Dos caminos reales:

VPS barato fuera de EE. UU. (Europa o Latinoamérica, ~5 USD/mes): lo más estable, corre 24/7 aunque apagues la PC.
Tu propia PC en Venezuela con un túnel (Cloudflare Tunnel, gratis): Binance vería tu IP de casa, pero la PC debe quedar encendida mientras el bot opere.
Dime cuál prefieres y te doy el script exacto del puente para pegarlo, más el token que debe llevar.

3 hours ago


Tu mensaje
Dónde puedo adquirir un servidor en namecheap?

3 hours ago


Revertir
Respuesta de Base44
Voy a verificar las ubicaciones de los servidores de Namecheap, porque si están en EE. UU. Binance los seguiría bloqueando.


Busqué en la web
Respuesta de Base44
En Namecheap está en Hosting → VPS Hosting (planes Spark $3.88, Pulsar $6.88 al año con descuento), pero acabo de verificar algo importante: sus VPS solo existen en Phoenix, Arizona. Es decir, comprar ahí no resuelve el bloqueo de Binance; seguirías en la misma situación.

Necesitas un proveedor donde puedas elegir la región al comprar:

Hostinger VPS → región São Paulo (Brasil): la más cercana a ti y la mejor latencia.
Contabo → Alemania: la más barata, ~5 USD/mes.
Vultr / DigitalOcean → Frankfurt, Ámsterdam o São Paulo, ~6 USD/mes, aceptan cripto.
Elige el plan más pequeño (1–2 GB de RAM sobra) con Ubuntu 22.04 o 24.04. Cuando lo tengas con su IP, te paso el puente listo para pegar y lo conectamos a la app.

3 hours ago


Tu mensaje
Que requiero un hostin

3 hours ago


Revertir
Respuesta de Base44

Pensó durante 3s
Sí, pero ojo con la palabra: no sirve el "hosting web" compartido (el de páginas y WordPress), porque ahí no puedes dejar un programa corriendo ni abrir puertos.

Lo que necesitas es un VPS: un servidor virtual con acceso root donde se instala Node.js y el puente queda encendido 24/7. El plan más pequeño (1–2 GB de RAM, Ubuntu 22.04/24.04) es más que suficiente, y no hace falta panel cPanel.

Con el VPS te dan una IP; si además quieres HTTPS limpio, conviene un dominio barato apuntando a esa IP (también sirve la IP, pero un dominio es más seguro y estable).

3 hours ago


Tu mensaje
https://binance-bridge-o4pu.onrender.com

an hour ago


Revertir
Respuesta de Base44
Voy a probar el puente que desplegaste para ver si responde y si Binance lo acepta.


Creé binance bridge
Respuesta de Base44
Probé tu puente: responde en la raíz, pero /fapi/v1/... devuelve 404, así que la app no puede pedir precios ni enviar órdenes. Y como el plan gratuito de Render usa la región de Oregon (EE. UU.), Binance lo bloquearía igual.

Te dejé en la app el archivo binance-bridge.md con los dos archivos exactos para pegarlos en Render (el proxy de /fapi/*), la región a elegir (Frankfurt) y la prueba rápida para confirmar con {"code":0,...}.

an hour ago


Tu mensaje
Ya cambié los archivos en Render, prueba el puente de nuevo

an hour ago


Revertir
Respuesta de Base44

Retested your bridge
Respuesta de Base44
El puente ya funciona: /fapi/v1/time y el precio de BTCUSDT responden 200 desde el servidor de la app, así que el bloqueo 451 quedó resuelto.

Dos detalles: no tiene token configurado en Render (acepta cualquier petición, conviene poner BRIDGE_TOKEN), y Binance acaba de banear temporalmente esa IP (error 418) por exceso de peticiones — probablemente por mis pruebas seguidas; se libera solo en unos 35 minutos.

Ahora pega https://binance-bridge-o4pu.onrender.com en Configuración → URL del puente, guarda, y el bot podrá operar.

an hour ago


Tu mensaje
Listo y shora

an hour ago


Revertir
Respuesta de Base44
Voy a revisar cómo quedó guardada tu configuración ahora.


Checked your saved setup
Respuesta de Base44
Todavía no hay nada guardado en la app: ni la URL del puente ni las llaves. Falta esto, en Configuración:

URL del puente: https://binance-bridge-o4pu.onrender.com
Token: solo si pusiste BRIDGE_TOKEN en Render; si no, déjalo vacío.
API Key y Secret de Binance Futuros (sin permiso de retiros).
Luego Guardar y aplicar cambios y por último Iniciar bot. Ojo: espera ~30 minutos desde mis pruebas, porque Binance tiene esa IP en pausa por exceso de peticiones.

an hour ago


Tu mensaje
Ya guardé la URL y las llaves, revisa si conecta

14 minutes ago


Revertir
Respuesta de Base44
Reviso lo guardado y pruebo la conexión contra Binance.


Tested the Binance connection
Respuesta de Base44
No hay nada guardado, así que el guardado no llegó a completarse. Voy a ver el formulario y probar la ruta de guardado con llaves de prueba para ver qué error sale.


Revisé tu app
Respuesta de Base44
La conexión por el puente sí funciona; el problema es que Binance rechazó las llaves y la app no te lo mostró cerca del botón. Voy a corregir eso.


Actualicé Dashboard Page
Respuesta de Base44
Probado de punta a punta: el puente responde bien desde el servidor de la app, pero Binance rechaza las llaves (error de permisos), así que el guardado se cancela completo y por eso no queda nada.

Dos cosas: ahora el error aparece justo debajo del botón Guardar, y en Binance revisa que la llave tenga activado Enable Futures (y sin restricción de IP, o con la IP 74.220.51.161). Luego guarda otra vez.

13 minutes ago


Tu mensaje
Ya activé el permiso de Futuros, guarda de nuevo y prueba

5 minutes ago


Revertir
Respuesta de Base44

Checked saved keys and connection
Respuesta de Base44
Las llaves solo existen en tu navegador, así que el guardado lo tienes que disparar tú: en Configuración vuelve a pegar API Key y Secret y pulsa Guardar y aplicar cambios. Avísame cuando salga el aviso verde y hago la prueba de conexión, saldo y precio al instante.

5 minutes ago


Tu mensaje
Ya guardé, revisa si conecta ahora y si tiene permiso para futuro pq lo probé con python

3 minutes ago


Revertir
Respuesta de Base44

Checked connection and futures permission
Respuesta de Base44
Nada llegó al servidor todavía. Voy a hacer que la app guarde el motivo exacto que responde Binance, para verlo desde aquí.


Actualicé bot Settings
2 minutes ago


Tu mensaje
Approved.

2 minutes ago


Revertir
Respuesta de Base44

Captured Binance's exact rejection reason
2 minutes ago


Tu mensaje
Approved

2 minutes ago


Revertir
Respuesta de Base44
El precio ya llega por el puente; ahora aíslo por qué las llamadas con llaves fallan.


Probed the bridge behaviour
Respuesta de Base44
El puente tiene un error propio: intenta firmar las peticiones y no encuentra la clave. Reviso el código del puente que dejamos documentado.


Actualicé binance, bot Settings y binance bridge
Respuesta de Base44
Ya sé qué pasa: no es Binance ni tus llaves. Los precios sí pasan por el puente, pero el index.js que tienes en Render intenta firmar las peticiones y se cae porque le falta la variable BINANCE_SECRET.

Arreglo: en Render → tu servicio → pestaña del proyecto → reemplaza index.js por el de la guía (la app ya firma sola; el puente solo reenvía) y haz Redeploy. Avisas y pruebo de inmediato.

a minute ago


Tu mensaje
Cuál es el de la guía?

a few seconds ago


Revertir
Respuesta de Base44

Pensó durante 5s
Es este (el mismo de la guía). En Render, abre tu servicio → pestaña Files (o el repo) → index.js, borra todo y pega esto, luego Manual Deploy:

const express = require('express');

const app = express();
const PORT = process.env.PORT || 10000;
const TOKEN = process.env.BRIDGE_TOKEN || '';
const UPSTREAM = 'https://fapi.binance.com';

app.use(express.text({ type: '*/*' }));

app.all('/fapi/*', async (req, res) => {
  if (TOKEN && req.header('x-bridge-token') !== TOKEN) {
    return res.status(401).json({ code: -2015, msg: 'Token del puente inválido' });
  }

  const headers = {};
  const apiKey = req.header('x-mbx-apikey');
  if (apiKey) headers['X-MBX-APIKEY'] = apiKey;
  if (req.method !== 'GET') headers['Content-Type'] = 'application/x-www-form-urlencoded';

  try {
    const upstream = await fetch(UPSTREAM + req.originalUrl, {
      method: req.method,
      headers,
      body: req.method === 'GET' ? undefined : req.body || undefined,
      signal: AbortSignal.timeout(15000),
    });
    const text = await upstream.text();
    res.status(upstream.status).type('json').send(text);
  } catch (err) {
    res.status(502).json({ code: -1, msg: 'Puente sin conexión: ' + err.message });
  }
});

app.get('/', (req, res) => res.send('Puente Binance Activo y Operativo'));
app.listen(PORT, () => console.log('Puente escuchando
