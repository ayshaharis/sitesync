import { useEffect } from "react";

const ModalWrapper=({children,onClose})=>{
    useEffect(()=>{
        const handleEsc=(e)=>{
            if(e.key==="Escape") onClose();
        }
        window.addEventListener("keydown",handleEsc);
        return ()=>window.removeEventListener("keydown",handleEsc)
        

    },[onClose]);
    return (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}  >
        <div className="bg-white p-6 rounded-2xl shadow-xl w-96 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
         {children}
        </div >
        </div>
    )
}

export default ModalWrapper;