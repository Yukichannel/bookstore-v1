# Номын дэлгүүрийн API (Дэлгэрэнгүй тайлбартай)

Энэ төсөл нь Express.js болон MongoDB ашиглан бүтээсэн номын дэлгүүрийн backend API юм. Доор бүх кодын мөр бүрийн дэлгэрэнгүй тайлбар болон өөрчлөлтийн түүхийг орууллаа.

## Төслийн бүтэц

- backend/
  - server.js
  - model/Book.js
  - controllers/bookController.js
  - routes/bookRoutes.js
- .env
- .gitignore
- README.md

## Сүүлийн өөрчлөлтүүдийн тайлбар

- Бүх кодын мөр бүрт монгол хэл дээр дэлгэрэнгүй тайлбар нэмсэн.
- Алдааны мэдээллийг илүү дэлгэрэнгүй харуулах боломжтой болгосон.
- Бүх route, controller, model, server-ийн бүтэц, холболтын логикыг тайлбарласан.

## Кодын дэлгэрэнгүй тайлбар

### frontend/src/App.js

Энд React ашигласан frontend-ийн үндсэн код байна. Доорх мөр бүрийн тайлбарыг үзнэ үү:

```javascript
// React-ийн useEffect, useState hook-уудыг импортлох
import { useEffect, useState } from 'react';
// Axios-г импортлох (API-д хүсэлт явуулахад ашиглана)
import axios from 'axios';

function App() {
  // books: номын жагсаалт, setBooks: жагсаалтыг шинэчлэх функц
  const [books, setBooks] = useState([]);
  // title, author, year: шинэ ном нэмэхэд ашиглах утгууд
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  // Номын жагсаалтыг авах функц
  const fetchBooks = async () => {
    try {
      // Backend API-аас номын жагсаалт авах
      const response = await axios.get('http://localhost:5005/api/books');
      setBooks(response.data); // Хариу ирвэл жагсаалтыг шинэчлэх
    } catch (error) {
      // Алдаа гарвал консолд хэвлэх
      console.error('Номын жагсаалтыг авахад алдаа гарлаа:', error);
    }
  };

  // Компонент ачаалагдахад fetchBooks-г нэг удаа дуудах
  useEffect(() => {
    fetchBooks();
  }, []);

  // Ном нэмэх форм submit хийхэд дуудагдах функц
  const handleSubmit = async (e) => {
    e.preventDefault(); // Form default үйлдлийг зогсоох
    // Шинэ номын объект үүсгэх
    const newBook = { title, author, year: Number(year) };
    try {
      // Backend API руу POST хүсэлтээр ном нэмэх
      const response = await axios.post(
        'http://localhost:5005/api/books',
        newBook
      );
      console.log('Ном амжилттай нэмэгдлээ:', response.data);
      fetchBooks(); // Ном нэмсний дараа жагсаалтыг шинэчлэх
      setTitle('');
      setAuthor('');
      setYear('');
    } catch (error) {
      // Алдаа гарвал консолд хэвлэх
      console.error('Ном нэмэхэд алдаа гарлаа:', error);
    }
  };

  // JSX: UI-ийг буцаах
  return (
    <div>
      <h1>Номын жагсаалт</h1>
      {/* Ном нэмэх форм */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Номын нэр"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Зохиогчийн нэр"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Хэвлэгдсэн он"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <button type="submit">Нэмэх</button>
      </form>
      <h2>Бүх ном</h2>
      {/* Номын жагсаалтыг харуулах */}
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title}- {book.author} ({book.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Энд серверийн үндсэн код байна. Доорх мөр бүрийн тайлбарыг үзнэ үү:

```javascript
// Express.js-г импортлох (Node.js-д сервер үүсгэхэд ашиглана)
const express = require('express');
// Mongoose-г импортлох (MongoDB-тэй холбогдох, өгөгдөл хадгалах)
const mongoose = require('mongoose');
// CORS-г импортлох (өөр домэйнээс хүсэлт авах боломжтой болгоно)
const cors = require('cors');
// Орчны хувьсагчдыг (.env файлаас) ачаалах
require('dotenv').config();
// Book моделийг импортлох (номын өгөгдлийн бүтэц)
const Book = require('./model/Book');
// Номтой холбоотой route-уудыг импортлох
const bookRoutes = require('./routes/bookRoutes');

// Express апп үүсгэх
const app = express();
// Серверийн портын дугаарыг тохируулах (орчны хувьсагчаас авах, байхгүй бол 5005)
const PORT = process.env.PORT || 5005;

// CORS middleware ашиглах (API-д өөр домэйнээс хүсэлт авах боломж)
app.use(cors());
// JSON хүсэлтийг зөвшөөрөх middleware (body-г JSON хэлбэрээр хүлээн авах)
app.use(express.json());
// /api/books замд bookRoutes-г ашиглах (номтой холбоотой route-ууд)
app.use('/api/books', bookRoutes);

// Үндсэн хуудасны GET хүсэлтэд хариу өгөх (API ажиллаж байгаа эсэхийг шалгах)
app.get('/', (req, res) => {
  // Хариу илгээх
  res.send('Номын дэлгүүрийн API ажиллаж байна!');
});

// Туршилтын ном нэмэх route (MongoDB-д ном нэмэх жишээ)
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
    // Алдаа гарвал 400 статус илгээх, алдааны мессеж буцаах
    res.status(400).json({ error: error.message });
  }
});

// MongoDB-тэй холбогдох (серверийг ажиллуулах)
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
```

### backend/model/Book.js

Энд номын өгөгдлийн бүтэц, схемийг тодорхойлсон:

```javascript
// Mongoose-г импортлох (MongoDB-д өгөгдлийн загвар үүсгэх)
const mongoose = require('mongoose');
// Номын схемийг тодорхойлох
const bookSchema = new mongoose.Schema(
  {
    // Номын нэр
    title: {
      type: String, // Төрөл нь string
      required: true, // Заавал байх ёстой
    },
    // Зохиогчийн нэр
    author: {
      type: String, // Төрөл нь string
      required: true, // Заавал байх ёстой
    },
    // Хэвлэгдсэн он
    year: {
      type: Number, // Төрөл нь number
      required: true, // Заавал байх ёстой
    },
  },
  {
    // createdAt, updatedAt талбарууд автоматаар нэмэгдэнэ
    timestamps: true,
  }
);
// Book моделийг үүсгэх (MongoDB collection-д холбох)
const Book = mongoose.model('Book', bookSchema);
// Book моделийг экспортлох (бусад файлд ашиглах)
module.exports = Book;
```

### backend/controllers/bookController.js

Энд ном нэмэх болон бүх номыг авах controller функцууд байна:

```javascript
// Book моделийг импортлох (MongoDB collection-оос өгөгдөл авах)
const Book = require('../model/Book');

// Ном үүсгэх controller (POST /api/books)
const createBook = async (req, res) => {
  try {
    // Хүсэлтийн body-оос өгөгдөл авах
    const { title, author, year } = req.body;
    // Шинэ ном үүсгэх
    const newBook = new Book({ title, author, year });
    // Номыг хадгалах
    const savedBook = await newBook.save();
    // Амжилттай бол 201 статус илгээх, хадгалсан номын мэдээлэл буцаах
    res.status(201).json(savedBook);
  } catch (error) {
    // Алдаа гарвал 500 статус илгээх, алдааны мессеж буцаах
    res.status(500).json({ message: error.message });
  }
};

// Бүх номыг авах controller (GET /api/books)
const getAllBooks = async (req, res) => {
  try {
    // Бүх номыг авах
    const books = await Book.find();
    // Амжилттай бол 200 статус илгээх, номын жагсаалт буцаах
    res.status(200).json(books);
  } catch (error) {
    // Алдаа гарвал 500 статус илгээх, алдааны мессеж буцаах
    res.status(500).json({ message: error.message });
  }
};

// Controller-уудыг экспортлох (route-д ашиглах)
module.exports = {
  createBook,
  getAllBooks,
};
```

### backend/routes/bookRoutes.js

Энд номтой холбоотой route-уудыг тодорхойлсон:

```javascript
// Express-г импортлох (route үүсгэхэд ашиглана)
const express = require('express');
// Router үүсгэх (route-уудыг бүлэглэх)
const router = express.Router();
// Controller-уудыг импортлох (ном нэмэх, авах функцууд)
const { createBook, getAllBooks } = require('../controllers/bookController');
// POST /api/books - ном үүсгэх route
router.post('/', createBook);
// GET /api/books - бүх номыг авах route
router.get('/', getAllBooks);
// Router-ийг экспортлох (server.js-д ашиглах)
module.exports = router;
```

## Орчны хувьсагчид

- `MONGODB_URI` — MongoDB холболтын хаяг
- `PORT` — Серверийн порт (default: 5005)

## Ашиглах заавар

1. Репозиторийг клон хийнэ:
   ```
   git clone https://github.com/Hellobraincode-lesson/6.3.2-Bookstore-part-2.git
   ```
2. `backend` фолдер руу орж шаардлагатай сангуудыг суулгана:
   ```
   cd backend
   npm install
   ```
3. `.env` файлд өөрийн MongoDB URI болон PORT-ыг тохируулна.
4. Серверийг ажиллуулна:
   ```
   node server.js
   ```

## Лиценз

MIT лицензээр түгээгдэнэ.
