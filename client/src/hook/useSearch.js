import { useContext } from "react"
import { searchContext } from "../context/SearchContext"
let useSearch=()=> {
   return  useContext(searchContext)
}

export default useSearch