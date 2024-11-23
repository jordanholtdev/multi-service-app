const rateLimit = require('express-rate-limit');
const logger = require('./logger');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each Client ID to 100 requests per window
  message: {
    error: {
      message: 'Too many requests, please try again later.',
    },
  },
  handler: (req, res) => {
    if (request.rateLimit.used === request.rateLimit.limit + 1) {
      // onLimitReached code here
      logger.warn('Rate limit exceeded', {
        path: req.originalUrl,
        method: req.method,
        ip: req.ip,
      });
      res.status(429).json({
        error: {
          message: 'Too many requests, please try again later.',
        },
      });
    }
  },
});

module.exports = apiLimiter;
