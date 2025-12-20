
import { signUp } from "../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { minLength } from "zod";
import {useState} from "react"


export default function Signup() {
  const navigate=useNavigate();
  const [showVerificationMessage,setShowVerificationMessage]=useState(false)
  const {register,handleSubmit,formState:{errors},reset}=useForm()


const onSubmit = async (data) => {
    const { full_name, email, password, role } = data;

    try {
      const result = await signUp(full_name, email, password, role);
      
      // Check if user already exists
      if (result.user && result.user.identities && result.user.identities.length === 0) {
        alert("An account with this email already exists. Please login instead.");
        navigate("/login");
        return;
      }
      
      setUserEmail(email);
      setShowVerificationMessage(true);
      reset();
    } catch (err) {
      // Handle other signup errors
      if (err.message.includes("already registered") || 
          err.message.includes("already exists") ||
          err.message.includes("User already registered")) {
        alert("An account with this email already exists. Please login instead.");
        navigate("/login");
      } else {
        alert(err.message);
      }
    }
  };

if (showVerificationMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg text-center">
          <div className="mb-6">
         
          </div>
          <h2 className="text-2xl font-bold text-cyan-950 mb-4">
            Check Your Email!
          </h2>
          <p className="text-gray-600 mb-2">
            We've sent a verification link to your registered mail
          </p>
     
          <p className="text-gray-600 mb-8">
            Please check your inbox and click the verification link to activate your account.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full px-6 py-3 bg-cyan-950 text-white rounded-lg font-semibold hover:bg-cyan-900 transition"
          >
            Go to Login
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Didn't receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    );
  } 

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
    <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className=" text-center text-cyan-950 text-2xl font-bold">SiteSync - Sign Up</h2>
            <p className="text-center text-gray-600 m-4 p-4">Register here.</p>   
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
         <input type="text" placeholder="Username"
         {...register("full_name",{required:true})}
           className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg " />
            {errors.full_name && <p className="text-sm text-red-500">Username is required</p>}
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
 className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg"
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
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg " />
          {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      <select
      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg appearance-none">
        <option value="" >Select Role</option>
        <option value="admin">Admin</option>

      </select>
           <button  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition ">Sign Up</button>
         <Link to="/login">  <p className="text-center text-base">Already registered? Login here</p></Link>
        </form>
          </div>
    </div>
 
  );
}
