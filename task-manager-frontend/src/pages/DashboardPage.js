import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [sortBy, setSortBy] = useState(null); // 'dueDate' or 'priority'
  const [sortOrder, setSortOrder] = useState("asc");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  // Filter + Search logic
  useEffect(() => {
    let filtered = [...tasks];

    if (filter !== "all") {
      filtered = filtered.filter((task) =>
        filter === "completed"
          ? task.status === "Completed"
          : task.status === "Pending"
      );
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (sortBy === "dueDate") {
          return sortOrder === "asc"
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        // Priority sorting: Low < Medium < High
        const priorityMap = { Low: 1, Medium: 2, High: 3 };
        return sortOrder === "asc"
          ? priorityMap[aValue] - priorityMap[bValue]
          : priorityMap[bValue] - priorityMap[aValue];
      });
    }

    setFilteredTasks(filtered);
  }, [tasks, filter, search, sortBy, sortOrder]);

  // Add/Edit Modal
  const openAddModal = () => {
    setTaskToEdit(null);
    setShowModal(true);
  };
  const openEditModal = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleSaveTask = async (task) => {
    try {
      if (taskToEdit) {
        await axios.put(
          `http://localhost:5000/api/tasks/${taskToEdit._id}`,
          task,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post("http://localhost:5000/api/tasks", task, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowModal(false);
      setTaskToEdit(null);
      // Refresh task list
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          ...task,
          status: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh tasks
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh task list
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Task List</h2>

        {/* New task + Filter + Search Bar */}
        <div className="mb-3"></div>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success" onClick={openAddModal}>
            New Task
          </button>
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="input-group w-50">
            <span className="input-group-text">
              <i className="bi bi-search" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Task Table */}
        {loading ? (
          <p>Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No tasks match your filters.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>
                  Due Date
                  <i
                    className="bi bi-arrow-down-up ms-1"
                    role="button"
                    onClick={() => {
                      setSortBy("dueDate");
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                    }}
                  />
                </th>
                <th>
                  Priority
                  <i
                    className="bi bi-arrow-down-up ms-1"
                    role="button"
                    onClick={() => {
                      setSortBy("priority");
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                    }}
                  />
                </th>

                <th>Done</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.priority}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={task.status === "Completed"}
                      onChange={() => handleToggleComplete(task)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => openEditModal(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <TaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </>
  );
}
