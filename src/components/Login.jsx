import { useState } from "react";
import { signIn } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/authService";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function Login() {
const {register,handleSubmit,formState:{errors}}=useForm()
  const navigate = useNavigate();
  
const [errorMessage, setErrorMessage] = useState(null);
  const onSubmit = async (data) => {
const {email,password}=data;
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (err) {
      if (err.message.includes("Email not confirmed") || 
          err.message.includes("email") || 
          err.message.includes("verify") ||
          err.message.includes("confirmation")) {
        setErrorMessage(
          "Please verify your email first. Check your inbox for the verification link."
        );
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
 <div
      className=" p-4 md:p-6 border border-gray-300 rounded-lg shadow-lg w-full max-w-md ">
        <h2
         className=" text-center text-xl sm:text-2xl font-bold mb-4 text-cyan-950">Login to SiteSync</h2>
        <p
         className="text-sm sm:text-base mb-4 text-cyan-950">Enter your credentials to access your account.</p>   
            {/* Error message display */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        )}
        <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-4">
     
         <input
  type="email"
  placeholder="Email"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  })}
  className=" w-full px-4 py-3 text-base border border-gray-300 rounded-lg"
/>

{errors.email && (
  <p className="text-red-500 text-sm">{errors.email.message}</p>
)}
        <input type="password" placeholder="Password"
             {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          className=" w-full px-4 py-3 text-base border  border border-gray-300 rounded-lg" />
          {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
 

       <button  className="bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition rounded-2xl bg-green-500  text-white w-full px-4 py-3 ">Sign in </button>
     <Link to="/signup">  <p className="text-center text-sm mt-3">Not registered? SignUp here</p></Link>
    </form>
      </div>
    </div>
    
    
  );
}
