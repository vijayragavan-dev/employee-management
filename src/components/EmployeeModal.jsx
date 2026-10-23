
import { useEffect } from "react";

function EmployeeModal({ title, children, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="employee-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="employee-modal-header">
          <h2 id="employee-modal-title">{title}</h2>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {children}
      </section>
    </div>
  );
}

export default EmployeeModal;
