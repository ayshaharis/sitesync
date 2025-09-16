import { useState } from "react";

const DailyExpenditure=()=>{

    const [expense,setExpense]=useState({
        "date":"",
        "category":"",
        "desciption":"",
        "amount":""
    });



    const handleAddExpense=()=>{
        
    }

return (
<div className="p-4 w-full flex justify-start">
    <div  className="w-full max-w-4xl">
        <h3 className="bold text-xl p-4">Expenditure Log</h3>
         <table className="table-auto border-collapse border border-gray-300 text-left w-full shadow-sm">

        <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
        </tr>
    
    <tbody>
        <tr>
            <td><input type="date" value={expense.date} onChange={(e)=>setExpense([{...expense,date:e.target.value}])}className="border border-gray-300 px-4 py-2"></input></td>
            <td><input type="text" value={expense.category} onChange={(e)=>setExpense([{...expense,category:e.target.value}])}className="border border-gray-300 px-4 py-2"></input></td>
            <td><input type="text" value={expense.desciption} onChange={(e)=>setExpense([{...expense,desciption:e.target.value}])}className="border border-gray-300 px-4 py-2"></input></td>
            <td><input type="number" value={expense.amount} onChange={(e)=>setExpense([{...expense,amount:e.target.value}])}className="border border-gray-300 px-4 py-2"></input></td>
            <button onClick={handleAddExpense}>Add Expense</button>
        </tr>
    </tbody>
  </table>
</div>


    </div>
)
 

}
export default DailyExpenditure;