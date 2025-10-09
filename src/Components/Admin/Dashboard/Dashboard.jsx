import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../Navbar/Navbar";
import MangePost from "../Posts/MangePost";
import MangeCategory from "../Category/MangeCategory";
import MangeUsers from "../MangeUsers/MangeUsers";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [componentVisible , setComponentVisible] = useState("post");
  const dispatch  = useDispatch();
  const islogin = useSelector((state) => state.IsloginSlice.value);
 
  
  return (
    <>
      <Navbar />
      <section className="dashboard">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="dashboard_container row"
        >
          <div className="col-12 col-md-12 col-lg-4 slide">
            <ul className="list-itmes">
              <li className="item">
                <Link to={"/AddPost"}>
                  <i className="fa-solid fa-pencil"></i>
                  <span>Add Post</span>
                </Link>
              </li>
              <li className={componentVisible == "post"? "item active" : "item"} >
                <Link onClick={()=> setComponentVisible("post")}>
                  <i className="fa-solid fa-envelopes-bulk"></i>
                  <span>Manage Post</span>
                </Link>
              </li>
              <li className="item">
                <Link to={"/AddUser"} >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>Add Users</span>
                </Link>
              </li>
              <li className={componentVisible == "user"? "item active" : "item"}>
                <Link  onClick={()=> setComponentVisible("user")}>
                  <i className="fa-solid fa-users"></i> <span>Mange Users</span>
                </Link>
              </li>
              <li className="item">
                <Link to={"/AddCategory"}>
                  <i className="fa-solid fa-layer-group"></i>
                  <span>Add Category</span>
                </Link>
              </li>
              <li className={componentVisible == "category"? "item active" : "item"}>
                <Link  onClick={()=> setComponentVisible("category")}>
                  <i className="fa-solid fa-list"></i>
                  <span>Manage Category</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-12 col-lg-8  slide">
            {/* <MangePost/> */}
            {/* <MangeCategory/> */}
            
            {componentVisible == "user" ? <MangeUsers/>:false}
            {componentVisible == "post" ? <MangePost/>:false}
            {componentVisible == "category" ? <MangeCategory/>:false}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Dashboard;
