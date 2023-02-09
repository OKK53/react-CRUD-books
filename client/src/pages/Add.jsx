import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const PF = "http://localhost:8800/images/";

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(book);
  const handleClick = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      book.cover = filename;
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add New Book - OKK Book Shop</title>
      </Helmet>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-4xl font-semibold">Add New Book</h1>
        <hr />
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          name="title"
          maxLength={45}
          autoFocus={true}
          className="w-[280px] p-2 border border-gray-400 rounded "
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="desc"
          maxLength={255}
          className="w-[280px] p-2 border border-gray-400 rounded "
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
          className="w-[280px] p-2 border border-gray-400 rounded "
        />
        <input
          type="file"
          placeholder="cover"
          onChange={(e) => setFile(e.target.files[0])}
          name="cover"
          className="w-[280px] p-2 border border-gray-400 rounded "
        />
        {file && (
          <img
            className={"w-[200px] h-[260px] mx-auto "}
            src={file ? URL.createObjectURL(file) : PF + book.cover}
            alt=""
          />
        )}
        <button
          onClick={handleClick}
          className="p-2 bg-teal-300 text-black font-bold cursor-pointer rounded transition-all antialiased hover:bg-teal-800 hover:text-white"
        >
          ADD
        </button>
        <Link
          to="/"
          className="mb-6 p-2 cursor-pointer antialiased transition-all text-blue-400 hover:text-blue-800"
        >
          See all books
        </Link>
      </div>
    </div>
  );
};

export default Add;
