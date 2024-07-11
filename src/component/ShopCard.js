import React, { useContext, useState } from "react";
import "../css/userShop.css";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";
import { BsPersonVideo } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import rentalcontext from "../context/Rentalcontext";
import { Query } from "appwrite";
const ShopCard = (props) => {
  const contextContent = useContext(rentalcontext);
  const [show, setshow] = useState(true);
  const navigate = useNavigate();
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
  const handleReadMore = async () => {
    localStorage.setItem("shopId", `${props.shop.$id}`);
    contextContent.setShopInfo(props.shop);

    try {
      const res = await contextContent.database.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_CAR_COLLECTION_ID,
        [Query.equal("shopId", `${props.shop.$id}`)]
      );
      console.log(res.documents);
      contextContent.setCarList(res.documents);
      console.log(res);
      const res2 = await contextContent.database.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_BIKE_COLLECTION_ID,
        [Query.equal("shopId", `${props.shop.$id}`)]
      );
      contextContent.setBikeList(res2.documents);
      console.log(res2);
      navigate(`/shop`);
    } catch (e) {
      contextContent.handleFailureAlert(e);
    }
    
  };
  return (
    <div className="shopProfileCard">
      <div id="shopImgCover">
        <img
          style={{ opacity: show ? "1" : "0", width: show ? "100%" : "0%" }}
          id="Img1"
          src={props.shop.shopImg1}
        />
        <img
          style={{ opacity: show ? "0" : "1", width: show ? "0" : "100%" }}
          id="Img2"
          src={props.shop.shopImg2}
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
      <div id="shopDetailsCover">
        <h1>{props.shop.name}</h1>
        <h2>
          <BsPersonVideo /> {props.shop.ownerName}
        </h2>
        <h4>
          <BsHouseFill /> {props.shop.address}
        </h4>

        <div id="Rating">
          <FaStar className="ratedIcon" />
          <FaStar className="ratedIcon" />
          <FaStar className="ratedIcon" />
          <CiStar className="unratedIcon" />
          <CiStar className="unratedIcon" />
          <span>11.3K</span>
        </div>
        <div id="VerifiedCover">
          <div id="VerifiedBlock">
            <FaCheck /> Verified on site
          </div>
          <span onClick={handleReadMore}>read more</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
