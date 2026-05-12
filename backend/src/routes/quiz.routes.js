const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/start', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Quiz start endpoint scaffolded but not implemented yet.',
  });
});

router.post('/submit', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Quiz submit endpoint scaffolded but not implemented yet.',
  });
});

router.get('/attempts', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Quiz attempts endpoint scaffolded but not implemented yet.',
  });
});

router.get('/attempts/:id', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Quiz attempt detail endpoint scaffolded but not implemented yet.',
  });
});

module.exports = router;
