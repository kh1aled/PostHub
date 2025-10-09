import React , {useState , useEffect} from "react";
import './CatStyles.css'
import Navbar from '../../Navbar/Navbar';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MangeCategory = () => {
  const [data, setData] = useState();


  const handleDelete = async (e)=>{
    const id = e.target.parentElement.parentElement.getAttribute("id")

    try {
      let url =
        "http://localhost/blogBackend/Config/deleteCategoryApiFromAdmin.php";
      const mydata = { id };
  
      // استخدم await مباشرة مع fetch
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mydata),
      });
  
      // استخراج JSON من الاستجابة
      const result = await response.json();
      if(result.status = "success"){
        getData();
        toast.success(result.message)
      }
    } 
    catch (e) {
      console.error(e);
      
    }
  }

  async function getData() {
    try {
      const url = "http://localhost/blogBackend/Config/showCategoryApi.php";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res =  await response.json();
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
    <div className="MangeCategory">
      <ToastContainer/>
    <div className="container">
          <h2 className="title">
            <Link>Manage Categories</Link>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>edit</th>
                <th>delete</th>
                <th>admin</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((el, index) => (
                  <tr key={index} id={el.id}>
                  
                    <td>
                      {el.title}
                      
                    </td>
                    <td>{el.description}</td>
                    <td className="edit">
                    <Link to={`/EditCategory/${el.id}`}>
                      <button>Edit</button>
                    </Link>
                    </td>
                    <td className="delete">
                      <button onClick={handleDelete}>Delete</button>
                    </td>
                    <td>{el.isadmin == 0 ? "NO" : "YES"}</td>
                        
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
  </div>
    </>
  );
};

export default MangeCategory;
