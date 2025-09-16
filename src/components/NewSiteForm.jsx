import { useState,useEffect } from "react";
const NewSiteForm=({onAddSite})=>{

    const [sitename,setSitename]=useState("");
    const [location,setLocation]=useState("");
    const [status,setStatus]=useState("");
    useEffect(()=>{
        const savedSites=localStorage.getItem("sites");
        if(savedSites&&savedSites!==undefined){
            try{
               const parsed=JSON.parse(savedSites);
               console.log(parsed,"enthino vendi");
            }
            catch(err){
                console.log(err)
            }
          
        }
        

    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newSite={name:sitename,location,status};
        onAddSite(newSite);
        setSitename("");
        setLocation("");
        setStatus("");
        
    }
    return (
        <div>
          <form 
          onSubmit={handleSubmit} 
          className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800"> Add new site Informations</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Enter Site Name</label>
                <input
                type="text"
                value={sitename}
                onChange={(e)=>setSitename(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" site name"
                required
                />
            </div>
            <div>
                <label>Enter location</label>
                <input
                type="text"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="location"
                required
                />
            </div>
            <div>
                <label>Status of project</label>
                <select 
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
                <option>Active</option>
                <option>Completed</option>
                <option>Pending</option>
                </select>
           
            </div>
            <button
            type="submit"
            className="w-full py-3  bg-blue-600 text-white  rounded-lg hover:bg-blue-700 transition"
            >
                Add site</button>
          </form>
        </div>
    )
}

export default NewSiteForm;