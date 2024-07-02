import React from 'react'
import "../css/navbar.css";
import logo from "../media/logo.jpg";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
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
        <div id="RegButtonCover">
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignin}>Signin</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
