import { Link } from "react-router-dom";
import Banner from "./Banner";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
 
      <nav className="w-full flex items-center justify-between px-8 py-4 shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-gray-800">
          SiteSync
        </h1>

        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 border border-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

   
      <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
   

        <h2 className="text-4xl font-bold text-gray-800 mt-10">
          Manage Your Construction Sites Effortlessly
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl">
          A smart and modern platform for engineers and clients to track sites,
          manage workforce, monitor expenses, and stay updated in real-time.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 space-x-4">
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Create an Account
            </button>
          </Link>
        </div>

        {/* Small links */}
        <div className="mt-6 text-gray-500 space-y-1">
          <Link to="/login" className="underline text-sm">
            Already registered? Login here
          </Link>
          <br />
          <Link to="/signup" className="underline text-sm">
            Not registered? Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
