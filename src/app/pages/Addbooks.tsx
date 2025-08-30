"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Book } from "../models/types";
import { AddingBooks } from "../api/api";

export default function Addbooks({existingBook, onSubmitSuccess}: {existingBook?: Book; onSubmitSuccess?: (book: Book) => void;}) {
  
  const [book, setBook] = useState<Book>({
    bookName: "",
    bookDescription: "",
    bookAuthor: "",
    bookCost: "",
  });

  // ✅ If editing, populate fields when `existingBook` is passed
  useEffect(() => {
    if (existingBook) {
      setBook(existingBook);
    }
  }, [existingBook]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (existingBook) {
        // Editing case
        alert(`Book "${book.bookName}" updated ✅`);
        if (onSubmitSuccess) onSubmitSuccess(book);
      } else {
        // Adding case
        await AddingBooks(book);
        alert(`Book "${book.bookName}" added ✅`);
        if (onSubmitSuccess) onSubmitSuccess(book);
      }

      // Reset only when adding new (not editing)
      if (!existingBook) {
        setBook({
          bookName: "",
          bookDescription: "",
          bookAuthor: "",
          bookCost: "",
        });
      }
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book ❌");
    }
  };

  const formFields = [
    { label: "Book Name", name: "bookName", type: "text" },
    { label: "Book Description", name: "bookDescription", type: "textarea" },
    { label: "Author", name: "bookAuthor", type: "text" },
    { label: "Cost", name: "bookCost", type: "number" },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">
        {existingBook ? "✏️ Edit Book" : "📚 Add Book"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.name}>
            <label className="block font-medium mb-1">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={(book as any)[field.name]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={3}
                required
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={(book as any)[field.name]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            )}
          </div>
        ))}

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {existingBook ? "Update" : "Submit"}
          </button>
          {!existingBook && (
            <button
              type="button"
              onClick={() =>
                setBook({ bookName: "", bookDescription: "", bookAuthor: "", bookCost: "" })
              }
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
