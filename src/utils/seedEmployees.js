
import { saveEmployees, getEmployees } from "./localStorage";

const sampleEmployees = [
  {
    id: "EMP001",
    name: "Arun Kumar",
    email: "arun@gmail.com",
    phone: "9876543210",
    department: "IT",
    designation: "Software Developer",
    joiningDate: "2025-01-15",
    salary: 45000,
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "9876543211",
    department: "HR",
    designation: "HR Executive",
    joiningDate: "2024-06-10",
    salary: 35000,
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Ravi Kumar",
    email: "ravi@gmail.com",
    phone: "9876543212",
    department: "Sales",
    designation: "Sales Executive",
    joiningDate: "2023-09-20",
    salary: 30000,
    status: "Inactive",
  },
  {
    id: "EMP004",
    name: "Divya Raj",
    email: "divya@gmail.com",
    phone: "9876543213",
    department: "Finance",
    designation: "Accountant",
    joiningDate: "2024-02-01",
    salary: 40000,
    status: "Active",
  },
  {
    id: "EMP005",
    name: "Karthik S",
    email: "karthik@gmail.com",
    phone: "9876543214",
    department: "Marketing",
    designation: "Marketing Executive",
    joiningDate: "2025-04-12",
    salary: 32000,
    status: "Inactive",
  },
];

export function initializeEmployees() {
  if (getEmployees().length === 0) {
    saveEmployees(sampleEmployees);
  }
}
