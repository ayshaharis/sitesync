// components/Shimmer.jsx


export const SkeletonLine = ({className = "h-4 w-full rounded-md"}) => (
  <div className={`bg-gray-200 dark:bg-gray-700 ${className} animate-pulse`}></div>
);

export const SkeletonField = ({labelWidth = "w-1/3", inputWidth = "w-full"}) => (
  <div className="space-y-2">
    <div className={`h-3 bg-gray-200 dark:bg-gray-700 rounded ${labelWidth} animate-pulse`}></div>
    <div className={`h-10 bg-gray-200 dark:bg-gray-700 rounded ${inputWidth} animate-pulse`}></div>
  </div>
);

// A composed shimmer form that matches your AddSite layout (2-column)
export const ShimmerForm = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <SkeletonField labelWidth="w-1/3" inputWidth="w-full" />
    <SkeletonField labelWidth="w-1/3" inputWidth="w-full" />
    <SkeletonField labelWidth="w-1/3" inputWidth="w-full" />
    <SkeletonField labelWidth="w-1/3" inputWidth="w-full" />
    <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
      <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  </div>
);


export const ShimmerDocumentCard = () => (
  <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden">
    <div className="h-32 bg-gray-200 dark:bg-gray-700 animate-pulse"></div> 
    <div className="p-4 space-y-2">      
      <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>      
         
    </div>
  </div>
);  