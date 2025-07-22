// Mongoose-г импортлох
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

// Book моделийг үүсгэх
const Book = mongoose.model('Book', bookSchema);

// Book моделийг экспортлох
module.exports = Book;
