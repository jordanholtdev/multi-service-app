const winston = require('winston');
const path = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');

// Set the log directory to the root of your project
const logDirectory = path.join(__dirname, '../log'); // '../' moves up to the project root

// Create the log directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  }),
);

// Define daily rotating file transports
const dailyRotateTransport = new DailyRotateFile({
  dirname: logDirectory,
  filename: '%DATE%-combined.log', // e.g., 2024-11-20-combined.log
  datePattern: 'YYYY-MM-DD', // Rotate daily
  zippedArchive: true, // Compress older logs
  maxSize: '20m', // Maximum size per file
  maxFiles: '14d', // Keep logs for 14 days
  level: 'info',
  format: logFormat,
});

const errorRotateTransport = new DailyRotateFile({
  dirname: logDirectory,
  filename: '%DATE%-errors.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '30d',
  level: 'error',
  format: logFormat,
});

// Define transports
const transports = [
  // Console output for development
  new winston.transports.Console({
    level: 'debug', // You can set to 'info' or 'warn' based on your environment
    format: winston.format.combine(winston.format.colorize(), logFormat),
  }),

  // File output for production logs
  new winston.transports.File({
    filename: path.join(logDirectory, 'combined.log'),
    level: 'info',
    format: logFormat,
  }),

  // Optional: separate error logs into a different file
  new winston.transports.File({
    filename: path.join(logDirectory, 'errors.log'),
    level: 'error',
    format: logFormat,
  }),
  // Rotating file transports
  dailyRotateTransport,
  errorRotateTransport,
];

// Create the logger instance
const logger = winston.createLogger({
  level: 'info', // Default log level
  transports,
});

module.exports = logger;
