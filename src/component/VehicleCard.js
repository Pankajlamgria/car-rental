import React, { useContext } from 'react';
import "../css/vehicle.css";
import rentalcontext from '../context/Rentalcontext';
import { FaStar } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { FaWind } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { GiCarDoor } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { PiEngineBold } from "react-icons/pi";
import { MdFlightClass } from "react-icons/md";

const VehicleCard = (props) => {
    const contextContent=useContext(rentalcontext);
    const handleKnowMore=()=>{

        console.log("clicked");
    }
   return (
    <div id='VehicleCardCover'>
        <div id="VehicleImgContainer">
            <img style={{display:(props.type==="Car")?"block":"none"}} src={props.vehicle.carImg1}/>
            <img style={{display:(props.type==="Bike")?"block":"none"}} src={props.vehicle.bikeImg1}/>
        </div>
        <div id="VehicleCardContent">
            <h4>{props.vehicle.brandName} {props.vehicle.modelName} {props.vehicle.year}</h4>
            <p><FaStar className="ratedIcon"/> 4.8 (2436 reviews)</p>
            <div id="VechicleInfo">
                <div id="VehicleLeftSec">
                    <p style={{display:(props.type=='Car')?"block":"none"}}><GoPeople/> {props.vehicle.seater}</p>
                    <p style={{display:(props.type=='Car')?"block":"none"}}><FaWind/> Air Conditioning</p>
                    <p style={{display:(props.type=='Bike')?"block":"none"}}><GoPeople/> 2</p>
                    <p style={{display:(props.type=='Bike')?"block":"none"}}><IoIosTimer/>{props.vehicle.year}</p>
                </div>
                <div id="VehicleRightSec">
                    <p style={{display:(props.type=='Car')?"block":"none"}}><GiGearStickPattern/> Manual</p>
                    <p style={{display:(props.type=='Car')?"block":"none"}}><GiCarDoor/> 2 Doors</p>
                    <p style={{display:(props.type=='Bike')?"block":"none"}}><PiEngineBold/>{props.vehicle.cc}cc</p>
                    <p style={{display:(props.type=='Bike')?"block":"none"}}><MdFlightClass/>{props.vehicle.class} class</p>

                </div>
            </div>
            <div className='vechicleLine'></div>
            <div id="PriceSec">
                <p>Price</p>
                <p id="RupeeDiv"><h4><FaRupeeSign/>{props.vehicle.price}</h4> /day</p>
            </div>
            <div id="ReadVehicleBtn">
                <button onClick={handleKnowMore}>Know More <FaArrowRightLong/></button>
            </div>
        </div>
    </div>
  )
}

export default VehicleCard
