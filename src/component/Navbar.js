import React, { useContext, useState } from 'react'
import "../css/navbar.css";
import logo from "../media/logo.jpg";
import { useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import rentalcontext from '../context/Rentalcontext';
const Navbar = () => {
  const contextContent=useContext(rentalcontext);
  const navigate=useNavigate();
  const handleHomeClick=()=>{
    navigate("/");
  }
  const handleLogin=()=>{
    navigate("/login");
  }
  const handleSignin=()=>{
    navigate("/Signin");
  }
  const handleLogout=async()=>{
    try{
      const res=await contextContent.account.deleteSession("current");
      console.log(res);
      contextContent.setNewUser(true);
      navigate('/login');
    }
    catch(e){
      alert(e);
    }
  }

  return (
    <div>
      <div id='Navbar'>
        <div>
        <div id="LogoCover">
            <img onClick={handleHomeClick} src={logo} alt="Rentz"/>
        </div>
        </div>
        <ul>
            <li onClick={handleHomeClick}>Home</li>
            <li>About Us</li>
            <li>Listings</li>
            <li>Services</li>
            <li>Contact</li>
        </ul>
        <div id="ProfileButtonCover" style={{display:(contextContent.newUser)?"none":"flex"}}>
          <div id="UserBtnCover">
              <button onClick={handleLogout}><CiUser/></button>
          </div>
          <button>Connect</button>
        </div>
        <div id="RegButtonCover" style={{display:(!contextContent.newUser)?"none":"flex"}}>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignin}>Signin</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
