
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserX,
  Building2,
} from "lucide-react";

import { getEmployees } from "../utils/localStorage";
import { initializeEmployees } from "../utils/seedEmployees";
import AppLayout from "../components/AppLayout";
import "../App.css";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    initializeEmployees();
    setEmployees(getEmployees());
  }, [location]);

  const total = employees.length;

  const active = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactive = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const departments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  const cards = [
  {
    title: "Total Employees",
    value: total,
    icon: Users,
    filter: "",
  },
  {
    title: "Active Employees",
    value: active,
    icon: UserCheck,
    filter: "Active",
  },
  {
    title: "Inactive Employees",
    value: inactive,
    icon: UserX,
    filter: "Inactive",
  },
  {
    title: "Departments",
    value: departments,
    icon: Building2,
    filter: "departments",
  },
];

  return (
    <AppLayout>
      <div className="dashboard-page">
        <header className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to your employee management system.</p>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/employees/add")}
          >
            + Add Employee
          </button>
        </header>

        <section className="dashboard-cards">
          {cards.map(({ title, value, icon: Icon, filter }) => (
  <article
    className="dashboard-card clickable-card"
    key={title}
    role="button"
    tabIndex={0}
    onClick={() => {
      if (filter === "departments") {
        navigate("/employees?view=departments");
      } else if (filter) {
        navigate(`/employees?status=${filter}`);
      } else {
        navigate("/employees");
      }
    }}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (filter === "departments") {
          navigate("/employees?view=departments");
        } else if (filter) {
          navigate(`/employees?status=${filter}`);
        } else {
          navigate("/employees");
        }
      }
    }}
  >
    <div className="card-icon">
      <Icon size={24} />
    </div>
    <p>{title}</p>
    <h2>{value}</h2>
  </article>
))}
        </section>

        <section className="welcome-panel">
          <h2>Employee Overview</h2>

          <p>
            Manage employee information, view records, and track
            workforce statistics from one place.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/employees")}
          >
            View Employees
          </button>
        </section>
      </div>
    </AppLayout>
  );
}

export default Dashboard;
