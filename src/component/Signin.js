import React from 'react'

const Signin = () => {
  return (
    <div id="SigninCover">
      <form>
          <h2>Signin</h2>
          <div className="nameSec">
            <label>Username</label>
            <input placeholder="Enter your username" />
          </div>
          <div className="emailSec">
            <label>Email</label>
            <input placeholder="Enter your email" />
          </div>
          <div className="passwordSec">
            <label>Create Password</label>
            <input placeholder="Enter Your password"/>
          </div>
          <div>
            <button id="LoginBtn">Submit</button>
          </div>
      </form>
    </div>
  )
}

export default Signin
