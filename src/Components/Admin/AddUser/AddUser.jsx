import React, { useRef, useState, useEffect } from "react";
import "./AddUserStyles.css";
import Navbar from "../../Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
const AddUser = () => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [avatar, setavatar] = useState(null); // نستخدم null بدلاً من "" للصور

  const [status, setstatus] = useState("");
  const [role, setRole] = useState(0);
  const [visible, setvisible] = useState(false);

  const messgRef = useRef(null);

  const updateMessageStyle = () => {
    if (messgRef.current) {
      messgRef.current.className = "message";
      if (status === "error") {
        messgRef.current.classList.add("error");
      } else if (status === "success") {
        messgRef.current.classList.add("success");
      }
    }
  };

  useEffect(() => {
    updateMessageStyle();
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // URL الخاصة بـ backend
    const url = "http://localhost/blogBackend/Config/insertdataApiFromAdmin.php";
  
    // استخدام FormData لإرسال البيانات
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password2", password2);
    formData.append("avatar", avatar); // الصورة
    formData.append("role", role);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData, // إرسال formData فقط بدون headers
      });


      const result = await response.json();
     
      if (result.status === "error") {

        toast.error(result.message)
        setstatus("error");
      } else {
        toast.success(result.message);
        setstatus("success");

        // إعادة تعيين الحقول بعد النجاح
        setfname("");
        setlname("");
        setusername("");
        setemail("");
        setpassword("");
        setpassword2("");
        setavatar(null);
        setRole(0);
      }
    } catch (error) {
      toast.error("Failed to insert data")
      setstatus("error");
      console.log("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      // السماح لأنواع معينة فقط
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(fileType)) {
        toast.error("Please upload a valid image (JPEG, PNG, GIF)")
        setstatus("error");
        setavatar(null); // تعيين avatar إلى null إذا كان النوع غير صالح
        return;
      }

      // تحقق من حجم الملف
      if (fileSize > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2 MB")
        setstatus("error");
        setavatar(null); // تعيين avatar إلى null إذا كان الحجم كبيرًا
        return;
      }

      setavatar(file); // إذا كانت الصورة صالحة، قم بتحديث حالة الصورة

    }
  };

  return (
    <>
      <Navbar />
      <div className="AddUser">
        <div className="container">
          <h1 className="title">Add User</h1>
  
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                required
                onChange={(e) => setfname(e.target.value)}
                value={fname}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                required
                onChange={(e) => setlname(e.target.value)}
                value={lname}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                required
                onChange={(e) => setusername(e.target.value)}
                value={username}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                required
                onChange={(e) => setemail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Create Password"
                required
                onChange={(e) => setpassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                required
                onChange={(e) => setpassword2(e.target.value)}
                value={password2}
              />
            </div>
            <label htmlFor="roleUser">Role User</label>
            <select
              className="form-select"
              id="roleUser"
              aria-label="Default select example"
              name="role"
              onChange={(e) => setRole(parseInt(e.target.value, 10))} // تحويل القيمة إلى عدد صحيح
              value={role}
            >
              <option value={0}>Author</option>
              <option value={1}>Admin</option>
            </select>

            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">Profile Img</label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                required
                onChange={handleFileChange}
              
              />
            </div>
            <button type="submit" className="btn">
              add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
