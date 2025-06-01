import React, { useEffect, useState } from "react";

export default function TaskModal({ show, onClose, onSave, taskToEdit }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDueDate(taskToEdit.dueDate.slice(0, 10));
      setPriority(taskToEdit.priority);
    } else {
      setTitle("");
      setDueDate("");
      setPriority("Medium");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title,
      dueDate,
      priority,
    };
    onSave(task);
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "#00000080" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {taskToEdit ? "Edit Task" : "Add New Task"}
            </h5>
            <button type="button" className="close btn" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group mb-2">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label>Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label>Priority</label>
                <select
                  className="form-control"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                {taskToEdit ? "Update Task" : "Add Task"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
