import { Link } from "react-router-dom";
import {supabase} from "../services/supabaseClient";

const Navbar=()=>{
    const logout=async()=>{
        await supabase.auth.signOut();
        window.location.href="/login";
    }
    return (
     
        <nav className="w-screen bg-cyan-950 text-white px-6 py-3 flex justify-between items-center">
            <ul className="flex  justify-between items-center space-x-10">
            <Link to="/home"><h1 className="text-2xl ">SiteSync</h1></Link>
            <Link to="/about" ><li>About siteSync</li></Link> 
            <button onClick={logout}><li>Logout</li></button>
             
           

            </ul>
             
        </nav>
   
    )
}

export default Navbar;