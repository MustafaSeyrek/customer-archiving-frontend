import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../index.css";
import moment from "moment/moment";
export default function Home() {
  const url = "http://localhost:8080/api/customers";
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (token == null) {
      navigate("/auth");
    } else {
      loadCustomers();
    }
  }, []);

  const loadCustomers = async () => {
    try {
      const result = await axios.get(url, {
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
      }
    }
  };

  const deleteCustomer = async (id) => {
    await axios.delete(url + "/" + id);
    loadCustomers();
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Created By</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated By</th>                
                <th scope="col">Updated At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr>
                  <th scope="row">{customer.id}</th>
                  <td>{customer.fullName}</td>
                  <td>{customer.createdBy}</td>
                  <td>{moment(customer.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                  <td>{customer.updatedBy}</td>                 
                  <td>{customer.updatedAt}</td>
                  <td>
                    <Link
                      to={`/viewcustomer/${customer.id}`}
                      className="btn btn-primary mx-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/editcustomer/${customer.id}`}
                      className="btn btn-outline-primary mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteCustomer(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
