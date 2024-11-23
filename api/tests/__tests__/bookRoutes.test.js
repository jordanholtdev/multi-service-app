const request = require('supertest');
const express = require('express');
const bookRoutes = require('../routes/bookRoutes');
const Book = require('../models/book');
const logger = require('../utils/logger');

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

jest.mock('../models/book');
jest.mock('../utils/logger');

describe('GET /books', () => {
  it('should be a GET request', async () => {
    const response = await request(app).get('/books');

    expect(response.request.method).toBe('GET');
  });

  it('should fetch all books and return status 200', async () => {
    const mockBooks = [
      {
        title: 'Book 1',
        author: 'test',
        isbn: '1234',
        rating: 3,
        catogoery: 'scifi',
        createdAt: Date.now(),
      },
    ];
    Book.find.mockResolvedValue(mockBooks);

    const response = await request(app).get('/books');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockBooks);
    expect(logger.info).toHaveBeenCalledWith('Fetching all books');
    expect(logger.info).toHaveBeenCalledWith(
      `Fetched ${mockBooks.length} books`,
    );
  });

  it('should return status 500 if there is an error', async () => {
    const errorMessage = 'Database error';
    Book.find.mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get('/books');

    expect(response.status).toBe(500);
    expect(response.body.error.message).toBe('Internal Server Error');
    expect(response.body.error.details).toBe(errorMessage);
    expect(logger.error).toHaveBeenCalledWith(
      `Error fetching books: ${errorMessage}`,
    );
  });
});

describe('GET /books/:id', () => {
  it('should fetch a book by ID and return status 200', async () => {
    const mockBook = {
      _id: '1',
      title: 'Book 1',
      author: 'test',
      isbn: '1234',
      rating: 3,
      category: 'scifi',
      createdAt: Date.now(),
    };
    Book.findById.mockResolvedValue(mockBook);

    const response = await request(app).get('/books/1');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockBook);
    expect(logger.info).toHaveBeenCalledWith('Book found: ID 1');
  });

  it('should return status 404 if the book is not found', async () => {
    Book.findById.mockResolvedValue(null);

    const response = await request(app).get('/books/1');

    expect(response.status).toBe(404);
    expect(response.body.error.message).toBe('Book not found');
    expect(response.body.error.details).toBe('No book with ID 1');
    expect(logger.warn).toHaveBeenCalledWith('Book not found: ID 1');
  });

  it('should return status 500 if there is an error', async () => {
    const errorMessage = 'Database error';
    Book.findById.mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get('/books/1');

    expect(response.status).toBe(500);
    expect(response.body.error.message).toBe('Internal Server Error');
    expect(response.body.error.details).toBe(errorMessage);
    expect(logger.error).toHaveBeenCalledWith(
      `Error fetching book with ID 1: ${errorMessage}`,
    );
  });
});
