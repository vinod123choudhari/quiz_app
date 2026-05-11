const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const { getHealthReport } = require('./healthCheck');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.get('/health', async (req, res) => {
  try {
    const report = await getHealthReport();
    const statusCode = report.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(report);
  } catch (error) {
    res.status(500).json({
      status: 'down',
      services: {
        server: {
          status: 'up',
          uptimeSec: Math.floor(process.uptime()),
          timestamp: new Date().toISOString(),
        },
      },
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
