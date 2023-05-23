const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('==>', res)
    throw new AuthError('Необходима авторизаци');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;
  } catch (err) {
    throw new AuthError('Необходима авторизаци');
  }

  next();
};

module.exports = auth;
