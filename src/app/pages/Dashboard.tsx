"use client";
import { useEffect, useState } from "react";
import ReuseModal from "./ReuseModal";

export default function Dashboard() {

  const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="p-6">
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Open Modal (With Params)
      </button>

      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg">
        Open Modal (Custom Content)
      </button>

      <ReuseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Confirmation"
        description="Are you sure you want to delete this item? This action cannot be undone."
        footer={
          <>
            <button onClick={() => setIsOpen(false)} className="px-4 py-2 mr-2 rounded-lg border">
              Cancel
            </button>
            <button onClick={() => {alert("Deleted ✅"); setIsOpen(false);}}
              className="px-4 py-2 bg-red-600 text-white rounded-lg">
              Delete
            </button>
          </>
        }
      />


      {/* <ReuseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">🎉 Custom Modal</h2>
        <p className="mb-4">
          Here you can place <b>any React component</b> you like.
        </p>
        <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-purple-600 text-white rounded-lg">
          Close
        </button>
      </ReuseModal> */}

    </div>
  );
}
