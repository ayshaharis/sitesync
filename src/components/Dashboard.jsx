import DashBoardCard from "./DashBoardCard"

const DashBoard=()=>{
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                <DashBoardCard title="Active Sites" value="5 sites"/>
                <DashBoardCard title="completed Sites" value="3"/>
                <DashBoardCard title="Upcoming Projects" value="10"/>
                
        </div>
   

    )
}

export default DashBoard;