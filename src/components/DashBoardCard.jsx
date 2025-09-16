const DashBoardCard=({title,value})=>{
    return(
        <div className="bg-white rounded-xl shadow-md p-5"> 
          <h3>{title}</h3>
           <p>{value}</p>
        </div>
    )
}


export default DashBoardCard;