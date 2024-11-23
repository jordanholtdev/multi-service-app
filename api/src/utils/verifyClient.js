const logger = require('../utils/logger');

const allowedClientIds = [process.env.CLIENT_ID || 'test-client'];

const verifyClientId = (req, res, next) => {
  const clientId = req.headers['x-client-id']; // Use a custom header for Client ID

  if (!clientId) {
    logger.warn('Client ID missing in request', {
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });
    return res.status(400).json({ error: { message: 'Client ID is missing' } });
  }

  if (!allowedClientIds.includes(clientId)) {
    logger.warn('Unauthorized access attempt with invalid Client ID', {
      clientId,
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });
    return res
      .status(401)
      .json({ error: { message: 'Unauthorized: Invalid Client ID' } });
  }

  logger.info('Authorized request', {
    clientId,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  next();
};

module.exports = verifyClientId;
