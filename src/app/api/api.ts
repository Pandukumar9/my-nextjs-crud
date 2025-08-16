import axios from "axios";
import { Employee } from "../models/types";

const apiurl = "http://localhost:3001/employee";

export const AddEmployee = async (req:Employee) => {
    const res = await axios.post(apiurl,req);
    return res.data;
}

export const UpdateEmployee = async (id: number, employee: Employee) => {
    const res = await axios.put(`${apiurl}/${id}`,employee);
    return res.data;
}

export const deleteEmployee = async (id:number) => {
    const res = await axios.delete(`${apiurl}/${id}`);
    return res.data;
}

export const getEmployees = async () => {
    const res = await axios.get(apiurl);
    return res.data;
}

