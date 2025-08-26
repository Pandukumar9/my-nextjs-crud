"use client";

import { ModalProps } from "../models/types";

export default function ReuseModal({isOpen, onClose, title, description, footer, children}: ModalProps) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black"> ✖ </button>

        {/* Title */}
        {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}

        {/* Description */}
        {description && <p className="text-gray-600 mb-4">{description}</p>}

        {/* Custom Content */}
        {children}

        {/* Footer (buttons, actions) */}
        {footer && <div className="mt-4 flex justify-end">{footer}</div>}
      </div>
    </div>
  );
}
