// Express-г импортлох
const express = require('express');
// Router үүсгэх
const router = express.Router();
// Controller-уудыг импортлох
const {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
} = require('../controllers/bookController');

// POST /api/books - ном үүсгэх
router.post('/', createBook);
// GET /api/books - бүх номыг авах
router.get('/', getAllBooks);

// PUT /api/books/:id - ном засах
router.put('/:id', updateBook);

// DELETE /api/books/:id - ном устгах
router.delete('/:id', deleteBook);

// Router-ийг экспортлох
module.exports = router;
