import { useEffect, useState } from "react";

const DailyLog=()=>{

  

    const [isAdding,setIsAdding]=useState(false);
   


    const [newEntries,setNewEntries]=useState({
        "date":"",
        "worker":"",
        "work":"",
        "wage":"",
        "payment":"",
        "sum":""
    });
    const [allEntries,setAllEntries]=useState([{}]);


      useEffect(()=>{
        const savedLog=localStorage.getItem("allentries");
        if(savedLog){
            const parsed=JSON.parse(savedLog);
            setAllEntries(parsed);
        }

    },[])

    useEffect(()=>{
        localStorage.setItem("allentries",JSON.stringify(allEntries));
    },[allEntries])

     const handleAddEntry=()=>{
        setIsAdding(true);
    }
    const handleSaveEntry=()=>{
       setAllEntries([...allEntries,newEntries]);
       setNewEntries({date:"",worker:"",work:"",wage:"",payment:"",sum:""});
       setIsAdding(false);

    }
    
    const handleCancelEntry=()=>{
        setIsAdding(false)
    }
    return(
        <div className="p-4 w-full flex justify-start">
             <div className="w-full max-w-4xl">
            <table className="table-auto border-collapse border border-gray-300 text-left w-full shadow-sm">
               <tr>
                
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Worker</th>
                <th className="border border-gray-300 px-4 py-2">Work</th>
                <th className="border border-gray-300 px-4 py-2">Wage</th>
                <th className="border border-gray-300 px-4 py-2">payment</th>
                <th className="border border-gray-300 px-4 py-2">Weekly sum</th>
               </tr>
               <tbody>
              
                { allEntries.map((entry,key)=>(
                        <tr key={key}>
                      
                          <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                         <td className="border border-gray-300 px-4 py-2">{entry.worker}</td>
                       <td className="border border-gray-300 px-4 py-2">{entry.work}</td>
                         <td className="border border-gray-300 px-4 py-2">{entry.wage}</td>
                     <td className="border border-gray-300 px-4 py-2">{entry.payment}</td>
                          <td className="border border-gray-300 px-4 py-2">{entry.sum}</td>
                            </tr>
                        
                 
                        
                       
                        ))


               
                }
               {isAdding&&(        
                            
                <tr>
                    <td><input type="date" value={newEntries.date} onChange={(e)=>setNewEntries({...newEntries,date:e.target.value})} className="border border-gray-300 px-4 py-2"></input></td>
                    <td><input type="text" value={newEntries.worker} onChange={(e)=>setNewEntries({...newEntries,worker:e.target.value})} className="border border-gray-300 px-4 py-2"></input></td>
                    <td><input value={newEntries.work} onChange={(e)=>setNewEntries({...newEntries,work:e.target.value})}className="border border-gray-300 px-4 py-2"></input></td>
                   <td> <input type="number" value={newEntries.wage} onChange={(e)=>setNewEntries({...newEntries,wage:e.target.value})} className="border border-gray-300 px-4 py-2"></input></td>
                    <td><input type="number"value={newEntries.payment} onChange={(e)=>setNewEntries({...newEntries,payment:e.target.value})} className="border border-gray-300 px-4 py-2"></input></td>
                   <td> <input type="number"value={newEntries.sum} onChange={(e)=>setNewEntries({...newEntries,sum:e.target.value})} className="border border-gray-300 px-4 py-2"></input></td>
                    <td><button onClick={handleSaveEntry} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Save</button></td>
                   <td><button onClick={handleCancelEntry} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Cancel</button></td>
                </tr>
               )}
                

               </tbody>
             
                
            </table>
            <div className="mt-4">
                  <button onClick={handleAddEntry} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Add Entry</button>
            </div>
          
        </div>

        </div>
       
    )
}

   export  default DailyLog;
