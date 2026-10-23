import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    setShowLogout(false);
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>StaffSync</h2>

        <button
          className={`nav-item ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          className={`nav-item ${
            location.pathname.startsWith("/employees") ? "active" : ""
          }`}
          onClick={() => navigate("/employees")}
        >
          <Users size={18} />
          Employees
        </button>

        <button
          className="nav-item logout"
          onClick={() => setShowLogout(true)}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <h2>StaffSync Employee Management</h2>
          <span>Admin Panel</span>
        </header>

        <main className="main-content">
          {children}
        </main>
      </div>

      {showLogout && (
        <div className="modal-backdrop">
          <section
            className="confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <h2 id="logout-title">Confirm Logout</h2>

            <p>Are you sure you want to log out?</p>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={handleLogout}
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default AppLayout;