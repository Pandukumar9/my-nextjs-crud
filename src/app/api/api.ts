import axios from "axios";
import { Book, Employee } from "../models/types";

const apiurl = "http://localhost:3001/employee";
const booksurl = "http://localhost:3001/books";

export const AddEmployee = async (req: Employee) => {
  const res = await axios.post(apiurl, req);
  return res.data;
};

export const UpdateEmployee = async (id: number, employee: Employee) => {
  const res = await axios.put(`${apiurl}/${id}`, employee);
  return res.data;
};

export const deleteEmployee = async (id: number) => {
  const res = await axios.delete(`${apiurl}/${id}`);
  return res.data;
};

export const getEmployees = async () => {
  const res = await axios.get(apiurl);
  return res.data;
};

export const AddingBooks = async (req: Book) => {
  const res = await axios.post(booksurl, req);
  return res.data;
};

export const UpdateBook = async (id: number, book: Book) => {
  const res = await axios.put(`${booksurl}/${id}`, book);
  return res.data;
};

export const deleteBook = async (id: string) => {
  const res = await axios.delete(`${booksurl}/${id}`);
  return res.data;
};

export const getBooks = async () => {
  const res = await axios.get(booksurl);
  return res.data;
};
