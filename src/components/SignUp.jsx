import { useState } from "react";
import { signUp } from "../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [role, setRole] = useState("");
  const navigate=useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUp( full_name, email, password, role );
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
     <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-red">Sign Up</h2>
            <p className="text-gray-600 m-4 p-4">Register here.</p>   
            <form onSubmit={handleSignup} className="max-w-sm mx-auto space-y-3">
         <input type="text" placeholder="Username"
            onChange={(e) => setFullName(e.target.value)}
            value={full_name}
            className="border p-2 w-full border border-gray-300 rounded-lg " />
          <input type="email" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border p-2 w-full border border-gray-300 rounded-lg " />
    
          <input type="password" placeholder="Password"
          value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full border border-gray-300 rounded-lg" />
      <select className="border p-2 w-full border border-gray-300 rounded-lg"
      value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="" >Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="client">Client</option>

      </select>
           <button  className="border border-black rounded-2xl bg-black  text-white p-3 m-3  ">Sign in </button>
         <Link to="/login">  <p>Already registered? Login here</p></Link>
        </form>
          </div>
  );
}
