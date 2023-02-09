import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const PF = "http://localhost:8800/images/";
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        // console.log(res);
        setIsLoading(false);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Books - OKK Book Shop</title>
        <meta
          name="description"
          content="Books - OKK Book Shop description"
        ></meta>
      </Helmet>
      <h1 className="text-3xl font-medium mb-16">OKK Book Shop</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-5">
          {books.map((book) => (
            <div
              className="border rounded-sm p-5 shadow-md flex-1 flex flex-col items-center gap-y-3 "
              key={book.id}
            >
              {book.cover ? (
                <img
                  className="w-[200px] h-[260px] object-cover bg-slate-50"
                  src={PF + book.cover}
                  alt=""
                />
              ) : (
                <img
                  className="w-[200px] h-[260px] object-cover bg-slate-50"
                  src={PF + "programmer.jpg"}
                  alt=""
                />
              )}
              <h2 className="text-2xl font-medium">{book.title}</h2>
              <p className="text-xs mt-4">{book.desc}</p>
              <span className="text-sm">${book.price}</span>
              <div className="flex items-center gap-x-4">
                <button className="border border-green-700 px-1 py-2 bg-white cursor-pointer antialiased transition-all text-green-600 rounded hover:bg-green-800 hover:text-white">
                  <Link to={`/update/${book.id}`}>Update</Link>
                </button>
                <button
                  className="border border-red-700 px-1 py-2 bg-white cursor-pointer antialiased transition-all text-red-400 rounded hover:bg-red-800 hover:text-white"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="mb-6 mt-9 border border-blue-700 p-2 bg-white cursor-pointer antialiased transition-all text-blue-400 rounded hover:bg-blue-800 hover:text-white">
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
