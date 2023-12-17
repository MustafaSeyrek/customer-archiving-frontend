import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function AddFile() {
  const url = "http://localhost:8080/api/files";
  const urlCustomers = "http://localhost:8080/api/customers";

  let navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const createdId = localStorage.getItem("userId");
  const [customerId, setCustomerId] = useState(0);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (token == null) {
      navigate("/auth");
    } else {
      loadCustomers();
    }
  }, []);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const loadCustomers = async () => {
    try {
      const result = await axios.get(urlCustomers, {
        headers: { Authorization: token },
      });

      setCustomers(result.data);
    } catch (err) {
      if (err.response != null) {
        if ((err.response.status = 401)) {
          setError("Your session has ended. Please logout and login again");
        } else {
          setError(err.message);
        }
      } else {
        setError(err.message);
      }
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("customerId", customerId);
    formData.append("createdId", createdId);
    
    if (selectedFile != null && customerId != 0) {
      try {
        const result = await axios.post(url, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/files");
      } catch (err) {
        if (err.response != null) setError(err.response.data);
        else setError(err.message);
      }
    } else {
      setError("Please select the file you want to upload or choose customer!");
    }
  };

  const onChange = (e) => {
    setCustomerId(e.target.value);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3  border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Add File</h2>

            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              ""
            )}
            <form>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => onFileChange(e)}
                />
              </div>
              <div className="form-group row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="customerId">
                  Customer
                </label>
                <div class="col-sm-10">
                  <select
                    required
                    id="customerId"
                    className="form-control"
                    onChange={(e) => onChange(e)}
                  >
                    <option value={0}>Choose</option>
                    {customers.map((customer, index) => (
                      <option value={customer.id}>{customer.fullName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => uploadFile()}
              >
                Upload
              </button>
              <Link to="/files" className="btn btn-outline-danger mx-2">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
