import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// API URL configuration - pointing to deployed backend (NO trailing slash)
const API_URL =
  process.env.REACT_APP_API_URL || '';

console.log('API_URL:', API_URL); // Debug log to see what URL is being used

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);

  // Номын жагсаалтыг авах функц
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Номын жагсаалтыг авахад алдаа гарлаа:', error);
    } finally {
      setLoading(false);
    }
  };

  // Компонент анх ачаалагдах үед номын жагсаалтыг авах
  useEffect(() => {
    fetchBooks();
  }, []);

  // Ном нэмэх функц
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, author, year: Number(year) };
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/books`, newBook);
      console.log('Ном амжилттай нэмэгдлээ:', response.data);
      fetchBooks();
      setTitle('');
      setAuthor('');
      setYear('');
    } catch (error) {
      console.error('Ном нэмэхэд алдаа гарлаа:', error);
    } finally {
      setLoading(false);
    }
  };

  // Номын жагсаалтыг усгах функц
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Ном устгахад алдаа гарлаа:', error);
    } finally {
      setLoading(false);
    }
  };

  // Номыг засах функц
  const startEditing = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <h1>
          <span className="icon icon-book"></span>
          Номын дэлгүүр
          <span className="version">v1.0.0</span>
        </h1>
        <p>Таны дуртай номуудын жагсаалтыг үүсгээрэй</p>
      </header>

      {/* Add Book Form */}
      <section className="form-section">
        <h2>
          <span className="icon icon-add"></span>
          Шинэ ном нэмэх
        </h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <label htmlFor="title">Номын нэр</label>
            <input
              id="title"
              type="text"
              className="form-input"
              placeholder="Жишээ нь: Гарри Поттер"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="author">Зохиогчийн нэр</label>
            <input
              id="author"
              type="text"
              className="form-input"
              placeholder="Жишээ нь: Ж.К.Роулинг"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="year">Хэвлэгдсэн он</label>
            <input
              id="year"
              type="number"
              className="form-input"
              placeholder="Жишээ нь: 2023"
              min="1000"
              max="2025"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="loading"></span> : '➕'} Нэмэх
            </button>
          </div>
        </form>
      </section>

      {/* Books Display Section */}
      <section className="books-section">
        <h2>
          <span className="icon icon-book"></span>
          Бүх ном ({books.length})
        </h2>

        {books.length === 0 ? (
          <div className="empty-state">
            <h3>Номын жагсаалт хоосон байна</h3>
            <p>Эхний номоо нэмж эхлээрэй!</p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">Зохиогч: {book.author}</p>
                  <p className="book-year">Он: {book.year}</p>
                </div>
                <div className="book-actions">
                  <button
                    onClick={() => startEditing(book)}
                    className="action-btn edit-btn"
                    disabled={loading}
                  >
                    <span className="icon icon-edit"></span> Засах
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="action-btn delete-btn"
                    disabled={loading}
                  >
                    <span className="icon icon-delete"></span> Устгах
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
