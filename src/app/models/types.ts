import { ReactNode } from "react";
export interface Employee {
  name: string;
  email: string;
  phone: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  footer?: ReactNode;
  children?: ReactNode;
}