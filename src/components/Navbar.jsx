import { Link } from "react-router-dom";

const Navbar=()=>{
    return (
     
        <nav className="w-screen bg-cyan-950 text-white px-6 py-3 flex justify-between items-center">
            <ul className="flex  justify-between items-center space-x-10">
            <Link to="/"><h1 className="text-2xl ">SiteSync</h1></Link>
            <Link to="/"><li> sites </li></Link>
            <Link to="/payments"><li>payments</li></Link> 
            <Link to="/upcomingprojects"><li>Upcoming projects</li></Link> 
            </ul>
             
        </nav>
   
    )
}

export default Navbar;