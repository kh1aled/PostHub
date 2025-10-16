import "./App.css";
import About from "./routes/About/About";
import Contact from "./routes/Contact/Contact";
import SignIn from "./Components/Form/SingIn/SignIn";
import SignUp from "./Components/Form/SingUp/SignUp";
import Services from "./routes/Services/Services";
import ShowPost from "./Components/ShowPost/ShowPost";
import Home from "./routes/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCategory from "./Components/Admin/Category/AddCategory";
import EditCategory from "./Components/Admin/Category/EditCategory";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import AOS from "aos";
import "aos/dist/aos.css";
import { createContext, useEffect, useState } from "react";
import AddUser from "./Components/Admin/AddUser/AddUser";
import MangeUsers from "./Components/Admin/MangeUsers/MangeUsers";
import EditUser from "./Components/Admin/EditUser/EditUser";
import MangeCategory from "./Components/Admin/Category/MangeCategory";
import AddPost from "./Components/Admin/Posts/AddPost";
import MangePost from "./Components/Admin/Posts/MangePost";
import EditPost from "./Components/Admin/Posts/EditPost";
import { useDispatch } from "react-redux";
import { login, logout } from "./Store/IsloginSlice";
import ShowPostsCategory from "./Components/Admin/Category/ShowPostsCategory";
import Navbar from "./Components/Navbar/Navbar";

export const ColorTheme = createContext();

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost/blogBackend/config/check_session.php', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "authenticated") {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      })
      .catch(error => {
        console.error('Error checking session:', error);
      });

  }, []);



  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (

    <div className="App">

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ShowPost/:id" element={<ShowPost />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/EditCategory/:id" element={<EditCategory />} />
          <Route path="/MangeCategory" element={<MangeCategory />} />
          <Route path="/ShowPostsCategory/:id" element={<ShowPostsCategory />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="/EditPost/:id" element={<EditPost />} />
          <Route path="/MangePost" element={<MangePost />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/EditUser/:id" element={<EditUser />} />
          <Route path="/MangeUsers" element={<MangeUsers />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
