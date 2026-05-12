const path = require('path');
const express = require('express');
const { getHealthReport } = require('./healthCheck');

function optionalRequire(name, fallback) {
  try {
    return require(name);
  } catch (error) {
    return fallback;
  }
}

const dotenv = optionalRequire('dotenv', { config: () => ({}) });
const cors = optionalRequire('cors', () => (req, res, next) => next());
const cookieParser = optionalRequire('cookie-parser', () => (req, res, next) => next());
const helmet = optionalRequire('helmet', () => (req, res, next) => next());

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 4000;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(helmet());
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Quizzo backend is running.',
  });
});

app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/subjects', require('./src/routes/subject.routes'));
app.use('/api/quiz', require('./src/routes/quiz.routes'));
app.use('/api/user', require('./src/routes/user.routes'));
app.use('/api/leaderboard', require('./src/routes/leaderboard.routes'));

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

app.use(require('./src/middleware/errorHandler'));

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
