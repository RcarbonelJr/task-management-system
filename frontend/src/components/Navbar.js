import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <span className="navbar-brand">Task Management System</span>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          {username && (
            <>
              <li className="nav-item">
                <span className="nav-link">Hello, {username}</span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
