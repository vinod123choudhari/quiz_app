const express = require('express');

const router = express.Router();

router.post('/register', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Registration endpoint scaffolded but not implemented yet.',
  });
});

router.post('/login', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Login endpoint scaffolded but not implemented yet.',
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Logged out locally. Persistent auth flow is not implemented yet.',
  });
});

router.get('/me', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Current-user endpoint scaffolded but not implemented yet.',
  });
});

module.exports = router;
