import { Link } from "react-router-dom";

const Navbar=()=>{
    return (
     
        <nav className="w-screen bg-cyan-950 text-white px-6 py-3 flex justify-between items-center">
            <ul className="flex  justify-between items-center space-x-10">
                <h1 className="text-2xl ">SiteSync</h1>
            <li> <a>sites</a> </li>
            <li> <a>payments</a> </li>
            <li><a>Upcoming projects</a></li>
            </ul>
             
        </nav>
   
    )
}

export default Navbar;