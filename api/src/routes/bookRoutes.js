const express = require('express');
const Book = require('../models/book');
const logger = require('../utils/logger');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    logger.info('Fetching all books');
    const result = await Book.find();
    logger.info(`Fetched ${result.length} books`);
    res.status(200).json({ data: result });
  } catch (err) {
    logger.error(`Error fetching books: ${err.message}`);
    res.status(500).json({
      error: { message: 'Internal Server Error', details: err.message },
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    if (!books) {
      logger.warn(`Book not found: ID ${req.params.id}`);
      res.status(404).json({
        error: {
          message: 'Book not found',
          details: `No book with ID ${req.params.id}`,
        },
      });
      return;
    }
    logger.info(`Book found: ID ${req.params.id}`);
    res.status(200).json({ data: books });
  } catch (err) {
    logger.error(
      `Error fetching book with ID ${req.params.id}: ${err.message}`,
    );
    res.status(500).json({
      error: { message: 'Internal Server Error', details: err.message },
    });
  }
});

router.post('/', async (req, res) => {
  try {
    logger.info('Creating book');
    const book = new Book(req.body);
    const result = await book.save();
    logger.info(`Book created: ID ${result._id}`);
    res.status(201).json({ data: result });
  } catch (err) {
    logger.error(`Error creating book: ${err.message}`);
    res.status(500).json({
      error: { message: 'Internal Server Error', details: err.message },
    });
  }
});

module.exports = router;
