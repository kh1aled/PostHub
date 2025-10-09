import { useState } from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { login } from "../../../Store/IsloginSlice";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.IsloginSlice);
  console.log(islogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const url = "http://localhost/blogBackend/config/validateApi.php";
      const data = { email, password };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include', // إرسال الكوكي مع الطلب
      });

      const result = await response.json();
      console.log(result);

      if (result.status === "error") {
        setStatus("error");
        toast.error(result.message);
      } else {
        setStatus("success");
        toast.success(result.message);

        // تحديث الحالة عند النجاح
        setIsAuthenticated(true);
        setUsername(result.username); // تعيين اسم المستخدم بعد النجاح
        dispatch(login(result.username));

        // إعادة تعيين الحقول بعد النجاح
        setEmail("");
        setPassword("");

        // Redirect بعد 1.5 ثانية
        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="SignIn">
      {isAuthenticated ? (
        <h1>Welcome, {username}</h1>
      ) : (
        <div className="container">
          <ToastContainer />
          <h1 className="title">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button type="submit" className="btn">
              Sign In
            </button>
          </form>
          <p>
            Don't have an account? <Link to={"/SignUp"}>Sign Up</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignIn;
