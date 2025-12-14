
import { signUp } from "../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { minLength } from "zod";


export default function Signup() {
  const navigate=useNavigate();
  const {register,handleSubmit,formState:{errors},reset}=useForm()


  const onSubmit = async (data) => {
 const {full_name,email,password,role}=data;

    try {
      await signUp( full_name, email, password, role );
      reset()
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
    <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className=" text-center text-2xl font-bold">Sign Up</h2>
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
           <button  className="w-full border border-black rounded-2xl bg-black  text-white p-3   ">Sign Up</button>
         <Link to="/login">  <p className="text-center text-base">Already registered? Login here</p></Link>
        </form>
          </div>
    </div>
 
  );
}
