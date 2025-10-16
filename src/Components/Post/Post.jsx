import React, { useEffect, useState } from "react";
import "./PostSyles.css";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";

const Post = ({
  image,
  title,
  body,
  categoryId,
  author_id,
  id,
  time,
  is_featured,
  onDelete,

}) => {

  const [data, setData] = useState({});
  const [username, setUsername] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [categoryRes, userRes] = await Promise.all([
          fetch("http://localhost/blogBackend/Config/showPostCategory.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categoryId }),
          }),
          fetch("http://localhost/blogBackend/Config/showAuthorById.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author_id }),
          }),
        ]);

        const categoryData = await categoryRes.json();
        const userData = await userRes.json();

        setData(categoryData.data);
        setUsername(userData.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [categoryId, author_id]);

  return (
    <div
      key={id}
      data-aos="fade-up"
      className="col-12 col-md-4 col-lg-3 col-xl-3 post card"
    >
      <div className="post_thumbail">
        <img src={image} alt={title} />
      </div>

      <div className="post_info">
        <div className="top_container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* زرار الكاتيجوري */}
          <Link className="categroy_button">{data.title}</Link>

          {/* القائمة المنسدلة */}
          <Dropdown
            postId={id}
            onDelete={onDelete} />
        </div>

        <h2 className="post_title">
          <Link>{title}</Link>
        </h2>
        <p className="post_body">{body}</p>

        <div className="post_author">
          <div className="post_author_avatar">
            <img src={username.avatar} alt={username.firstname} />
          </div>
          <div className="post_author_info">
            <ul>
              <li>
                {loading ? (
                  <h5>Loading author...</h5>
                ) : (
                  <h5>
                    by : {username?.firstname || "Unknown"}{" "}
                    {username?.lastname || ""}
                  </h5>
                )}
              </li>
              <li>
                <small>{time}</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
