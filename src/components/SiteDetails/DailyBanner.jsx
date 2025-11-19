

const DailyBanner=({icon,title,value})=>{
    return(
        <div className="flex items-center gap-6 bg-white border border-gray-200 rounded-xl shadow-sm-w-full">
           
            <div>
                <h3 className="text-gray-700 font-medium">{title}</h3>
                <p className="text-xl font-semibold mt-1">
                   {value}
                </p>
            </div>
             
        </div>
    )

}
export default DailyBanner