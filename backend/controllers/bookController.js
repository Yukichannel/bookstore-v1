// Book моделийг импортлох
const Book = require('../model/Book');

// Ном үүсгэх controller функц
const createBook = async (req, res) => {
  try {
    // Хүсэлтийн body-оос өгөгдөл авах
    const { title, author, year } = req.body;
    // Шинэ номын объект үүсгэх
    const newBook = new Book({ title, author, year });
    // Номыг MongoDB-д хадгалах
    const savedBook = await newBook.save();
    // Амжилттай бол 201 статус илгээх
    res.status(201).json(savedBook);
  } catch (error) {
    // Алдаа гарвал дэлгэрэнгүй мессеж илгээх
    res.status(500).json({ message: error.message });
  }
};

// Бүх номыг авах controller функц
const getAllBooks = async (req, res) => {
  try {
    // Бүх номыг MongoDB-оос авах
    const books = await Book.find();
    // Амжилттай бол 200 статус илгээх
    res.status(200).json(books);
  } catch (error) {
    // Алдаа гарвал дэлгэрэнгүй мессеж илгээх
    res.status(500).json({ message: error.message });
  }
};

//Ном засах updateBook controller функц
const updateBook = async (req, res) => {
  try {
    const { id } = req.params; // URL-аас ID-г авах
    const { title, author, year } = req.body; // Хүсэлтийн body-оос өгөгдөл авах

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, year }, // Шинэ өгөгдөл
      { new: true } // Шинэчилсэн номыг буцаах
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Ном олдсонгүй' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Дотоод серверийн алдаа гарлаа' });
  }
};

// Ном устгах deleteBook controller функц
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params; // URL-аас ID-г авах
    const deletedBook = await Book.findByIdAndDelete(id); // Номыг устгах

    if (!deletedBook) {
      return res.status(404).json({ message: 'Ном олдсонгүй' });
    }
    res.status(200).json({ message: 'Ном амжилттай устгагдлаа' });
  } catch (error) {
    res.status(500).json({ message: 'Дотоод серверийн алдаа гарлаа' });
  }
};

// Controller-уудыг экспортлох
module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
