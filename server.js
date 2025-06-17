const express = require('express');
const client = require('prom-client');
const app = express();
const port = 5000;

// Collect default Node.js metrics
client.collectDefaultMetrics({ register: client.register });

// Custom counter for tracking /flip-coins requests
const flipCounter = new client.Counter({
  name: 'flip_coins_requests_total',
  help: 'Total number of /flip-coins requests received',
});

// Metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Flip-coins endpoint
app.get('/flip-coins', (request, response) => {
  flipCounter.inc(); // Increment the counter on each call

  const times = parseInt(request.query.times);

  if (times && times > 0) {
    let heads = 0;
    let tails = 0;

    for (let i = 0; i < times; i++) {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        heads++;
      } else {
        tails++;
      }
    }

    response.json({ heads, tails });
  } else {
    response.send("Hey! You need to send times!!!");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://${port}`);
});
