import React, { useContext, useState } from 'react'
import "../css/navbar.css";
import logo from "../media/logo.jpg";
import { useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import rentalcontext from '../context/Rentalcontext';
const Navbar = () => {
  const contextContent=useContext(rentalcontext);
  const [showLogout,setShowLogout]=useState(false);
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
  const handleTogleUser=()=>{
    if(showLogout)setShowLogout(false);
    else setShowLogout(true);
  }
  const handleLogout=async()=>{
    try{
      const res=await contextContent.account.deleteSession("current");
      console.log(res);
      contextContent.setNewUser(true);
      setShowLogout(false);
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
              <button onClick={handleTogleUser}><CiUser/></button>
          </div>
          <button onClick={()=>{navigate('/addshop')}}>Connect</button>
        </div>
        <div id="RegButtonCover" style={{display:(!contextContent.newUser)?"none":"flex"}}>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignin}>Signin</button>
        </div>
        <div id="ProfileCover" style={{display:(showLogout)?"flex":"none"}}>
          <p>Welcome {(!contextContent.newUser)?contextContent.sesionDetail.name:"user"}</p>
          <div id="hLine"></div>
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
      <div id="SuccessAlert">
          <button id="CloseAlert" onClick={contextContent.closeSuccessAlert}><MdOutlineCancel/></button>
          <p>{contextContent.successAlertText}</p>
      </div>
      <div id="FailureAlert">
          <button id="CloseFailureAlert" onClick={contextContent.closeFailureAlert}><MdOutlineCancel/></button>
          <p>{contextContent.failureAlertText}</p>
      </div>
    </div>
  )
}

export default Navbar
