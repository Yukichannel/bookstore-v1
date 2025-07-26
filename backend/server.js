// Express.js-г импортлох
const express = require('express');
// Mongoose-г импортлох (MongoDB-тэй холбогдох)
const mongoose = require('mongoose');
// CORS-г импортлох (өөр домэйнээс хүсэлт авах боломжтой болгоно)
const cors = require('cors');
// Орчны хувьсагчдыг (.env файлаас) ачаалах
require('dotenv').config();
// Book моделийг импортлох
const Book = require('./model/Book');
// Номтой холбоотой route-уудыг импортлох
const bookRoutes = require('./routes/bookRoutes');

// Express апп үүсгэх
const app = express();

// Серверийн портын дугаарыг тохируулах (орчны хувьсагчаас авах, байхгүй бол 5005)
const PORT = process.env.PORT || 5005;

// CORS middleware ашиглах - фронтенд домэйнийг зөвшөөрөх
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Local development
      'https://6-3-4-bookstore-4-4ryh.vercel.app', // Production frontend
      'https://6-3-4-bookstore-4-git-master-hellobraincodes-projects.vercel.app', // Git branch deployments
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// JSON хүсэлтийг зөвшөөрөх middleware
app.use(express.json());

// Test route for debugging
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date() });
});

// /api/books замд bookRoutes-г ашиглах
app.use('/api/books', bookRoutes);

// Үндсэн хуудасны GET хүсэлтэд хариу өгөх
app.get('/', (req, res) => {
  // Хариу илгээх
  res.send('Номын дэлгүүрийн API ажиллаж байна!');
});

// Туршилтын ном нэмэх route
app.get('/test-add-book', async (req, res) => {
  try {
    // Шинэ ном үүсгэх
    const newbook = new Book({
      title: 'Стив Жобс',
      author: 'Стив Жобс',
      year: 2015,
    });
    // Номыг хадгалах
    const savedBook = await newbook.save();
    // Амжилттай бол 201 статус илгээх
    res.status(201).json(savedBook);
  } catch (error) {
    // Алдаа гарвал 400 статус илгээх
    res.status(400).json({ error: error.message });
  }
});

// MongoDB-тэй холбогдох
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // Холболт амжилттай бол
    console.log('MongoDB холболт амжилттай!');
    // Серверийг сонсох
    app.listen(PORT, () => {
      // Сервер амжилттай ажиллаж эхэлсэн тухай мэдээлэл
      console.log(`http://localhost:${PORT} Сервер  порт дээр ажиллаж байна!`);
    });
  })
  .catch((err) => {
    // Холболт амжилтгүй бол алдааг хэвлэх
    console.error('MongoDB холболт эхлээгүй:', err);
  });
