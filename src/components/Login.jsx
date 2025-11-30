import { useState } from "react";
import { signIn } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/authService";
import { Link } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
     <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-red">Login</h2>
        <p className="text-gray-600 m-4 p-4">Enter your credentials to access your account.</p>   
        <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-3">
     
      <input type="email" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full border border-gray-300 rounded-lg " />

      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full border border-gray-300 rounded-lg" />

       <button  className="border border-black rounded-2xl bg-black  text-white p-3 m-3  ">Sign in </button>
     <Link to="/signup">  <p>Not registered? SignUp here</p></Link>
    </form>
      </div>
    
  );
}
