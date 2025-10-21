import { createContext,useState,useEffect, children } from "react";
const AppContext=createContext();

export const AppProvider=({children})=>{
const [sites,setSites]=useState([]);
const [dailyLogs,setDailyLogs]=useState([]);
const [visits,setVisits]=useState([]);
const [expenses,setExpenses]=useState([]);

useEffect(()=>{
const saved=localStorage.getItem("sitesync-data");
if(saved){
    const parsed=JSON.parse(saved);
    setSites(parsed.sites);
    setDailyLogs(parsed.dailyLogs||[]);
    setExpenses(parsed.expenses||[]);
    setVisits(parsed.visits||[]);
}
},[]);

useEffect(()=>{
localStorage.setItem("sitesync-data",JSON.stringify({sites,expenses,dailyLogs,visits}))
},[visits,sites,expenses,dailyLogs]);



return (
    <AppContext.Provider value={{sites,setSites,setExpenses,setDailyLogs,setVisits,visits,dailyLogs,expenses}}>
        {children}
    </AppContext.Provider>
)
}

export default AppContext;