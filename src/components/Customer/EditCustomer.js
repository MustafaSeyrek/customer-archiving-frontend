import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
export default function EditCustomer() {
  let navigate = useNavigate();
  const { id } = useParams();
  const url = "http://localhost:8080/api/customers";
  const updatedId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [fullName, setFullName] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const result = await axios.get(url + "/" + id, {
        headers: {
          Authorization: token,
        },
      });
      setFullName(result.data.fullName);
    } catch (err) {
      setError(err.message);
    }
  };

  const onInputChange = (e) => {
    setFullName(e.target.value);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.put(
        url + "/" + id,
        {
          fullName: fullName,
          updatedId: +updatedId,
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
                  value={fullName}
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
