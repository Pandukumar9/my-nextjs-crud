"use client";
import { useState } from "react";
import ReuseModal from "./ReuseModal";
import Books from "./Books";

export default function Homedash() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-gray-700">This is a simple Next.js application demonstrating CRUD operations with reusable components.</p>
      <button onClick={() => setIsOpen(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        open modal
      </button>

      <ReuseModal 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
        footer={
          <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Close
          </button>
        }>
        <Books />
    </ReuseModal>     
    </div>
  );
}