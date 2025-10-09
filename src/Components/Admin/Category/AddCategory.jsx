import React , {useEffect , useState , useRef} from "react";
import "./CatStyles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        "http://localhost/blogBackend/config/insertcategoryApiFromAdmin.php";
      const data = {
        title,
        description,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Optionally reset the form
      if (result.status === "error") {
        // إذا كانت هناك أخطاء، اعرض الرسالة
        toast.error(result.message);
      } else {
        // إذا كانت العملية ناجحة، اعرض رسالة النجاح
        toast.success(result.message);


        // إعادة تعيين الحقول بعد النجاح
        setTitle("");
        setDescription("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="AddCategory">
      <div className="container">
        <h1 className="title">Add Category</h1>
       <ToastContainer/>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Category Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div class="form-group">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
              name="description"
              id="description"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" class="btn">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
