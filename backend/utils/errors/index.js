const AuthError = require('./AuthError');
const BadRequestError = require('./BadRequestError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');

module.exports = {
  AuthError, BadRequestError, ConflictError, ForbiddenError, NotFoundError,
};
