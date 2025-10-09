import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Fotter from "../../Fotter/Fotter";
import UniquePost from "../../Post/UniquePost";
import Post from "../../Post/Post";
import "./CatStyles.css";
import noData from "../../../assets/no-data.png";

const ShowPostsCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [ukPosts, setUkPosts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState([]);

  useEffect(() => {
    getCategories();
    getDataNotUniquePost();
    getDataUniquePost();
    getFilterdCategories();
  }, [id]);

  useEffect(() => {
    getCategories();
    getDataNotUniquePost();
    getDataUniquePost();
    getFilterdCategories();
  }, []);

  useEffect(() => {
    console.log(posts);
    console.log(ukPosts);
    console.log(category);
    console.log(categoryTitle.title);
  }, [posts, setUkPosts]);

  // Fetch categories
  async function getCategories() {
    try {
      const url = "http://localhost/blogBackend/Config/showCategoryApi.php";
      const response = await fetch(url);
      const res = await response.json();
      setCategory(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getDataNotUniquePost() {
    try {
      let url =
        "http://localhost/blogBackend/Config/showPostNotUniqueBycategory.php";
      const data = { id };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setPosts(result.data);
    } catch (e) {
      console.log("error");
    }
  }
  async function getFilterdCategories() {
    try {
      let url = "http://localhost/blogBackend/Config/show_category_by_id.php";
      const data = { id };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setCategoryTitle(result.data);
    } catch (e) {
      console.log("error");
    }
  }

  async function getDataUniquePost() {
    try {
      let url =
        "http://localhost/blogBackend/Config/showPostUniqueBycategory.php";
      const data = { id };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setUkPosts(result.data);
    } catch (e) {
      console.log("error");
    }
  }

  // Scroll to top button functionality
  const moveToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar />
      <div className="show-posts-category">
        <button
          className="Topbutton"
          onClick={moveToTop}
          role="button"
          aria-label="Scroll to top"
        >
          Top
        </button>
        <div className="title_container">
          <h1>{categoryTitle.title}</h1>
        </div>
        <div className="row posts">
          {posts.length === 0 && ukPosts.length === 0 ? (
            <img
              src={noData}
              style={{ width: "15rem" }}
              alt="No data available"
            />
          ) : (
            <>
              {ukPosts.length > 0 &&
                ukPosts.map((el) => (
                  <UniquePost
                    key={el.id}
                    image={el.image}
                    title={el.title}
                    body={el.body}
                    categoryId={el.categoryId}
                    author_id={el.author_id}
                    id={el.id}
                    time={el.startdate}
                    is_featured={el.is_featured}
                  />
                ))}
              {posts.length > 0 &&
                posts.map((el) => (
                  <Post
                    key={el.id}
                    image={el.image}
                    title={el.title}
                    body={el.body}
                    categoryId={el.categoryId}
                    author_id={el.author_id}
                    id={el.id}
                    time={el.startdate}
                    is_featured={el.is_featured}
                  />
                ))}
            </>
          )}
        </div>

        <section className="categories_container row">
          {category.length > 0 ? (
            category.map((categ) => (
              <div
                className="col-6 col-md-4 col-lg-4"
                data-aos="fade-up"
                key={categ.id}
              >
                <Link onClick={moveToTop} to={`/ShowPostsCategory/${categ.id}`}>
                  {categ.title}
                </Link>
              </div>
            ))
          ) : (
            <h1 className="nocategory">No categories</h1>
          )}
        </section>
      </div>
      <Fotter />
    </>
  );
};

export default ShowPostsCategory;
