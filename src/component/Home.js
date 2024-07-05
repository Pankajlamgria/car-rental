import React, { useContext, useEffect } from "react";
import homeImg from "../media/homeImg.jpg";
import "../css/home.css";
import { IoLocationOutline  } from "react-icons/io5";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import rentalcontext from "../context/Rentalcontext";
const Home = () => {
  const contextContent=useContext(rentalcontext);
  const check=async()=>{
    console.log(contextContent.sessionDetial);
    try{
      const acc=await contextContent.account.get();
      contextContent.setNewUser(false);
      console.log(acc);
      contextContent.setSessionDetail(acc);
    }
    catch(e){
      contextContent.setNewUser(true);
      console.log(e);
    }
  }
  useEffect(()=>{
    check();
  },[])
  return (
    <div>
      <div id="HomeImgCover">
        <img src={homeImg} alt="" />
      </div>
      <div id="TagLine">
        <span>Welcome</span>
        <h1>Enjoy Your</h1>
        <h1>Journey with</h1>
        <h1>Out <span className="highlight">Comfortable Car</span></h1>
      </div>
      <div id="SearchArea">
        <div id="LocationCover">
            <p>Address</p>
            <input placeholder="Area,City,State,Country"/>
        </div>
        <div id="Gps">
            <p>Near Me</p>
            <button><IoLocationOutline/>Find My Location</button>
        </div>
        <div id="RentalShop">
            <p>Rental Shop</p>
            <input placeholder={"Search Shop"}></input>
        </div>
        <div id="Vehicle">
          <p>Vehicle</p>
          <input placeholder={"Search Vehicle"}></input>
        </div>
        <div id="SearchButtonCover">
          <button>Find A Vehicle <HiOutlineArrowNarrowRight/></button>
        </div>

      </div>
      <div style={{height:"600px"}}>
          something
      </div>
      <div style={{height:"1200px"}}>
          something
      </div>
    </div>
  );
};

export default Home;
