import React, { useEffect, useRef, useState } from "react";
import "./SignUp.css";
import { json, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // استيراد CSS
const SignUp = () => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [avatar, setavatar] = useState(null);

  const [status, setstatus] = useState("");
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();

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

    const url = "http://localhost/blogbackend/config/insertdataApi.php";

    // استخدام FormData لإرسال البيانات
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password2", password2);
    formData.append("avatar", avatar); // الصورة

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "error") {
        setstatus("error");
        toast.error(result.message);
      } else {
        setstatus("success");

        setfname("");
        setlname("");
        setusername("");
        setemail("");
        setpassword("");
        setpassword2("");
        setavatar(null);
        toast.success(result.message);
        setTimeout(() => {
          document.location.replace('/SignIn');
        }, 1000);
      }
    } catch (error) {
      setstatus("error");
      console.log("Error:", error);
      toast.error("Failed to insert data");
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
        setavatar(null);
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
    <div className="SignUp">
      <div className="container">
        <h1 className="title">Sign Up</h1>
        <ToastContainer />
        <form method="POST" onSubmit={handleSubmit}>
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
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to={"/SignIn"}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
