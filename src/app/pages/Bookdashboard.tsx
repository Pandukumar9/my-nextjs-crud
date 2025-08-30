"use client";

import { useState } from "react";
import ReuseModal from "./ReuseModal";
import Addbooks from "./Addbooks";
import BookList from "./BookList";

export default function Bookdashboard() {

  const [isOpen, setIsOpen] = useState(false);

  // Close modal when form is submitted successfully
  const handleBookSubmit = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-gray-700">
        This is a simple Next.js application demonstrating CRUD operations with reusable components.
      </p>

      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Add Book
      </button>

      {/* Reusable Modal */}
      <ReuseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>

        <Addbooks onSubmitSuccess={handleBookSubmit} />
        
      </ReuseModal>

      {/* Book List */}
      <BookList books={[]} />
    </div>
  );
}
