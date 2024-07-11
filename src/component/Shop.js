import React, { useContext, useState, useEffect } from "react";
// import { Query } from 'appwrite';
import rentalcontext from "../context/Rentalcontext";
import "../css/shop.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import { CiTimer } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { GiVibratingShield } from "react-icons/gi";
import { IoLogoCodepen } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaRegAddressCard } from "react-icons/fa";
import VehicleCard from "./VehicleCard";
import { useNavigate } from "react-router-dom";
const Shop = () => {
  const contextContent = useContext(rentalcontext);
  const navigate=useNavigate(); 
  const shopId = localStorage.getItem("shopId");
  const [ready, setReady] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  const [showMore,setShowMore]=useState(true);
  const [buttonText,setButtonText]=useState("Show All Vehicles");

  const [show, setshow] = useState(true);
  // const navigate=useNavigate();
  const handleShowAll=()=>{
    if(showMore){
      setShowMore(false);
      document.getElementById("VechicleSec").style.height="auto";
      document.getElementById("VechicleSec").style.paddingBottom="1rem";
      setButtonText("Show Less Vehicle");
    }
    else{
      setShowMore(true);
      document.getElementById("VechicleSec").style.height="440px";
      document.getElementById("VechicleSec").style.paddingBottom="0rem";
      setButtonText("Show All Vehicle");
    }
  }
  const handleNext = () => {
    if (show) {
      setshow(false);
    } else {
      setshow(true);
    }
  };
  const handlePrev = () => {
    if (show) {
      setshow(false);
    } else {
      setshow(true);
    }
  };
  const handleAddVehicle=(e)=>{
    contextContent.setShopId(contextContent.shopInfo.$id);
    contextContent.setToggleAddShop(false);
    navigate("/addshop");
  }
  return (
    <div id="Container">
      <div id="ShopPageCover" style={{ color: "white" }}>
        <div
          id="MainShopSec"
          style={{ display: contextContent.shopInfo ? "block" : "none" }}
        >
          <div id="ShopHeading">
            <div>
              <p>{contextContent.shopInfo.name}</p>
              <span>|</span>
              <div
                id="VerifiedBlock"
                style={{
                  color: "rgb(72, 231, 72)",
                  borderColor: "rgb(72, 231, 72)",
                }}
              >
                <FaCheck /> Verified on site
              </div>
            </div>
            <p>{contextContent.shopInfo.address}</p>
          </div>
          <div className="hLine"></div>
          <div id="shopImgCover" style={{ height: "400px", width: "100%" }}>
            <img
              style={{ opacity: show ? "1" : "0", width: show ? "100%" : "0%" }}
              id="Img1"
              src={contextContent.shopInfo.shopImg1}
            />
            <img
              style={{ opacity: show ? "0" : "1", width: show ? "0" : "100%" }}
              id="Img2"
              src={contextContent.shopInfo.shopImg2}
            />
            <div className="ImgArrows" id="left">
              <button onClick={handlePrev}>
                <GrPrevious />
              </button>
            </div>
            <div className="ImgArrows" id="right">
              <button onClick={handleNext}>
                <GrNext />
              </button>
            </div>
          </div>
          <div className="hLine"></div>
          <div id="DetailsSec">
            <div id="FirstDetailSec">
              <div>
                <h4>Shop Name</h4>
                <p>
                  <CiShop />
                  {contextContent.shopInfo.name}
                </p>
              </div>
              <div>
                <h4>Owner Name</h4>
                <p>
                  <IoLogoCodepen />
                  {contextContent.shopInfo.ownerName}
                </p>
              </div>
            </div>
            <div id="SecondDetailSec">
              <div>
                <h4>Since</h4>
                <p>
                  <CiTimer />
                  {contextContent.shopInfo.since}
                </p>
              </div>
              <div>
                <h4>Contact Number</h4>
                <p>
                  <FaPhoneAlt />
                  {contextContent.shopInfo.number}
                </p>
              </div>
            </div>
            <div id="ThirdDetailSec">
              <div>
                <h4>Rating</h4>
                <p>
                  <GiVibratingShield />
                  4.5
                </p>
              </div>
              <div>
                <h4>Email</h4>
                <p>
                  <MdMarkEmailRead />
                  {contextContent.shopInfo.email}
                </p>
              </div>
            </div>
          </div>
          <div id="AddressBlock">
            <h4>Address</h4>
            <p>
              <FaRegAddressCard />
              {contextContent.shopInfo.address}
            </p>
          </div>
          <div className="hLine"></div>
          <div
            id="AddSec"
            style={{ display: contextContent.owner ? "block" : "none" }}
          >
            <div>
              <button onClick={handleAddVehicle} style={{display:(contextContent.sesionDetail.$id===contextContent.shopInfo.id)?"block":"none"}}>
                Add Vehicle
                <IoMdAdd />
              </button>
            </div>
          </div>
        </div>
        <div id="OwnerSec">
          <h2>Contact Owner:</h2>
          <p>
            <FaCheck /> Certified Agent
          </p>
          <p>
            {contextContent.shopInfo.ownerName} :{" "}
            {contextContent.shopInfo.number}
          </p>
          <button>Copy</button>
        </div>
      </div>
        <div id="VechicleSec">
          {contextContent.carList.map((singleVehicle) => {
            return <VehicleCard key={singleVehicle.$id} vehicle={singleVehicle} type={"Car"} />;
          })}
          {contextContent.bikeList.map((singleVehicle) => {
            return <VehicleCard key={singleVehicle.$id} vehicle={singleVehicle} type={"Bike"}/>;
          })}
        </div>
        <div id="ShowAllBtn">
          <button onClick={handleShowAll}>{buttonText}</button>
        </div>
      </div>
  );
};

export default Shop;
