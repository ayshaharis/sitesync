import { Link } from "react-router-dom";
import Banner from "./Banner";  



const LandingPage = () => {
  return (
    <div className="landing-page">  
     
        <Banner/>
        <div className="text-center mt-10 space-y-4 grid grid-col justify-center items-center">
               <Link to="/login"><button className="border border-black p-2 m-2 rounded-xl hover:transition gray">Login</button></Link> 
            <Link to="/login"> <p>ALready registered? Login here</p></Link> 
               <Link to="/signup"><button>Sign Up</button></Link> 
      <Link to="/signup"> <p>Not registered? SignUp here</p></Link>
        </div>
    
    </div>
  );
}

export default LandingPage;