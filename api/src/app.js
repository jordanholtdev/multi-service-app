const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const config = require('./config');
const logger = require('./utils/logger');
const verifyClientId = require('./utils/verifyClient');
const apiLimiter = require('./utils/rateLimit');

const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = config.port;
const API_VERSION = 'v1';

// trust the nginx proxy
app.set('trust proxy', 1);

//connect mongoDB and then listen for requests
mongoose
  .connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Use the same log directory as Winston
const logDirectory = path.join(__dirname, 'log');

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
// create write stream for logs
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory,
  compress: 'gzip', // compress rotated files
});

// Add a custom winston logging middleware
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use(verifyClientId); // Custom middleware to verify client ID
app.use(apiLimiter);
app.use(helmet());

// routes

app.get('/', (req, res) => {
  res.redirect(`/${API_VERSION}/books`);
});

// book routes
app.use(`/${API_VERSION}/books`, bookRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render('404');
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(`Error on ${req.originalUrl} - ${err.message}`);
  res.status(500).send('Internal Server Error');
});
