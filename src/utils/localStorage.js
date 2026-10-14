
const EMPLOYEES_KEY = "employees";

export function getEmployees() {
  try {
    const data = localStorage.getItem(EMPLOYEES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Unable to read employees:", error);
    return [];
  }
}

export function saveEmployees(employees) {
  try {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
    return true;
  } catch (error) {
    console.error("Unable to save employees:", error);
    return false;
  }
}

export function addEmployee(employee) {
  const employees = getEmployees();

  const duplicate = employees.some(
    (item) =>
      item.id.toLowerCase() === employee.id.trim().toLowerCase()
  );

  if (duplicate) {
    return { success: false, message: "Employee ID already exists." };
  }

  const updatedEmployees = [...employees, employee];
  const saved = saveEmployees(updatedEmployees);

  return saved
    ? { success: true, message: "Employee added successfully." }
    : { success: false, message: "Unable to save employee." };
}

export function updateEmployee(id, updatedEmployee) {
  const employees = getEmployees();

  const duplicate = employees.some(
    (item) =>
      item.id.toLowerCase() === updatedEmployee.id.trim().toLowerCase() &&
      item.id !== id
  );

  if (duplicate) {
    return { success: false, message: "Employee ID already exists." };
  }

  const updatedEmployees = employees.map((item) =>
    item.id === id ? updatedEmployee : item
  );

  if (!employees.some((item) => item.id === id)) {
    return { success: false, message: "Employee not found." };
  }

  const saved = saveEmployees(updatedEmployees);

  return saved
    ? { success: true, message: "Employee updated successfully." }
    : { success: false, message: "Unable to update employee." };
}

export function deleteEmployee(id) {
  const employees = getEmployees();
  const updatedEmployees = employees.filter((item) => item.id !== id);

  if (employees.length === updatedEmployees.length) {
    return { success: false, message: "Employee not found." };
  }

  const saved = saveEmployees(updatedEmployees);

  return saved
    ? { success: true, message: "Employee deleted successfully." }
    : { success: false, message: "Unable to delete employee." };
}
