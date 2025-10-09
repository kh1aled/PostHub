import React, { useEffect, useState } from "react";
import "./BlogSyles.css";
import Post from "../Post/Post";
import UniquePost from "../Post/UniquePost";
import noData from "../../assets/no-data.png"
import { Link, useParams } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [ukPosts, setUkPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchValue, setSerachValue] = useState("");
  const [postsfiltered, setpostsfiltered] = useState([]);



  /*search input function*/

  useEffect(() => {
    filterPosts();
  }, [searchValue]);

  const handleFilter = (e) => {
    setSerachValue(e.target.value);
  };

  //showPostUnique.php
  async function getDataNotUniquePost() {
    try {
      const url = "http://localhost/blogBackend/Config/showPostNotUnique.php";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      setPosts(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getDataUniquePost() {
    try {
      const url = "http://localhost/blogBackend/Config/showPostUnique.php";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      setUkPosts(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getDataNotUniquePost();
    getDataUniquePost();
    getCategories();
  }, []);

  async function filterPosts() {

    try {
      const url = "http://localhost/blogBackend/Config/filterPosts.php";
      const data = { searchValue };
      const response = await fetch(url, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setpostsfiltered(res.data);
    } catch (e) {
      console.error(e);
    }
  }
  async function getCategories() {
    try {
      const url = "http://localhost/blogBackend/Config/showCategoryApi.php";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      setCategory(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  const moveToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="Blog">
      <button className="Topbutton" onClick={moveToTop}>
        Top
      </button>
      <section className="search">
        <div className="input_serach">
          <div className="icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <form>
            <input
              type="search"
              name="search"
              id="serachInput"
              placeholder="search"
              onChange={handleFilter}
            />
          </form>
        </div>
      </section>
      <div className="row posts">
        {postsfiltered.length > 0 ? (
          <>
            {ukPosts.map((el, index) => (
              <UniquePost
                key={index}
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
            {posts.map((el, index) => (
              <Post
                key={index}
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
        ) :
          <img src={noData} style={{ width: "15rem" }} />
        }
      </div>

      <section className="categories_container row">
        {
          category.length > 0 ?
            (
              category.map((categ, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-4" data-aos="fade-up">
                  <Link href="" id={categ.id} key={index} to={`/ShowPostsCategory/${categ.id}`}>
                    {categ.title}
                  </Link>
                </div>
              ))

            )

            :

            <h1 className="nocategory">
              no categories
            </h1>
        }

      </section>
    </div>
  );
};

export default Blog;
