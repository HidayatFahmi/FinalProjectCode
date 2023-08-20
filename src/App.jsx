// import { useState } from 'react'
import { useContext } from 'react'
import { Routes, Route } from 'react-router';
import { GlobalContext } from './config/GlobalState';
import Auth from './Components/pages/Auth';
// import Logout from './Components/logout/Logout';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/pages/Home';
import Profile from './Components/profile/profile';
import EditProfile from './Components/profile/EditProfil';

// import './App.css'

export default function App() {
  const { isLogin } = useContext(GlobalContext);

  return (
    <Routes>
      {isLogin? (
      <Route path="/" element={<Home/>}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/u/:id" element={<Profile/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>

       </Route>
      )
      :
      (
        <Route path='/' element={<Auth/>} />
      )}
    </Routes>     
  )
}


