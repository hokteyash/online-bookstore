import React, { useEffect, useState } from "react";
import BookCard, { type BookCardProps } from "../components/BookCard";
import api from "../services/api";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { logoutSuccess } from "../app/authSlice";

const Home: React.FC = () => {
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");
        const transformed = res.data.map((book: any) => ({
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
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 py-10 px-4 sm:px-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        📚 Explore Books
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} {...book} />
        ))}
      </div>
      <button onClick={() => dispatch(logoutSuccess())}>Logout</button>
    </div>
  );
};

export default Home;
