import React, { useContext, useEffect, useState } from "react";
import homeImg from "../media/homeImg.jpg";
import "../css/home.css";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import rentalcontext from "../context/Rentalcontext";
import { Query } from "appwrite";
import hondaLogo from "../media/hondalogo.png";
import mercedes from "../media/mercedes.png";
import toyota from "../media/toyota.png";
import nissan from "../media/nissan.png";
import ford from "../media/ford.png";
import jeep from "../media/jeep2.jpg";
import { IoIosSearch } from "react-icons/io";
import { FaCalendarDay } from "react-icons/fa6";
import { CgSmileMouthOpen } from "react-icons/cg";
import { GiStarsStack } from "react-icons/gi";
import { MdOutlineSavings } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import VehicleCard from "./VehicleCard";
const Home = () => {
  const contextContent = useContext(rentalcontext);
  const popularCar = [
    {
      brandName: "Lamborghini",
      modelName: "Huracan",
      carImg1:
        "https://hdqwalls.com/wallpapers/4k-lamborghini-huracan-performante-26.jpg",
      year: "2020",
      seater: "2",
      price: "50000",
    },
    {
      brandName: "Toyota",
      modelName: "Fortuner",
      carImg1:
        "https://cdn.24.co.za/files/Cms/General/d/8685/adb8b7f19c5f48849588c8742b31bdbd.jpg",
      year: "2018",
      seater: "4",
      price: "5000",
    },
    {
      brandName: "Ford",
      modelName: "Mustang-GT",
      carImg1:
        "https://www.tflcar.com/wp-content/uploads/2013/08/01-2013-ford-mustang-gt-review.jpg",
      year: "2008",
      seater: "4",
      price: "27000",
    },
    {
      brandName: "Chevrolet",
      modelName: "Camaro",
      carImg1:
        "https://images.hgmsites.net/hug/2013-chevrolet-camaro_100398732_h.jpg",
      year: "2022",
      seater: "4",
      price: "4000",
    },
  ];
  const navigate = useNavigate();
  let shopLists = [];
  let shopIdLists = new Set();
  const [searchDetail, setSearchDetail] = useState({
    address: "",
    shopName: "",
    vehicleName: "",
  });
  const check = async () => {
    try {
      const acc = await contextContent.account.get();
      contextContent.setNewUser(false);
      contextContent.setSessionDetail(acc);
    } catch (e) {
      contextContent.setNewUser(true);
    }
  };
  useEffect(() => {
    check();
  }, []);

  const handleSearch = async () => {
    if (!contextContent.sesionDetail) {
      navigate("/login");
    } else {
      shopIdLists = new Set(shopIdLists);
      shopIdLists.clear();
      shopLists = [];
      try {
        if (searchDetail.vehicleName !== "") {
          let res = await contextContent.database.listDocuments(
            process.env.REACT_APP_DATABASE_ID,
            process.env.REACT_APP_BIKE_COLLECTION_ID,
            [
              Query.equal("modelName", searchDetail.vehicleName.trim()),
              Query.contains("modelName", searchDetail.vehicleName.trim()),
            ]
          );
          for (let x in res.documents) {
            shopIdLists = shopIdLists.add(res.documents[x].shopId);
          }
        }
        if (searchDetail.vehicleName !== "") {
          let res2 = await contextContent.database.listDocuments(
            process.env.REACT_APP_DATABASE_ID,
            process.env.REACT_APP_CAR_COLLECTION_ID,
            [
              Query.equal("modelName", searchDetail.vehicleName.trim()),
              Query.contains("modelName", searchDetail.vehicleName.trim()),
            ]
          );
          for (let x in res2.documents) {
            shopIdLists = shopIdLists.add(res2.documents[x].shopId);
          }
        }

        if (searchDetail.shopName !== "") {
          let res = await contextContent.database.listDocuments(
            process.env.REACT_APP_DATABASE_ID,
            process.env.REACT_APP_SHOP_DETAIL_COLLECTION_ID,
            [Query.contains("name", searchDetail.shopName.trim())]
          );
          for (let x in res.documents) {
            shopIdLists = shopIdLists.add(res.documents[x].$id);
          }
        }

        let addArray = searchDetail.address.trim().split(" ");
        if (searchDetail.address === "") addArray = [];
        for (let i = 0; i < addArray.length; i++) {
          let res = await contextContent.database.listDocuments(
            process.env.REACT_APP_DATABASE_ID,
            process.env.REACT_APP_SHOP_DETAIL_COLLECTION_ID,
            [Query.contains("address", addArray[i])]
          );
          for (let x in res.documents) {
            shopIdLists = shopIdLists.add(res.documents[x].$id);
          }
        }

        shopIdLists = Array.from(shopIdLists);
        for (let x in shopIdLists) {
          let res = await contextContent.database.listDocuments(
            process.env.REACT_APP_DATABASE_ID,
            process.env.REACT_APP_SHOP_DETAIL_COLLECTION_ID,
            [Query.equal("$id", shopIdLists[x])]
          );
          shopLists = shopLists.concat(res.documents);
        }
        if (shopLists.length === 0) {
          contextContent.handleFailureAlert("No result found");
        } else {
          console.log(shopLists);
          contextContent.setSearchResults(shopLists);
          navigate("/serchresults");
        }
      } catch (e) {
        contextContent.handleFailureAlert(e);
      }
    }
  };
  const handleDetialUpdate = (e) => {
    setSearchDetail({ ...searchDetail, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div id="HomeImgCover">
        <img src={homeImg} alt="" />
      </div>
      <div id="TagLine">
        <span>Welcome</span>
        <h1>Enjoy Your</h1>
        <h1>Journey with</h1>
        <h1>
          Out <span className="highlight">Comfortable Car</span>
        </h1>
      </div>
      <div id="SearchArea">
        <div id="LocationCover">
          <p>Address</p>
          <input
            name="address"
            onChange={handleDetialUpdate}
            placeholder="Area,City,State,Country"
          />
        </div>
        <div id="Gps">
          <p>Near Me</p>
          <button>
            <IoLocationOutline />
            Find My Location
          </button>
        </div>
        <div id="RentalShop">
          <p>Rental Shop</p>
          <input
            name="shopName"
            onChange={handleDetialUpdate}
            placeholder={"Search Shop"}
          ></input>
        </div>
        <div id="Vehicle">
          <p>Vehicle</p>
          <input
            name="vehicleName"
            onChange={handleDetialUpdate}
            placeholder={"Search Vehicle"}
          ></input>
        </div>
        <div id="SearchButtonCover">
          <button onClick={handleSearch}>
            Find A Vehicle <HiOutlineArrowNarrowRight />
          </button>
        </div>
      </div>
      <div style={{ height: "520px" }}>something</div>
      <div id="PopularCarSec">
        <div id="CompanyLogo">
          <img src={hondaLogo} />
          <img src={ford} />
          <img src={toyota} />
          <img src={mercedes} />
          <img src={nissan} />
        </div>

        <div id="Statement">
          <h2>Popular Car Rental Deals</h2>
          <p>
            Ranging from elegant sedans to powerful sports cars,all carefully
            selected to provide our customers with the ultimate driving
            experience.
          </p>
        </div>
        <div id="homeVehicleSec">
          {popularCar.map((singleVehicle) => {
            return (
              <VehicleCard
                key={singleVehicle.$id}
                vehicle={singleVehicle}
                type={"Car"}
              />
            );
          })}
        </div>
        <div id="Statement">
          <h2>How it works</h2>
          <p>
            Renting a luxury car has never been easier. Our streamlined process
            makes it simple for you to book and confirm your vehicle of choice
            online.
          </p>
        </div>
        <div id="ExplainSec">
          <div id="Content">
            <div className="ContentSec">
              <div id="icon">
                <IoIosSearch />
              </div>
              <div id="TextCover">
                <h3>Browse and select</h3>
                <p>
                  Choose from our wide range of premium cars,select the pickup
                  and return dates and locations that suit you best.
                </p>
              </div>
            </div>
            <div className="ContentSec">
              <div id="icon">
                <FaCalendarDay />
              </div>
              <div id="TextCover">
                <h3>Book and Confirm</h3>
                <p>
                  Book your desired car with just a few clicks and recieve an
                  instant confirmation via email or SMS.
                </p>
              </div>
            </div>
            <div className="ContentSec">
              <div id="icon">
                <CgSmileMouthOpen />
              </div>
              <div id="TextCover">
                <h3>Enjoy your ride</h3>
                <p>
                  Pick up your car at the designated locaation and enjoy your
                  premiu driving experience with our top-quality service.
                </p>
              </div>
            </div>
          </div>
          <div id="JeepCover">
            <img src={jeep} />
          </div>
        </div>
      </div>
      <div id="Services">
        <div id="ServiceHeading">
          <h2>Our Services & Benefits</h2>
          <p>
            To make renting easy and hassle-free, we provide a variety of
            services and advantages.
          </p>
          <p>
            We have you covered with a variety of vehicles and flexible rental
            terms.
          </p>
        </div>
        <div id="subServiceHeading">
          <div className="serviceBlock">
            <div className="serviceIcon">
              <GiStarsStack id="serviceImg" />
            </div>
            <h3>Premium Quality</h3>
            <p>
              We offer a wid range of high-quality vehicles to choose from,
              including luxury cars,SUVs,vans, and more.
            </p>
          </div>
          <div className="serviceBlock">
            <div className="serviceIcon">
              <FaRegCheckCircle id="serviceImg" />
            </div>
            <h3>Convenient Online Booking</h3>
            <p>
              With our easy-to-use online booking system,customers can quickly
              and conveniently reserve their rental car from anywhere,anytime.
            </p>
          </div>
          <div className="serviceBlock">
            <div className="serviceIcon">
              <MdOutlineSavings id="serviceImg" />
            </div>
            <h3>Affordable Prices</h3>
            <p>
              Our rental rates are highly competetive and affordable,allowing
              our customers to enjoy their trips without breaking the bank.
            </p>
          </div>
        </div>
      </div>
      <div id="Footer">
        <div id="FooterFirstDiv">
          <div className="footerDivision">
            <h3>Rent</h3>
            <p>
              We are a well -known car rental service that has many partners in
              each region to connect with you to assist in your trip in
              meetings,events,holidays or long trips.
            </p>
          </div>
          <div className="footerDivision">
            <h3>Company</h3>
            <p>About Us</p>
            <p>Contact info</p>
            <p>Our Service</p>
            <p>Career</p>
          </div>
          <div className="footerDivision">
            <h3>Services</h3>
            <p>Transfers</p>
            <p>Ride-Hailing</p>
            <p>Corporate Accounts</p>
            <p>Hourly Rentals</p>
          </div>
          <div className="footerDivision">
            <h3>Work Hours</h3>
            <p>9Am - 5Pm, Monday - Saturday</p>
            <p>9258340781</p>
            <p>
              Our Support and Sales team is available 24/7 to answer your
              queries
            </p>
          </div>
        </div>
        <div id="hLine"></div>
      </div>
      <div id="Copyright">
        <p>
          Copyright <span>&copy;</span> 2024 Rent | Developed by Pankaj Singh
        </p>
      </div>
    </div>
  );
};

export default Home;
