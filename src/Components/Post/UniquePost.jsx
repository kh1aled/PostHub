import React, { useEffect, useState } from "react";
import "./PostSyles.css";
import { Link } from "react-router-dom";
const UniquePost = ({
  image,
  title,
  body,
  categoryId,
  author_id,
  id,
  time,
  is_featured,
  index
}) => {

  const [username, setusername] = useState({});
  const [category , setCategory] =useState([]);
  async function getData() {
    try {
      const url = "http://localhost/blogBackend/Config/showPostCategory.php";
      const data = { categoryId };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      setCategory(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getUserName() {
    try {
      const url = "http://localhost/blogBackend/Config/showAuthorById.php";
      const data = { author_id };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      setusername(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{
    getUserName();
    getData();
  } , [])
  return (
    <div data-aos="fade-right" className="col-12 col-md-12 col-lg-12  col-xl-12 unique_post" index={index}>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6  col-xl-6">
          <div className="post_thumbail">
            <img src={image} alt="" />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6  col-xl-6">
          <ul className="post_info ">
            <Link className="categroy_button">{category.title}</Link>
            <h2 className="post_title">
              <Link>{title}</Link>
            </h2>
            <p className="post_body">
              {body}
            </p>
            <div className="post_author">
              <div className="post_author_avatar">
                <img src={username.avatar} alt="" />
              </div>
              <div className="post_author_info">
                <ul>
                  <li>
                    <h5><span>by : </span>{ username.firstname + " " + username.lastname}</h5>
                  </li>
                  <li>
                    <small>{time}</small>
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UniquePost;
