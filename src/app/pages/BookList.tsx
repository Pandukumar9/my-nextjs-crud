"use client";

import { useEffect, useState } from "react";
import { deleteBook, getBooks, UpdateBook } from "../api/api";
import ReuseModal from "./ReuseModal";
import Addbooks from "./Addbooks";
import { Book } from "../models/types";

export default function BookList({ books }: { books: Book[] }) {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch books from API
  useEffect(() => {
    fetchBooks();
  }, [books]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const apiBooks = await getBooks();
      setBooksData(apiBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save after user edits
  const handleUpdateBook = async (updatedBook: Book) => {
    const res = await UpdateBook(updatedBook.id, updatedBook);

    // update local state immediately
    setBooksData((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? res : b))
    );

    setIsOpen(false); // close modal
    setSelectedBook(null);
  };

    // ✅ Handlers
  const handleEditBook = (book: any) => {
    setSelectedBook(book); // pre-fill book form
    setIsOpen(true); // open modal
  };

  const handleViewBook = (book: Book) => {
    alert(
      `📖 ${book.bookName}\n\nAuthor: ${book.bookAuthor}\n\nDescription: ${book.bookDescription}\n\nCost: ₹${book.bookCost}`
    );
  };

  const handleDeleteBook = (bookId: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      deleteBook(bookId);
      setBooksData(booksData.filter((b) => b.id !== bookId));
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        📚 Book Collection
      </h2>

      {loading ? (
        // Skeletons
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="p-5 bg-white rounded-xl shadow-md border border-gray-200 animate-pulse"
            >
              <div className="h-5 w-3/4 bg-gray-300 rounded mb-3"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-5/6 bg-gray-300 rounded mb-4"></div>
              <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : booksData.length === 0 ? (
        <p className="text-gray-500 text-center">
          No books available. Please add one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {booksData.map((book) => (
            <div
              key={book.id}
              className="p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-blue-700">
                {book.bookName}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                ✍️ Author: {book.bookAuthor}
              </p>
              <p className="text-gray-700 mt-2 line-clamp-3">
                {book.bookDescription}
              </p>
              <p className="mt-3 text-lg font-bold text-green-600">
                ₹{book.bookCost}
              </p>

              <div className="flex justify-between mt-4 gap-2">
                <button
                  onClick={() => handleViewBook(book)}
                  className="flex-1 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditBook(book)}
                  className="flex-1 py-2 bg-yellow-500 text-white text-sm font-medium rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="flex-1 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Reusable Modal for Add/Edit */}
      <ReuseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Addbooks
          existingBook={selectedBook} // pass book for editing
          onSubmitSuccess={handleUpdateBook} // handle save
        />
      </ReuseModal>
    </div>
  );
}
