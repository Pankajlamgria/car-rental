import React, { useContext, useState } from "react";
import "../css/navbar.css";
import logo from "../media/logo.jpg";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import rentalcontext from "../context/Rentalcontext";
const Navbar = () => {
  const contextContent = useContext(rentalcontext);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignin = () => {
    navigate("/Signin");
  };
  const handleTogleUser = () => {
    if (showLogout) setShowLogout(false);
    else setShowLogout(true);
  };
  const handleLogout = async () => {
    try {
      const res = await contextContent.account.deleteSession("current");
      console.log(res);
      contextContent.setNewUser(true);
      setShowLogout(false);
      contextContent.handleSuccessAlert("Logout Successfully");
      navigate("/login");
    } catch (e) {
      contextContent.handleFailureAlert(e);
    }
  };
  const handleToUserShop = () => {
    navigate("/myshop");
  };

  return (
    <div>
      <div id="Navbar">
        <div>
          <div id="LogoCover">
            <img onClick={handleHomeClick} src={logo} alt="Rentz" />
          </div>
        </div>
        <ul>
          <li onClick={handleHomeClick}>Home</li>
          <li
            onClick={async(e) => {
              await navigate('/');
              e.preventDefault();
              document.getElementById("Services").scrollIntoView({ block: 'end',  behavior: 'smooth' });
            }}
          >
            About Us
          </li>
          <li onClick={handleToUserShop}>Listings</li>
          <li onClick={async(e) => {
              e.preventDefault();
              await navigate('/');
              document.getElementById("Footer").scrollIntoView({ block: 'start',  behavior: 'smooth' });
            }}>Services</li>
          <li onClick={async(e) => {
            await navigate('/');
              e.preventDefault();
              document.getElementById("Footer").scrollIntoView({ block: 'start',  behavior: 'smooth' });
            }}>Contact</li>
        </ul>
        <div
          id="ProfileButtonCover"
          style={{ display: contextContent.newUser ? "none" : "flex" }}
        >
          <div id="UserBtnCover">
            <button onClick={handleTogleUser}>
              <CiUser />
            </button>
          </div>
          <button
            onClick={() => {
              contextContent.setToggleAddShop(true);
              navigate("/addshop");
            }}
          >
            Connect
          </button>
        </div>
        <div
          id="RegButtonCover"
          style={{ display: !contextContent.newUser ? "none" : "flex" }}
        >
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignin}>Signin</button>
        </div>
        <div
          id="ProfileCover"
          style={{ display: showLogout ? "flex" : "none" }}
        >
          <p>
            Welcome{" "}
            {!contextContent.newUser
              ? contextContent.sesionDetail.name
              : "user"}
          </p>
          <div id="hLine"></div>
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
      <div id="SuccessAlert">
        <button id="CloseAlert" onClick={contextContent.closeSuccessAlert}>
          <MdOutlineCancel />
        </button>
        <p>{contextContent.successAlertText}</p>
      </div>
      <div id="FailureAlert">
        <button
          id="CloseFailureAlert"
          onClick={contextContent.closeFailureAlert}
        >
          <MdOutlineCancel />
        </button>
        <p>{contextContent.failureAlertText}</p>
      </div>
    </div>
  );
};

export default Navbar;
