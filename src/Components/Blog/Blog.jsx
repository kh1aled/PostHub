import React, { useEffect, useState } from "react";
import "./BlogSyles.css";
import Post from "../Post/Post";
import UniquePost from "../Post/UniquePost";
import SkeletonPost from "../Post/SkeletonPost"; // استدعاء الـ Skeleton
import noData from "../../assets/no-data.png";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [ukPosts, setUkPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [postsFiltered, setPostsFiltered] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  // دوال جلب البيانات
  async function getDataNotUniquePost() {
    try {
      const response = await fetch(
        "http://localhost/blogBackend/Config/showPostNotUnique.php"
      );
      const res = await response.json();
      setPosts(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getDataUniquePost() {
    try {
      const response = await fetch(
        "http://localhost/blogBackend/Config/showPostUnique.php"
      );
      const res = await response.json();
      setUkPosts(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getCategories() {
    try {
      const response = await fetch(
        "http://localhost/blogBackend/Config/showCategoryApi.php"
      );
      const res = await response.json();
      setCategory(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function filterPosts() {
    try {
      const url = "http://localhost/blogBackend/Config/filterPosts.php";
      const data = { searchValue };
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setPostsFiltered(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  // جلب البيانات عند أول تحميل
  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      await Promise.all([getDataNotUniquePost(), getDataUniquePost(), getCategories()]);
      setLoading(false);
    }
    fetchAllData();
  }, []);

  // تفعيل البحث عند تغيير القيمة
  useEffect(() => {
    if (searchValue.trim() !== "") {
      filterPosts();
    } else {
      setPostsFiltered([]);
    }
  }, [searchValue]);

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch("http://localhost/blogBackend/Config/deletePost.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.status === "success") {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // JSX
  return (
    <div className="Blog">
      <button className="Topbutton" onClick={moveToTop}>Top</button>

      <section className="search">
        <div className="input_serach">
          <div className="icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <form>
            <input
              type="search"
              name="search"
              id="searchInput"
              placeholder="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </div>
      </section>

      <div className="row posts">
        {loading ? (
          // عرض 6 Skeleton Posts أثناء التحميل
          Array(6)
            .fill(0)
            .map((_, i) => <SkeletonPost key={i} />)
        ) : searchValue ? (
          postsFiltered.length > 0 ? (
            postsFiltered.map((el, index) => (
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
                onDelete={() => handleDelete(el.id)}
              />
            ))
          ) : (
            <img src={noData} alt="no data" style={{ width: "15rem" }} />
          )
        ) : (
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
                onDelete={() => handleDelete(el.id)}
              />
            ))}
          </>
        )}
      </div>

      <section className="categories_container row">
        {category.length > 0 ? (
          category.map((categ, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-4" data-aos="fade-up">
              <Link to={`/ShowPostsCategory/${categ.id}`}>{categ.title}</Link>
            </div>
          ))
        ) : (
          <h1 className="nocategory">no categories</h1>
        )}
      </section>
    </div>
  );
};

export default Blog;