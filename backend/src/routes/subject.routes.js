const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Subjects endpoint scaffolded but not implemented yet.',
  });
});

router.get('/:id', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Subject detail endpoint scaffolded but not implemented yet.',
  });
});

router.get('/:id/topics/:topicId', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Topic detail endpoint scaffolded but not implemented yet.',
  });
});

module.exports = router;
