'use client';
import { useEffect, useState } from "react";
import { AddEmployee, getEmployees, UpdateEmployee, deleteEmployee } from "../api/api"; 

// Interface
export interface Employee {
  id?: number;   
  name: string;
  email: string;
  phone: string;
}

export default function Employee() {
  const formFields: [keyof Employee, string][] = [
    ["name", "Name"],
    ["email", "Email"],
    ["phone", "Phone"]
  ];

  const [emp, setEmp] = useState<Employee>({ name: "", email: "", phone: "" });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEmp((prev) => ({ ...prev, [id]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEdit && emp.id) {
        await UpdateEmployee(emp.id, emp);
        alert("✅ Employee updated successfully!");
      } else {
        await AddEmployee(emp);
        alert("✅ Employee added successfully!");
      }
      setEmp({ name: "", email: "", phone: "" });
      setIsEdit(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (employee: Employee) => {
    setEmp(employee);
    setIsEdit(true);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Form */}
      <form 
        onSubmit={submitForm} 
        className="bg-white shadow-lg rounded-xl p-6 mb-8 border"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isEdit ? "✏️ Edit Employee" : "➕ Add Employee"}
        </h1>
        <div className="space-y-4">
          {formFields.map(([name, label]) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="text"
                id={name}
                placeholder={`Enter ${label}`}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                value={emp[name] || ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            type="submit" 
            className={`px-4 py-2 rounded-lg text-white font-medium transition ${
              isEdit 
                ? "bg-yellow-500 hover:bg-yellow-600" 
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isEdit ? "Update" : "Submit"}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={() => {
                setEmp({ name: "", email: "", phone: "" });
                setIsEdit(false);
              }}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Employee List */}
      {employees.length > 0 ? (
        <div className="bg-white shadow-lg rounded-xl p-6 border">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
            👥 Employee List
          </h2>
          <ul className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <li 
                key={employee.id} 
                className="flex justify-between items-center py-3"
              >
                <div className="text-gray-700">
                  <span className="font-semibold">{employee.name}</span>  
                  <span className="text-sm text-gray-500"> — {employee.email} | {employee.phone}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="px-3 py-1 rounded-lg text-sm bg-yellow-400 hover:bg-yellow-500 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="px-3 py-1 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No employees found.</p>
      )}
    </div>
  );
}
