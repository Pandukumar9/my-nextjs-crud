import axios from "axios";
import { Employee } from "../pages/Employee";

const apiurl = "http://localhost:3001/employee";

export const AddEmployee = async (req:Employee) => {
    const res = await axios.post(apiurl,req);
    return res.data;
}

export const getEmployees = async () => {
    const res = await axios.get(apiurl);
    return res.data;
}