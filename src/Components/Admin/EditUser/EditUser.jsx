import React, { useEffect, useState, useRef } from "react";
import "./EdituserStyles.css";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const EditUser = () => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [role, setrole] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url =
        "http://localhost/BlogBackend/Config/updatedataApiFromAdmin.php";
      const data = { fname, lname, role, id };

      // استخدم await مباشرة مع fetch
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // استخراج JSON من الاستجابة
      const result = await response.json();
      if (result.status === "error") {
        toast.error(result.message);
      } else {
        // إذا كانت العملية ناجحة، اعرض رسالة النجاح
        toast.success(result.message);

        // إعادة تعيين الحقول بعد النجاح
        setfname("");
        setlname("");
        setrole("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="EditUser">
        <div className="container">
          <h1 className="title">Edit User</h1>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                onChange={(e) => setfname(e.target.value)}
                value={fname}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setlname(e.target.value)}
                required
              />
            </div>
            <select
              className="form-select"
              id="roleUser"
              aria-label="Default select example"
              onChange={(e) => setrole(e.target.value)}
              placeholder="user role"
              value={role}
              required
            >
              <option value="0">Author</option>
              <option value="1">Admin</option>
            </select>
            <button type="submit" className="btn">
              Edit User
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
