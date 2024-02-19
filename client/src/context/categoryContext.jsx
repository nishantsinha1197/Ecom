import React, { useState,useEffect } from 'react'
import { createContext } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
export let categoryContext = createContext()
function CategoryContext({children}) {
    let [categories,setCategories] = useState([])
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
    },[])
  return (
    <categoryContext.Provider value={categories}>{children}</categoryContext.Provider>
  )
}

export default CategoryContext