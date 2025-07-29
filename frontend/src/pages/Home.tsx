// import React, { useEffect, useState } from "react";
// import BookCard, { type BookCardProps } from "../components/BookCard";
// import api from "../services/api";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../app/store";
// import { logoutSuccess } from "../app/authSlice";

// const Home: React.FC = () => {
//   const [books, setBooks] = useState<BookCardProps[]>([]);
//   const dispatch = useDispatch<AppDispatch>();
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await api.get("/books");
//         const transformed = res.data.map((book: any) => ({
//           _id: book._id,
//           title: book.title,
//           author: book.author_id?.name || "Unknown",
//           price: book.price,
//           rating: book.rating,
//           cover_image: book.cover_image,
//         }));
//         setBooks(transformed);
//       } catch (err) {
//         console.error("Failed to fetch books", err);
//       }
//     };
//     fetchBooks();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 py-10 px-4 sm:px-10">
//       <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
//         📚 Explore Books
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {books.map((book) => (
//           <BookCard key={book._id} {...book} />
//         ))}
//       </div>
//       <button onClick={() => dispatch(logoutSuccess())}>Logout</button>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import BookCard, { type BookCardProps } from "../components/BookCard";
import api from "../services/api";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { logoutSuccess } from "../app/authSlice";

type Category = {
  _id: string;
  name: string;
};

const Home: React.FC = () => {
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  console.log(categories);

  const dispatch = useDispatch<AppDispatch>();

  const fetchBooks = async (categoryId = "") => {
    try {
      const res = categoryId
        ? await api.get(`/books/searchBookByCategory/${categoryId}`)
        : await api.get("/books");

      const data = categoryId ? res.data.allSearchedCategoryBook : res.data;

      const transformed = data.map((book: any) => ({
        _id: book._id,
        title: book.title,
        author: book.author_id?.name || "Unknown",
        price: book.price,
        rating: book.rating,
        cover_image: book.cover_image,
      }));
      setBooks(transformed);
    } catch (err) {
      console.error("Failed to fetch books", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category"); // assumes GET /category returns all categories
      setCategories(res.data.category);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchBooks(categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 py-10 px-4 sm:px-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        📚 Explore Books
      </h2>

      {/* Category Dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-lg shadow-sm bg-white text-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} {...book} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => dispatch(logoutSuccess())}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
