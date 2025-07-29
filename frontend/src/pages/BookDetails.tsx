import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import type { Book } from "../utils/types";
import { ClipLoader } from "react-spinners";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${bookId}`);
        setBook(res.data.bookDetail);
      } catch (err) {
        console.error("Error fetching book", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  if (!book) {
    return <div className="p-4 text-red-500">Book not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col items-center space-y-8">
      {/* Book Cover */}
      <div className="w-full max-w-xs">
        <img
          src={book.cover_image || "/placeholder.jpg"}
          alt={book.title}
          className="w-full h-auto object-contain rounded-xl shadow-md"
        />
      </div>

      {/* Book Info */}
      <div className="w-full space-y-4 text-center">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-gray-600 text-sm">
          by{" "}
          <span className="font-medium">
            {book.author_id?.name || "Unknown Author"}
          </span>
        </p>
        <p className="text-2xl font-semibold text-green-700">₹{book.price}</p>

        <p className="text-base text-gray-700 leading-relaxed">
          {book.description}
        </p>

        <div className="text-sm text-gray-600 pt-4 border-t border-gray-200 mt-4 space-y-1">
          <p>
            <strong>Pages:</strong> {book.no_of_pages}
          </p>
          <p>
            <strong>Language:</strong> {book.language}
          </p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p>
            <strong>Year:</strong> {book.publication_year}
          </p>
          <p>
            <strong>Stock:</strong>{" "}
            {book.stock > 0 ? `${book.stock} available` : "Out of stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
