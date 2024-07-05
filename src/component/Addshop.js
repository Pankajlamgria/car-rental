import React, { useContext, useState } from "react";
import rentalcontext from "../context/Rentalcontext";
import "../css/addshop.css";
import { IoLocationOutline } from "react-icons/io5";
import { Query } from "appwrite";
const Addshop = () => {
  const contextContent = useContext(rentalcontext);
  const [img1Url, setImg1Url] = useState("");
  const [img2Url, setImg2Url] = useState("");
  const [shopDetail, setShopDetail] = useState({
    shopName: "",
    ownerName: "",
    since: 0,
    address: "",
    email: !contextContent.newUser ? contextContent.sesionDetail.email : "",
    number: 0,
  });

  const handleSubmitForm = async () => {
    console.log(img1Url);
    try {
      if (img2Url != "") {
        const result = await contextContent.database.createDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_SHOP_DETAIL_COLLECTION_ID,
          "unique()",
          {
            name: `${shopDetail.shopName}`,
            address: shopDetail.address,
            number: shopDetail.number,
            email: shopDetail.email,
            shopImg1: new URL(img1Url),
            shopImg2: new URL(img2Url),
            ownerName: shopDetail.ownerName,
            since: Number(shopDetail.since),
          },
          []
        );
        console.log(result);
      } else {
        const result = await contextContent.database.createDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_SHOP_DETAIL_COLLECTION_ID,
          "unique()",
          {
            name: `${shopDetail.shopName}`,
            address: shopDetail.address,
            number: shopDetail.number,
            email: shopDetail.email,
            shopImg1: new URL(img1Url),
            ownerName: shopDetail.ownerName,
            since: Number(shopDetail.since),
          },
          []
        );
        console.log(result);
      }
    } catch (e) {
      alert(e);
    }
  };
  const handleUploadImg = async () => {
    try {
      const res = await contextContent.storage.createFile(
        process.env.REACT_APP_BUCKET_ID,
        "unique()",
        document.getElementById("myFile1").files[0]
      );
      await setImg1Url(
        `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECT_ID}`
      );
      console.log(img1Url);
    } catch (e) {
      alert(e);
    }
  };

  const handleUpdateDetails = (e) => {
    setShopDetail({ ...shopDetail, [e.target.name]: e.target.value });
  };
  const handleFindMyLocation = async () => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showPosition);
    // } else {
    //   alert("Geolocation is not supported by this browser.");
    // }
    const promise = await contextContent.database.listDocuments(
      "66863c7400085e5c0301",
      "66863c97000e46f3283f",
      [Query.equal("_createdBy", contextContent.sesionDetail.$id)]
    );
    console.log(promise);
  };
  const showPosition = (position) => {
    console.log(position.coords);
  };
  return (
    <div id="AddShopCover">
      <div id="FormCover">
        <h2>Add Shop</h2>
        <div id="FirstSec">
          <div>
            <h2>Upload Shop Image</h2>
            <div className="inputImgCover">
              <input type="file" id="myFile1" name="filename" />
              <input
                className="submitBtn"
                type="submit"
                onClick={handleUploadImg}
              />
            </div>
            <div className="inputImgCover">
              <input type="file" id="myFile2" name="filename" />
              <input className="submitBtn" type="submit" />
            </div>
          </div>
          <div>
            <div>
              <label>Shop Name:</label>
              <input
                type="text"
                onChange={handleUpdateDetails}
                name="shopName"
                placeholder="XYZ"
              />
            </div>
            <div>
              <label>Owner Name:</label>
              <input
                type="text"
                onChange={handleUpdateDetails}
                name="ownerName"
                placeholder="Name"
              />
            </div>
            <div>
              <label>Established In</label>
              <input
                type="number"
                onChange={handleUpdateDetails}
                name="since"
                placeholder="Name"
              />
            </div>
          </div>
        </div>
        <div id="SecondSec">
          <div>
            <label>Shop Address:</label>
            <input
              type="text"
              name="address"
              onChange={handleUpdateDetails}
              placeholder="Area city state country"
            />
          </div>
          <div>
            <button id="FindLocation" onClick={handleFindMyLocation}>
              <IoLocationOutline />
              Find My Location
            </button>
            <input value={"None"} disabled />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              onChange={handleUpdateDetails}
              name="email"
              value={shopDetail.email}
              disabled
            />
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type="number"
              onChange={handleUpdateDetails}
              name="number"
              plac
              eholder="1234567890"
            />
          </div>
        </div>
        <button onClick={handleSubmitForm}>Submit</button>
      </div>
      <div></div>
    </div>
  );
};

export default Addshop;
