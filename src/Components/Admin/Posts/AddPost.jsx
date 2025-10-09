import { useEffect, useState, useRef } from "react";
import "./CatStyles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const Author_id = useSelector((state) => state.IsloginSlice.id);
  const [is_featured, setis_featured] = useState(false);
  const [myimg, setMyimg] = useState(null);
  const [status, setstatus] = useState("");
  const [data, setData] = useState([]);

  const fileInputRef = useRef(null);

  //============= Get Categories ============
  async function getData() {
    try {
      const url = "http://localhost/blogBackend/Config/showCategoryApi.php";
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const res = await response.json();
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  //============== Handle Submit =============
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost/blogBackend/config/insertPost.php";
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("myimg", myimg);
      formData.append("is_featured", is_featured);
      formData.append("Author_id", Author_id);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "error") {
        toast.error(result.message);
        setstatus("error");
      } else {
        toast.success(result.message);
        setstatus("success");

        // Reset all fields
        setTitle("");
        setDescription("");
        setCategoryId("");
        setis_featured(false);
        setMyimg(null);
        if (fileInputRef.current) fileInputRef.current.value = "";

        // Redirect to home after short delay to see toast
        setTimeout(() => {
          document.location.replace('/');
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG, GIF)");
        setstatus("error");
        setMyimg(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2 MB");
        setstatus("error");
        setMyimg(null);
        return;
      }
      setMyimg(file);
    }
  };

  return (
    <div className="AddPost">
      <div className="container">
        <ToastContainer />
        <h1 className="title">Add Post</h1>
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
            {data.map((el) => (
              <option key={el.id} value={el.id}>
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
              name="description"
              id="description"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">add thumbnail</label>
            <input
              type="file"
              ref={fileInputRef}
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={handleChangeFile}
              required
            />
          </div>

          <button type="submit" className="btn">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
