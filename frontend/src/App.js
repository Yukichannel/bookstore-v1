import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  // Номын жагсаалтыг авах функц
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Номын жагсаалтыг авахад алдаа гарлаа:', error);
    }
  };
  // Компонент анх ачаалагдах үед номын жагсаалтыг авах
  useEffect(() => {
    fetchBooks();
  }, []);
  // Ном нэмэх функц
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, author, year: Number(year) }; // year-ийг Number болгож өгнө
    try {
      const response = await axios.post(
        'http://localhost:5005/api/books',
        newBook
      );
      console.log('Ном амжилттай нэмэгдлээ:', response.data);
      fetchBooks();
      setTitle('');
      setAuthor('');
      setYear('');
    } catch (error) {
      console.error('Ном нэмэхэд алдаа гарлаа:', error);
    }
  };

  //Номын жагсаалтыг усгах функц

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Ном устгахад алдаа гарлаа:', error);
    }
  };

  //Номыг засах функц

  const startEditing = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
  };
  // UI
  return (
    <div>
      <h1>Номын жагсаалт</h1>
      <h2>Ном нэмэх</h2>
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
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author} ({book.year})
            <button onClick={() => startEditing(book)}>Засах</button>
            <button onClick={() => handleDelete(book._id)}>Устгах</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
