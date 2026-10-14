
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus, Download } from "lucide-react";

import { getEmployees, deleteEmployee } from "../utils/localStorage";
import "../App.css";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [message, setMessage] = useState("");

  function refreshEmployees() {
    setEmployees(getEmployees());
  }

  useEffect(() => {
    refreshEmployees();
  }, []);

  const departments = useMemo(
    () => [...new Set(employees.map((employee) => employee.department))].sort(),
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = employees.filter((employee) => {
      const matchesSearch = [
        employee.id,
        employee.name,
        employee.email,
      ].some((value) => String(value).toLowerCase().includes(term));

      const matchesDepartment =
        department === "All" || employee.department === department;

      const matchesStatus =
        status === "All" || employee.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });

    return result.sort((a, b) => {
      switch (sortBy) {
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "salary-asc":
          return Number(a.salary) - Number(b.salary);
        case "salary-desc":
          return Number(b.salary) - Number(a.salary);
        case "date-asc":
          return a.joiningDate.localeCompare(b.joiningDate);
        case "date-desc":
          return b.joiningDate.localeCompare(a.joiningDate);
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [employees, search, department, status, sortBy]);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [search, department, status, sortBy]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const visibleEmployees = filteredEmployees.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  function confirmDelete() {
    if (!deleteTarget) return;

    const result = deleteEmployee(deleteTarget.id);
    setMessage(result.message);
    setDeleteTarget(null);
    refreshEmployees();
  }

  function exportCSV() {
    const headers = [
      "Employee ID",
      "Name",
      "Email",
      "Phone",
      "Department",
      "Designation",
      "Joining Date",
      "Salary",
      "Status",
    ];

    const rows = filteredEmployees.map((employee) =>
      [
        employee.id,
        employee.name,
        employee.email,
        employee.phone,
        employee.department,
        employee.designation,
        employee.joiningDate,
        employee.salary,
        employee.status,
      ]
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "employees.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="main-content">
      <header className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage and view all employee records.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/employees/add")}
        >
          <Plus size={17} /> Add Employee
        </button>
      </header>

      {message && <p className="success-message">{message}</p>}

      <section className="employee-list-panel">
        <div className="employee-toolbar">
          <input
            type="search"
            aria-label="Search employees"
            placeholder="Search by name, email or employee ID"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            aria-label="Filter by department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <select
            aria-label="Filter by status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            aria-label="Sort employees"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="salary-asc">Salary: Low–High</option>
            <option value="salary-desc">Salary: High–Low</option>
            <option value="date-asc">Joining: Old–New</option>
            <option value="date-desc">Joining: New–Old</option>
          </select>

          <button className="secondary-button" onClick={exportCSV}>
            <Download size={16} /> Export CSV
          </button>
        </div>

        <div className="table-scroll">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    <span
                      className={
                        employee.status === "Active"
                          ? "status-badge active-status"
                          : "status-badge inactive-status"
                      }
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="icon-button"
                        title="View employee"
                        aria-label={`View ${employee.name}`}
                        onClick={() => navigate(`/employees/${employee.id}`)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        className="icon-button"
                        title="Edit employee"
                        aria-label={`Edit ${employee.name}`}
                        onClick={() => navigate(`/employees/edit/${employee.id}`)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        className="icon-button delete-button"
                        title="Delete employee"
                        aria-label={`Delete ${employee.name}`}
                        onClick={() => setDeleteTarget(employee)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {visibleEmployees.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-table">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span>
            Showing {filteredEmployees.length === 0 ? 0 : (page - 1) * pageSize + 1}
            –{Math.min(page * pageSize, filteredEmployees.length)} of{" "}
            {filteredEmployees.length} employees
          </span>

          <div>
            <button
              className="secondary-button"
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>

            <span className="page-number">
              {page} / {totalPages}
            </span>

            <button
              className="secondary-button"
              disabled={page === totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {deleteTarget && (
        <div className="modal-backdrop">
          <section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <h2 id="delete-title">Delete Employee?</h2>
            <p>
              Are you sure you want to delete {deleteTarget.name} (
              {deleteTarget.id})?
            </p>

            <div className="form-actions">
              <button
                className="secondary-button"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button className="danger-button" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Employees;
