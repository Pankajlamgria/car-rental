import React, { useContext, useEffect, useState } from "react";
import "../css/login.css";
import rentalcontext from "../context/Rentalcontext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const contextContent=useContext(rentalcontext);
  const navigate=useNavigate();
  const contextcontent=useContext(rentalcontext)
  const [loginDetails,setLoginDetails]=useState({email:"",password:""})

  const handleChangeDetail=(e)=>{
    setLoginDetails({...loginDetails,[e.target.name]:e.target.value})
  }
  const handleLoginBtn=async(e)=>{
    e.preventDefault();
    try{
      const res=await contextContent.account.createEmailPasswordSession(loginDetails.email,loginDetails.password);
      
      // const user=await contextContent.account.createJWT();
      // contextContent.client.setJWT(user.jwt);
      // console.log(user);
      navigate('/');
    }
    catch(e){
      alert(e);
    }
  }

  useEffect(()=>{
    console.log(contextcontent.account);
  },[]);
  return (
    <div id="LoginCover">
      <form>
          <h2>Login</h2>
          <div className="emailSec">
            <label>Email</label>
            <input type="email" id="LoginEmailInput" name="email" onChange={handleChangeDetail} placeholder="Enter your email" />
          </div>
          <div className="passwordSec">
            <label>Password</label>
            <input type="password" name="password" id="LoginPasswordInput" onChange={(handleChangeDetail)} placeholder="Enter Your password"/>
          </div>
          <div>
            <button id="LoginBtn" onClick={handleLoginBtn}>Submit</button>
          </div>
      </form>
    </div>
  );
};

export default Login;
