import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleButton = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <div>
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{ color: "white" }}>
            Customers
          </a>
          <a className="navbar-brand" href="/" style={{ color: "white" }}>
            Files
          </a>
          {localStorage.getItem("token") != null ? (
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={() => handleButton()}
            >
              Logout
            </button>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
}
