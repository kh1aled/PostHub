import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // استيراد CSS
import { logout } from "../../Store/IsloginSlice";
const Navbar = () => {
  const [collapseshow, setcollapseshow] = useState(false);

  const collapse = useRef();
  let dispatch = useDispatch();
  let navigate = useNavigate()
  const islogin = useSelector((state) => state.IsloginSlice);

  const handleshow = () => {
    collapse.current.classList.toggle("show");
    setcollapseshow(!collapseshow);
  };

  //logout

  const handleClick = async ()=>{
    try{
      const url = "http://localhost/BlogBackend/Config/logout.php"
      const res = await fetch(url , {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include' // هذا يضمن إرسال الكوكيز مع الطلب
      })
      const result = await res.json(); 
      if(result.status == "success"){
        toast.success(result.message)
        dispatch(logout())
        navigate("/SignIn")
      }else{
        toast.error(result.message)
      }
    }catch(e){
      toast.error(e)
    }
  }

  return (
    <nav className="navbar myNav navbar-expand-lg navbar-light">
      <ToastContainer/>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={handleshow}
      >
        <i
          className={collapseshow ? "fa-solid fa-xmark" : "fa-solid  fa-bars"}
        ></i>
      </button>
      <div className="navbar-icon">
        <label className="level-title-container float-left">{islogin.value ? islogin.username : "blog website"}</label>
      </div>
      <div
        ref={collapse}
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>
              <h1>Blog</h1>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/About"}>
              <h1>About</h1>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to={"/Services"}>
              <h1>Services</h1>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to={"/Contact"}>
              <h1>Contact</h1>
            </Link>
          </li>

          {islogin.value ? (
            <li className="nav-item nav_profile">
              <div className="avatar">
                <img src={islogin.avatar} alt="avatar" />
              </div>
              <ul className="user_setting">
                <li>
                  <Link to={"/Dashboard"}>dashboard</Link>
                </li>
                <li onClick={handleClick}>
                  <Link>logout</Link>
                </li>
              </ul>
              {/* <Link to={"SignIn"} className="nav-link" href="#">
          <h1>khaled</h1>
          </Link> */}
            </li>
          ) : (
            <li className="nav-item ">
              <Link to={"/SignIn"} className="nav-link" href="#">
                <h1>Sign In</h1>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
