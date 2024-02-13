import React from 'react'
import HomePage from './components/Pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/Pages/PageNotFound'
import About from './components/Pages/About'
import Contact from './components/Pages/Contact'
import Policy from './components/Pages/Policy'
import SignIn from './components/Pages/auth/SignIn'
import Signup from './components/Pages/auth/Signup'
import ProtectedRoute from './components/Route/ProtectedRoute'
import Dashbord from './components/Pages/user/Dashboard'
import ForgetPassword from './components/Pages/auth/ForgetPassword'
import Order from './components/Pages/user/Order'
import Profile from './components/Pages/user/Proile'
import AdminProtectedRoute from './components/Route/AdminProtectedRoute'
import AdminDashboard from './components/Pages/admin/AdminDashboard'
import CreateCategory from './components/Pages/admin/CreateCategory'
import CreateProduct from './components/Pages/admin/CreateProduct'
import AllOrders from './components/Pages/admin/AllOrders'
import Users from './components/Pages/admin/Users'
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      {/* <Route path='/home' element={<HomePage/>}/> */}
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forget-password' element={<ForgetPassword/>}/>
      <Route path='/dashboard' element={<ProtectedRoute/>}>
         <Route path='user' element={<Dashbord/>}/>
         <Route path='user/order' element= {<Order/>} />
         <Route path='user/profile'  element = {<Profile/>} />
      </Route>
      <Route path="/dashboard" element={<AdminProtectedRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path ='admin/create-category' element={<CreateCategory/>}/>
        <Route path ='admin/create-product' element={<CreateProduct/>}/>
        <Route path="admin/all-orders" element={<AllOrders/>}/>
        <Route path="admin/users" element={<Users/>}/>
      </Route>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>  
  )
}

export default App
