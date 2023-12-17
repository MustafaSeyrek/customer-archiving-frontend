import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";

export default function File() {
  const url = "http://localhost:8080/api/files";
  let anchor = document.createElement("a");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const updatedId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const uploadRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (token == null) {
      navigate("/auth");
    } else {
      loadFiles();
    }
  }, []);

  const loadFiles = async () => {
    try {
      const result = await axios.get(url, {
        headers: { Authorization: token },
      });
      setFiles(result.data);
    } catch (err) {
      if (err.response != null) {
        if (err.response.status == 401) {
          setError("Your session has ended. Please logout and login again!");
        } else {
          setError(err.message);
        }
      } else {
        setError(err.message);
      }
    }
  };

  const downloadFile = async (code, name) => {
    const result = await axios.get(`${url}/download/${code}`, {
      headers: { Authorization: token },
      responseType: "blob",
    });
    let blobby = result.data;
    let objectUrl = window.URL.createObjectURL(blobby);
    anchor.href = objectUrl;
    anchor.download = name;
    anchor.click();
    window.URL.revokeObjectURL(objectUrl);
  };

  const onFileChange = async (e) => {    
    const fileUploaded = e.target.files[0];
    const formData = new FormData();
    formData.append("file", fileUploaded);
    formData.append("updatedId", updatedId);
    if (fileUploaded != null) {
      try {
        const result = await axios.put(url + "/" + code, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });
        loadFiles();
      } catch (err) {
        if (err.response != null) setError(err.response.data);
        else setError(err.message);
      }
    } else {
      setError("olmadı");
    }
  };

  const editFile = (code) => {
    uploadRef.current.click();
    setCode(code);
  };

  const deleteFile = async (code) => {
    await axios.delete(`${url}/${code}`, {
      headers: { Authorization: token },
    });
    loadFiles();
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <input
          hidden
          ref={uploadRef}
          className="form-control"
          type="file"
          id="formFile"
          onChange={(e) => onFileChange(e)}
        />
        <div className="py-4">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            ""
          )}
          {success ? (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          ) : (
            ""
          )}
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Path</th>
                <th scope="col">Customer</th>
                <th scope="col">Created By</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated By</th>
                <th scope="col">Updated At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr>
                  <th scope="row">{file.id}</th>
                  <td>{file.name}</td>
                  <td>{file.path}</td>
                  <td>{file.customerName}</td>
                  <td>{file.createdBy}</td>
                  <td>{moment(file.createdDate).format("DD/MM/YYYY HH:mm")}</td>
                  <td>{file.updatedBy == "" ? "-" : file.updatedBy}</td>
                  <td>
                    {file.updatedDate == null
                      ? "-"
                      : moment(file.updatedDate).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-success mx-2"
                      onClick={() => downloadFile(file.code, file.name)}
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => editFile(file.code)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteFile(file.code)}
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
