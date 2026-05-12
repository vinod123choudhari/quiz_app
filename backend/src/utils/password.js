async function hashPassword(plainText) {
  let bcrypt;
  try {
    bcrypt = require('bcryptjs');
  } catch (error) {
    throw new Error('bcryptjs is not installed yet.');
  }

  return bcrypt.hash(plainText, 12);
}

async function comparePassword(plainText, hash) {
  let bcrypt;
  try {
    bcrypt = require('bcryptjs');
  } catch (error) {
    throw new Error('bcryptjs is not installed yet.');
  }

  return bcrypt.compare(plainText, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
};
