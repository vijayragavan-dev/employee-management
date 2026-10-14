
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { getEmployees, updateEmployee } from "../utils/localStorage";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = getEmployees().find((item) => item.id === id);
  const [message, setMessage] = useState("");

  function handleUpdate(updatedEmployee) {
    const result = updateEmployee(id, updatedEmployee);

    if (result.success) {
      alert("Employee updated successfully!");
      navigate("/employees");
    } else {
      setMessage(result.message);
    }
  }

  if (!employee) {
    return (
      <div className="main-content">
        <h2>Employee not found</h2>
        <button
          className="primary-button"
          onClick={() => navigate("/employees")}
        >
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="main-content">
      <button
        className="back-button"
        onClick={() => navigate("/employees")}
      >
        ← Back to Employees
      </button>

      <h1>Edit Employee</h1>

      {message && <p className="error-message">{message}</p>}

      <section className="form-panel">
        <EmployeeForm
          key={employee.id}
          initialData={employee}
          originalId={employee.id}
          onSubmit={handleUpdate}
          submitLabel="Update Employee"
        />
      </section>
    </div>
  );
}

export default EditEmployee;
