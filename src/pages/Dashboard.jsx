import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserX,
  Building2,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { getEmployees } from "../utils/localStorage";
import { initializeEmployees } from "../utils/seedEmployees";
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
  const active = employees.filter((e) => e.status === "Active").length;
  const inactive = employees.filter((e) => e.status === "Inactive").length;
  const departments = new Set(
    employees.map((e) => e.department)
  ).size;

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  }

  const cards = [
    { title: "Total Employees", value: total, icon: Users },
    { title: "Active Employees", value: active, icon: UserCheck },
    { title: "Inactive Employees", value: inactive, icon: UserX },
    { title: "Departments", value: departments, icon: Building2 },
  ];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Employee Management</h2>

        <button className="nav-item active">
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          className="nav-item"
          onClick={() => navigate("/employees")}
        >
          <Users size={18} />
          Employees
        </button>

        <button className="nav-item logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="main-content">
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
          {cards.map(({ title, value, icon: Icon }) => (
            <article className="dashboard-card" key={title}>
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
      </main>
    </div>
  );
}

export default Dashboard;
