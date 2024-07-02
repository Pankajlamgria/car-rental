import React from "react";
import "../css/login.css";
const Login = () => {
  return (
    <div id="LoginCover">
      <form>
          <h2>Login</h2>
          <div className="emailSec">
            <label>Email</label>
            <input placeholder="Enter your email" />
          </div>
          <div className="passwordSec">
            <label>Password</label>
            <input placeholder="Enter Your password"/>
          </div>
          <div>
            <button id="LoginBtn">Submit</button>
          </div>
      </form>
    </div>
  );
};

export default Login;
