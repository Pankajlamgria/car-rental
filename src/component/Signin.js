import React, { useContext, useState } from 'react';
import rentalContext from "../context/Rentalcontext.js";
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const contextContent=useContext(rentalContext);
  const navigate=useNavigate();
  const [signinDetails,setSigninDetails]=useState({username:"",email:'',password:""});
  const handleChangeDetail=(e)=>{
    setSigninDetails({...signinDetails,[e.target.name]:e.target.value});
  }
  const handleSignin=async(e)=>{
    e.preventDefault();
    try{
        const res=await contextContent.account.create("unique()",signinDetails.email,signinDetails.password,signinDetails.username);
        contextContent.setNewUser(false);
        console.log(res);
        navigate('/login');
    }
    catch(e){
      alert(e);
    }
  }
  return (
    <div id="SigninCover">
      <form>
          <h2>Signin</h2>
          <div className="nameSec">
            <label>Username</label>
            <input type="text" name="username" id="Username" onChange={handleChangeDetail} placeholder="Enter your username" />
          </div>
          <div className="emailSec">
            <label>Email</label>
            <input type='email' name='email' id="SigninEmail" onChange={handleChangeDetail} placeholder="Enter your email" />
          </div>
          <div className="passwordSec">
            <label>Create Password</label>
            <input type='password' id="SigninPassword" name='password' onChange={handleChangeDetail} placeholder="Enter Your password"/>
          </div>
          <div>
            <button id="LoginBtn" onClick={handleSignin}>Submit</button>
          </div>
      </form>
    </div>
  )
}

export default Signin
