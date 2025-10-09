import React, { useEffect, useState } from "react";
import "./CatStyles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const Author_id = useSelector((state) => state.IsloginSlice.id);
  const [is_featured, setis_featured] = useState(false);
  const [myimg, setMyimg] = useState(null);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  // ================= GET DATA ==================
  async function getData() {
    try {
      const [categoriesRes, postRes] = await Promise.all([
        fetch("http://localhost/blogBackend/Config/showCategoryApi.php"),
        fetch("http://localhost/blogBackend/Config/showPostById.php", {
          method: "POST", // استخدم POST عشان تبعت body
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }),
      ]);

      const categoriesData = await categoriesRes.json();
      const postData = await postRes.json();

      setCategories(categoriesData.data || []);

      if (postData.data) {
        const post = postData.data;
        setTitle(post.title);
        setDescription(post.body);
        setCategoryId(post.categoryId);
        setis_featured(post.is_featured === "1" || post.is_featured === 1);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  // ================= HANDLE SUBMIT ==================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost/blogBackend/config/updatePost.php";
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("myimg", myimg);
      formData.append("is_featured", is_featured ? 1 : 0);
      formData.append("Author_id", Author_id);
      formData.append("post_id", id);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "error") {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(fileType)) {
        toast.error("Please upload a valid image (JPEG, PNG, GIF)");
        setMyimg(null);
        return;
      }

      if (fileSize > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2 MB");
        setMyimg(null);
        return;
      }

      setMyimg(file);
    }
  };

  return (
    <div className="EditPost">
      <div className="container">
        <ToastContainer />
        <h1 className="title">Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <label htmlFor="roleUser">Category</label>
          <select
            className="form-select"
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">select category</option>
            {categories.map((el, index) => (
              <option key={index} value={el.id}>
                {el.title}
              </option>
            ))}
          </select>

          <div className="form-group">
            <input
              type="checkbox"
              id="featured"
              checked={is_featured}
              onChange={() => setis_featured(!is_featured)}
            />
            <label htmlFor="featured" className="featured_label">
              featured
            </label>
          </div>

          <div className="form-group">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="body"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">add thumbnail</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={handleChangeFile}
            />
          </div>

          <button type="submit" className="btn">
            Edit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
