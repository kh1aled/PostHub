import React, { useState , useEffect , useRef } from "react";
import './CatStyles.css'
import { useParams } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditCategory = () => {
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let url =
        "http://localhost/blogBackend/Config/updateCategoryApiFromAdmin.php";
      const data = { title, description, id };
  
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

      if (result.status === "error") {
        // إذا كانت هناك أخطاء، اعرض الرسالة
        toast.error(result.message)
      } else {
     
        // إذا كانت العملية ناجحة، اعرض رسالة النجاح
        toast.success(result.message)
        // إعادة تعيين الحقول بعد النجاح
        setTitle("");
        setDescription("");
      }
    } 
    catch (e) {
      toast.error(e)

    }
  };

  


  return (
    <>
    <div className="EditCategory">
    <div className="container">
      <h1 className="title">Edit Category</h1>
      <ToastContainer/>
      
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Category Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div class="form-group">
          <textarea 
           value={description}
           onChange={(e)=>setDescription(e.target.value)}
          placeholder='description' name="description" id="description" rows="4"></textarea>
        </div>
        <button type="submit" class="btn">
          Edit Category
        </button>
      </form>
    </div>
  </div>
    </>
  );
};

export default EditCategory;
