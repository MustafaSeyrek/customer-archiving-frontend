import React from "react";
import { useNavigate } from "react-router-dom";
import AddFile from "../File/AddFile";

export default function Navbar() {
  const navigate = useNavigate();

  const handleButton = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/auth");
  };

  const addCustomer = () => {
    navigate("/addcustomer");
  };

  const addFile = () => {
    navigate("/addfile");
  };

  return (
    <div>
      <nav className="navbar bg-primary">
        <div className="container-fluid d-flex justify-content-start">
          <a className="navbar-brand" href="/" style={{ color: "white" }}>
            Customers
          </a>
          <a className="navbar-brand" href="/files" style={{ color: "white" }}>
            Files
          </a>

          <button
            className="btn btn-outline-light"
            type="button"
            onClick={() => addCustomer()}
          >
            Add Customer
          </button>

          <button
            className="btn btn-outline-light ms-2"
            type="button"
            onClick={() => addFile()}
          >
            Add File
          </button>

          {localStorage.getItem("token") != null ? (
            <div className=" ms-auto p-2">
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={() => handleButton()}
              >
                Logout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
}
