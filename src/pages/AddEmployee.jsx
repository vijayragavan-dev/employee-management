
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { addEmployee } from "../utils/localStorage";

function AddEmployee() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave(employee) {
    const result = addEmployee(employee);

    if (result.success) {
      setMessage(result.message);
      setSaved(true);
    } else {
      setMessage(result.message);
    }
  }

  return (
    <main className="main-content">
      <button
        className="back-button"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <header className="page-header">
        <div>
          <h1>Add Employee</h1>
          <p>Enter the employee details below.</p>
        </div>
      </header>

      {message && (
        <p className={saved ? "success-message" : "error-message"}>
          {message}
        </p>
      )}

      {saved ? (
        <section className="welcome-panel">
          <h2>Employee saved successfully!</h2>
          <p>The employee record has been stored in Local Storage.</p>
          <button
            className="primary-button"
            onClick={() => navigate("/dashboard")}
          >
            View Dashboard
          </button>
        </section>
      ) : (
        <section className="form-panel">
          <EmployeeForm onSubmit={handleSave} />
        </section>
      )}
    </main>
  );
}

export default AddEmployee;
