import { useEffect, useState } from "react";
import useAppProvider from "../context/useAppProvider";
const DailyExpenditure=({siteId})=>{

 
//retrieving from appcontext ()
const {expenses,setExpenses}=useAppProvider();
    const [newExpense,setNewExpense]=useState({"date":"",
        "category":"",
        "desciption":"",
        "amount":""});

    const handleAddExpense=()=>{
      if(!newExpense.date||!newExpense.category||!newExpense.desciption||!newExpense.amount){
        alert("Please Fill in all inputs!");
        return;
      }
        const updatedExpense={...newExpense,siteId:siteId}
        setExpenses([...expenses,updatedExpense]);
        console.log(expenses);
 
        setNewExpense({
             "date":"",
             "category":"",
             "desciption":"",
             "amount":""

        })
    

    }

  

return (
  <div className="w-full max-w-4xl mx-auto p-4">
    <h3 className="font-bold text-xl mb-4">Expenditure Log</h3>

    <table className="table-auto border-collapse border border-gray-300 text-left w-full shadow-sm">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Date</th>
          <th className="border border-gray-300 px-4 py-2">Category</th>
          <th className="border border-gray-300 px-4 py-2">Description</th>
          <th className="border border-gray-300 px-4 py-2">Amount</th>
        </tr>
      </thead>

      <tbody>
        {expenses
          .filter((expense) => expense.siteId === siteId)
          .map((item, key) => (
            <tr key={key}>
              <td className="border border-gray-300 px-4 py-2" >{item.date}</td>
              <td className="border border-gray-300 px-4 py-2">{item.category}</td>
              <td className="border border-gray-300 px-4 py-2">{item.desciption}</td>
              <td className="border border-gray-300 px-4 py-2">{item.amount}</td>
            </tr>
          ))}


        <tr>
          <td>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              className="border border-gray-300 px-4 py-2 w-full"
            />
          </td>
          <td>
            <select type="text"
              value={newExpense.category}
              onChange={(e)=>setNewExpense({...newExpense,category:e.target.value})}
              className="border border-gray-300 px-4 py-2 w-full">
              <option>Materials</option>
              <option>Machinery Rent</option>
              <option>Tiles/Flooring</option>
              <option>Transportation</option>
              <option>Others</option>
            </select>
        
          </td>
          <td>
            <input
              type="text"
              value={newExpense.desciption}
              onChange={(e) => setNewExpense({ ...newExpense, desciption: e.target.value })}
              className="border border-gray-300 px-4 py-2 w-full"
            />
          </td>
          <td>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="border border-gray-300 px-4 py-2 w-full"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div className="mt-4">
      <button
        onClick={handleAddExpense}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Add Expense
      </button>
    </div>
  </div>
);


}
export default DailyExpenditure;



/* categoryTotal={"machineryRent":5000,"labour":22200} 
const categoryTotal=expenses.reduce((acc,curr)=>{
  if(acc[curr.category]){
  acc[curr.category]+=curr.amount;
  }
  acc[curr.category]=curr.amount;},{})*/       