import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function AddCustomer() {
  let navigate = useNavigate();
  const createdId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState(null);
  const url = "http://localhost:8080/api/customers";

  const onInputChange = (e) => {
    setFullName(e.target.value);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        url,
        {
          fullName: fullName,
          createdId: +createdId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3  border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Add User</h2>

            {error ? (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              ""
            )}

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  name="fullName"
                  id="fullName"
                  onChange={(e) => onInputChange(e)}
                ></input>
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Save
              </button>

              <Link to="/" className="btn btn-outline-danger mx-2">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
