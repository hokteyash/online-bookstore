import React from "react";

export interface BookCardProps {
  _id: string;
  title: string;
  author: string;
  price: number;
  rating?: number;
  cover_image?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  price,
  rating,
  cover_image,
}) => {
  return (
    <div className="w-full h-full rounded-2xl bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-200 flex flex-col">
      <img
        src={cover_image}
        alt={title}
        className="rounded-t-2xl object-contain h-72 w-full"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">by {author}</p>
        <span className="text-blue-600 font-bold text-md">₹{price}</span>
      </div>
    </div>
  );
};

export default BookCard;
