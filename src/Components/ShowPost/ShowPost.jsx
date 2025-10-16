import React, { useEffect, useState } from "react";
import "./ShowPostSyles.css";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";

const ShowPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        // جلب البوست
        const res = await fetch(`http://localhost/blogBackend/Config/showPostById.php?id=${id}`);
        const postData = await res.json();
        const post = postData.data;

        if (!post) {
          setPost(null);
          setLoading(false);
          return;
        }

        // جلب الفئة والكاتب مع بعض
        const [categoryRes, authorRes] = await Promise.all([
          fetch("http://localhost/blogBackend/Config/showPostCategory.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categoryId: post.categoryId }),
          }),
          fetch("http://localhost/blogBackend/Config/showAuthorById.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author_id: post.author_id }),
          }),
        ]);

        const categoryData = await categoryRes.json();
        const authorData = await authorRes.json();

        // دمج البيانات مع البوست
        setPost({
          ...post,
          category: categoryData.data || null,
          author: authorData.data || "Unknown",
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchPostDetails();
  }, [id]);


  useEffect(() => {
    console.log(post);

  }, [id, post])


  if (loading) return <Loading />;
  if (!post) return (
    <section className="notFound_container">
      <h1 className="capitalize text-lg text-white">Post not found</h1>
    </section>
  );




  return (
    <section className="details_post">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="myPost"
      >
        <h2 className="post_title">
          <Link>{post.title}</Link>
        </h2>



        <div className="post_thumbail">
          <img src={post.image || "default-post.jpg"} alt={post.title} />
        </div>

        <div className="post_info">
          <p className="post_body">{post.body}</p>
        </div>


        <div className="post_author">
          <div className="post_author_left">
            <div className="post_author_avatar">
              <img src={post.author.avatar || "default-author.jpg"} alt={post.author} />
            </div>
            <div className="post_author_info">
              <ul>
                <li>
                  <h5>by: {post.author.firstname} {post.author.lastname}</h5>
                </li>
                <li>
                  <small>{new Date(post.startdate).toLocaleDateString()}</small>
                </li>
              </ul>
            </div>
          </div>
          <div className="post_author_right">
            <span className="category_btn">{post.category?.title || "Uncategorized"}</span>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default ShowPost;
