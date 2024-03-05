import React, { createContext } from 'react'
import { useState } from 'react'

export let searchContext = createContext()
function SearchContext({children}) {
    let [search,setSearch] = useState({keyword:"",result:[]})
  return <searchContext.Provider value={{search,setSearch}}>{children}</searchContext.Provider>
}

export default SearchContext