function requireJsonWebToken() {
  try {
    return require('jsonwebtoken');
  } catch (error) {
    throw new Error('jsonwebtoken is not installed yet.');
  }
}

function signToken(payload) {
  const jwt = requireJsonWebToken();
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured.');
  }

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRY || '7d',
  });
}

function verifyToken(token) {
  const jwt = requireJsonWebToken();
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured.');
  }

  return jwt.verify(token, secret);
}

module.exports = {
  signToken,
  verifyToken,
};
