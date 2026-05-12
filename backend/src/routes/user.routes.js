const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'User profile endpoint scaffolded but not implemented yet.',
  });
});

router.patch('/profile', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'User profile update endpoint scaffolded but not implemented yet.',
  });
});

router.get('/progress', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'User progress endpoint scaffolded but not implemented yet.',
  });
});

router.get('/stats', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'User stats endpoint scaffolded but not implemented yet.',
  });
});

router.get('/performance', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'User performance endpoint scaffolded but not implemented yet.',
  });
});

module.exports = router;
