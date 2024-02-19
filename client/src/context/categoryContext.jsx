import React, { useState,useEffect } from 'react'
import { createContext } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
export let categoryContext = createContext()
function CategoryContext({children}) {
    let [categories,setCategories] = useState([])
    let [changeCategory,setChangeCategory] = useState(false)
    async function getAllCategory(){
        try {
            let result = await axios.get('/api/v1/all-category')
            setCategories(result.data.category)
        } catch (error) {
            console.log(error);
            toast(error.message)
        }
    }
    useEffect(()=>{
        getAllCategory()
    },[changeCategory])
  return (
<categoryContext.Provider value={{categories,changeCategory,setChangeCategory}}>{children}</categoryContext.Provider>
  )
}

export default CategoryContext