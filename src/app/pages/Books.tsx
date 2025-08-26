"use client";
import { useState } from "react";

export default function Books() {
  const [book, setBook] = useState({
    bookName: "",
    bookDescription: "",
    bookAuthor: "",
    bookCost: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Book Added:", book);
    alert(`Book "${book.bookName}" added ✅`);
    // reset
    setBook({
      bookName: "",
      bookDescription: "",
      bookAuthor: "",
      bookCost: "",
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">📚 Add Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Book Name */}
        <div>
          <label className="block font-medium">Book Name</label>
          <input
            type="text"
            name="bookName"
            value={book.bookName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Book Description */}
        <div>
          <label className="block font-medium">Book Description</label>
          <textarea
            name="bookDescription"
            value={book.bookDescription}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
            required
          />
        </div>

        {/* Book Author */}
        <div>
          <label className="block font-medium">Author</label>
          <input
            type="text"
            name="bookAuthor"
            value={book.bookAuthor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Book Cost */}
        <div>
          <label className="block font-medium">Cost</label>
          <input
            type="number"
            name="bookCost"
            value={book.bookCost}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
