import React from 'react'
import HomePage from './components/Pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/Pages/PageNotFound'
import About from './components/Pages/About'
import Contact from './components/Pages/Contact'
import Policy from './components/Pages/Policy'
import SignIn from './components/Pages/auth/SignIn'
import Signup from './components/Pages/auth/Signup'
import Layout from './components/Layout/Layout'
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
     
  )
}

export default App
