// Express-г импортлох
const express = require('express');
// Router үүсгэх
const router = express.Router();
// Controller-уудыг импортлох
const { createBook, getAllBooks } = require('../controllers/bookController');

// POST /api/books - ном үүсгэх
router.post('/', createBook);
// GET /api/books - бүх номыг авах
router.get('/', getAllBooks);

// Router-ийг экспортлох
module.exports = router;
