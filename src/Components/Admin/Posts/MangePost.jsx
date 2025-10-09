import React, { useState, useEffect } from "react";
import "./CatStyles.css";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
const MangePost = () => {
  const [data, setData] = useState();

  const handleDelete = async (e) => {
    const id = e.target.parentElement.parentElement.getAttribute("id");

    try {
      let url =
        "http://localhost/blogBackend/Config/deletePost.php";
      const data = { id };

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

      if ((result.status = "success")) {
        getData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  async function getData() {
    try {
      const url = "http://localhost/blogBackend/Config/showPostApi.php";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      setData(res.data);
      
    } catch (e) {
      console.error(e);
    }
  }

  useEffect( () => {
    getData();
  }, []);

  return (
    <>
 
      <div className="MangePost">
        <div className="container">
          <h2 className="title">
            <Link>Manage Posts</Link>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>edit</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((el, index) => (
                  <tr key={index} id={el.id}>
                    <td>{el.title}</td>
                    <td>{el.categoryId}</td>
                    <td className="edit">
                      <Link to={`/EditPost/${el.id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                    <td className="delete">
                      <button onClick={handleDelete}>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MangePost;
