const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Global leaderboard endpoint scaffolded but not implemented yet.',
  });
});

router.get('/:subjectId', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Subject leaderboard endpoint scaffolded but not implemented yet.',
  });
});

module.exports = router;
