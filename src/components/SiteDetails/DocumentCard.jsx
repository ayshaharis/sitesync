const DocumentCard=({ document }) => {
    const {name,date,category}=document;

    const categoryStyle={
        "Contracts":"bg-blue-100 text-blue-700",
        "Drawings":"bg-green-100 text-green-700",
        "Bills And Invoices":"bg-yellow-100 text-yellow-700",
        "Permits":"bg-red-100 text-red-700",
    }

    return(
        <div className="border border-gray-200 shadow-sm p-6 rounded-lg">
            <div className={`border border-gray-200 shadow-sm ${categoryStyle[category]||"bg-gray-100 text-gray-700"}  px-2 py-1 rounded-full text-xs inline-block mb-2`}> 
       <icon>  icon from favicon</icon>
            </div>
         
            <h2>{name}</h2>
            <h3 className="flex items-center p-2 text-gray-600 text-sm">{date}</h3>

        </div>
    )
}

export default DocumentCard;