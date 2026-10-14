
import { useState } from "react";
import { getEmployees } from "../utils/localStorage";

const initialValues = {
  id: "",
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  joiningDate: "",
  salary: "",
  status: "Active",
};

function EmployeeForm({
  onSubmit,
  submitLabel = "Save Employee",
  initialData = null,
  originalId = null,
}) {
  const [form, setForm] = useState({
  ...initialValues,
  ...(initialData || {}),
});
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  function validate() {
    const nextErrors = {};
    const employees = getEmployees();

    const id = form.id.trim().toUpperCase();
    const name = form.name.trim();
    const email = form.email.trim();

    
if (!id) {
  nextErrors.id = "Employee ID is required.";
} else if (
  employees.some(
    (employee) =>
      employee.id.toLowerCase() === id.toLowerCase() &&
      employee.id !== originalId
  )
) {
  nextErrors.id = "This Employee ID already exists.";
}


    if (name.length < 2) {
      nextErrors.name = "Name must contain at least 2 characters.";
    }

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (
      !/^[+\d\s()-]+$/.test(form.phone) ||
      digits.length < 10 ||
      digits.length > 15
    ) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (!form.department) {
      nextErrors.department = "Select a department.";
    }

    if (!form.designation.trim()) {
      nextErrors.designation = "Designation is required.";
    }

    if (!form.joiningDate) {
      nextErrors.joiningDate = "Joining date is required.";
    }

    if (
      form.salary === "" ||
      !Number.isFinite(Number(form.salary)) ||
      Number(form.salary) <= 0
    ) {
      nextErrors.salary = "Salary must be a positive number.";
    }

    if (!form.status) {
      nextErrors.status = "Select an employee status.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      id: form.id.trim().toUpperCase(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      designation: form.designation.trim(),
      salary: Number(form.salary),
    });
  }

  const fields = [
    { name: "id", label: "Employee ID", placeholder: "EMP006" },
    { name: "name", label: "Full Name", placeholder: "Enter full name" },
    { name: "email", label: "Email", type: "email", placeholder: "name@example.com" },
    { name: "phone", label: "Phone", placeholder: "10-digit phone number" },
    { name: "department", label: "Department", type: "select" },
    { name: "designation", label: "Designation", placeholder: "e.g. Developer" },
    { name: "joiningDate", label: "Joining Date", type: "date" },
    { name: "salary", label: "Salary (₹)", type: "number", placeholder: "45000" },
    { name: "status", label: "Status", type: "status" },
  ];

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      {fields.map((field) => (
        <div className="form-field" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>

          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
            >
              <option value="">Select department</option>
              {["IT", "HR", "Finance", "Sales", "Marketing"].map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          ) : field.type === "status" ? (
            <select
              id={field.name}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              min={field.name === "salary" ? "0.01" : undefined}
              step={field.name === "salary" ? "0.01" : undefined}
            />
          )}

          {errors[field.name] && (
            <p className="field-error">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <div className="form-actions">
        <button className="primary-button" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
