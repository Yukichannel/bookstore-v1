// Express.js-г импортлох
const express = require('express');
// Mongoose-г импортлох (MongoDB-тэй холбогдох)
const mongoose = require('mongoose');
// CORS-г импортлох (өөр домэйнээс хүсэлт авах боломжтой болгоно)
const cors = require('cors');
// Орчны хувьсагчдыг (.env файлаас) ачаалах
require('dotenv').config();

// Express апп үүсгэх
const app = express();
// Серверийн портын дугаарыг тохируулах (орчны хувьсагчаас авах, байхгүй бол 5005)
const PORT = process.env.PORT || 5005;

// CORS middleware ашиглах
app.use(cors());
// JSON хүсэлтийг зөвшөөрөх middleware
app.use(express.json());

// Үндсэн хуудасны GET хүсэлтэд хариу өгөх
app.get('/', (req, res) => {
  // Хариу илгээх
  res.send('Номын дэлгүүрийн API ажиллаж байна!');
});

// MongoDB-тэй холбогдох
mongoose
  .connect(process.env.MONGODB_URI) // Орчны хувьсагчаас MongoDB URI-г авах
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
