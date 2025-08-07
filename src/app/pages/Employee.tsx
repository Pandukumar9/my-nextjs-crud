'use client';
import { useEffect, useState } from "react";
import { AddEmployee, getEmployees } from "../api/api"; // Make sure this is defined properly

export interface Employee {
  name: string;
  email: string;
  phone: string;
}

export function Employee() {  // Don't name this 'Employee' to avoid conflict with interface
  const formFields: [keyof Employee, string][] = [
    ['name', 'Name'],
    ['email', 'Email'],
    ['phone', 'Phone']
  ];

  const [emp, setEmp] = useState<Employee>({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEmp((prevEmp) => ({
      ...prevEmp,[id]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await AddEmployee(emp);
      alert("Employee added successfully!");
      // Reset form
      setEmp({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  useEffect(() => {
  const fetchEmployees = async () => {
      try {
        const res = await getEmployees();  // ✅ await inside async function
        console.log("Employees fetched:", res);
        setEmp(res);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees(); // ✅ Call async function inside useEffect
  }, []);

  return (
    <form onSubmit={submitForm} className="form">
      <h1 className="text-center">Add Employee</h1>
      <div className="container">
        {
        formFields.map(([name, label]) => (
          <div key={name} className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input
              type="text"
              className="form-control"
              id={name}
              placeholder={`Enter your ${label}`}
              value={emp[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))
        }
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}
