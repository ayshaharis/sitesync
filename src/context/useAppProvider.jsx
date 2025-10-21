import AppContext from "./AppContext";
import { useContext } from "react";

 const useAppProvider=()=>useContext(AppContext);

 export default useAppProvider;