import React, { useContext, useEffect, useState } from "react";
import rentalcontext from "../context/Rentalcontext";
import "../css/addshop.css";
import { IoLocationOutline } from "react-icons/io5";
import { Query } from "appwrite";
import Carform from "./Carform";
const Addshop = () => {
  const contextContent = useContext(rentalcontext);
  const [img1Url, setImg1Url] = useState("");
  const [img2Url, setImg2Url] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [vehicleImg1, setVehicleImg1] = useState("");
  const [vehicleImg2, setVehicleImg2] = useState("");
  const [bikeDetail,setBikeDetail]=useState({brandName:"",modelName:"",year:0,category:"",class:"",kms:0,cc:0,price:0})





  // const [toggleAddShop, setToggleAddShop] = useState(true);
  const [shopDetail, setShopDetail] = useState({
    shopName: "",
    ownerName: "",
    since: 0,
    address: "",
    email: !contextContent.newUser ? contextContent.sesionDetail.email : "",
    number: 0,
  });

  const handleSubmitForm = async () => {
    try {
      if (img2Url !== "") {
        const result = await contextContent.database.createDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_SHOP_DETAIL_COLLECTION_ID,
          "unique()",
          {
            id: `${contextContent.sesionDetail.$id}`,
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
            id: `${contextContent.sesionDetail.$id}`,
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
        contextContent.handleSuccessAlert("Shop Created Successfully...");
        contextContent.setShopId(result.$id);
        contextContent.setToggleAddShop(false);
      }
    } catch (e) {
      if (img1Url === "") {
        document.getElementById("UploadBtn1").style.borderColor = "red";
        contextContent.handleFailureAlert("Image not  Uploaded.");
      } else {
        contextContent.handleFailureAlert(`${e}`);
      }
    }
  };
  const handleUploadImg = async () => {
    console.log("clicked");
    try {
      const res = await contextContent.storage.createFile(
        process.env.REACT_APP_BUCKET_ID,
        "unique()",
        document.getElementById("myFile1").files[0]
      );
      await setImg1Url(
        `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECT_ID}`
      );
      contextContent.handleSuccessAlert("Image Uploaded Successfully.");

      document.getElementById("UploadBtn1").style.borderColor = "green";
    } catch (e) {
      contextContent.handleFailureAlert("Image not  Uploaded Successfully.");
      document.getElementById("UploadBtn1").style.borderColor = "red";
    }
  };
  const handleBikeImgUpload = async (id) => {
    try {
      const res = await contextContent.storage.createFile(
        process.env.REACT_APP_BUCKET_ID,
        "unique()",
        document.getElementById(id).files[0]
      );
      if (id === "BikeImg1") {
        setVehicleImg1(
          `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECT_ID}`
        );
        document.getElementById("BikeUploadBtn1").style.borderColor = "green";
      } else {
        setVehicleImg2(
          `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECT_ID}`
        );
        document.getElementById("BikeUploadBtn2").style.borderColor = "green";
      }
      contextContent.handleSuccessAlert("Image Uploaded Successfully.");
    } catch (e) {
      contextContent.handleFailureAlert("Image not  Uploaded Successfully.");
      if (id === "BikeImg1")
        document.getElementById("BikeUploadBtn1").style.borderColor = "red";
      else document.getElementById("BikeUploadBtn2").style.borderColor = "red";
    }
  };

  const handleUpdateDetails = (e) => {
    setShopDetail({ ...shopDetail, [e.target.name]: e.target.value });
  };
  const handleFindMyLocation = async () => {
    const promise = await contextContent.database.listDocuments(
      process.env.REACT_APP_DATABASE_ID,
      process.env.REACT_APP_SHOP_DETAIL_COLLECTION_ID,
      [Query.equal("id", `${contextContent.sesionDetail.$id}`)]
    );
    console.log(promise);
  };

  const handleUpdateRadio = (e) => {
    setVehicle(e.target.value);
  };


  const handleUpdateBikeDetails=(e)=>{
    setBikeDetail({...bikeDetail,[e.target.name]:e.target.value});
  }
  const handleAddBike=async(e)=>{
    try {
      if (vehicleImg2 !== "") {
        const result = await contextContent.database.createDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_BIKE_COLLECTION_ID,
          "unique()",
          {
            shopId: `${contextContent.shopId}`,
            brandName: bikeDetail.brandName,
            modelName: bikeDetail.modelName,
            year: Number(bikeDetail.year),
            kms: Number(bikeDetail.kms),
            cc: Number(bikeDetail.cc),
            price:Number(bikeDetail.price),
            category: bikeDetail.category,
            class: bikeDetail.class,
            bikeImg1: new URL(vehicleImg1),
            bikeImg2: new URL(vehicleImg2),
          },
          []
        );
        console.log(result);
      } else {
        const result = await contextContent.database.createDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_BIKE_COLLECTION_ID,
          "unique()",
          {
            shopId: `${contextContent.shopId}`,
            brandName: bikeDetail.brandName,
            modelName: bikeDetail.modelName,
            year: Number(bikeDetail.year),
            kms: Number(bikeDetail.kms),
            cc: Number(bikeDetail.cc),
            price:Number(bikeDetail.price),
            category: bikeDetail.category,
            class: bikeDetail.class,
            bikeImg1: new URL(vehicleImg1),
          },
          []
        );
        contextContent.handleSuccessAlert("Bike Added Successfully...");
      }
    } catch (e) {
      if (vehicleImg1 === "") {
        document.getElementById("BikeUploadBtn1").style.borderColor = "red";
        contextContent.handleFailureAlert("Image not  Uploaded.");
      } else {
        contextContent.handleFailureAlert(`${e}`);
      }
    }
  }
  return (
    <div id="AddShopCover">
      <div id="FormCover" style={{ display: contextContent.toggleAddShop ? "block" : "none" }}>
        <h2>Add Shop</h2>
        <div id="FirstSec">
          <div>
            <h2>Upload Shop Image</h2>
            <div className="inputImgCover">
              <input type="file" id="myFile1" name="filename" />
              <input
                className="submitBtn"
                type="submit"
                id="UploadBtn1"
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
              <label>Shop Name* </label>
              <input
                type="text"
                onChange={handleUpdateDetails}
                name="shopName"
                placeholder="XYZ"
              />
            </div>
            <div>
              <label>Owner Name* </label>
              <input
                type="text"
                onChange={handleUpdateDetails}
                name="ownerName"
                placeholder="Name"
              />
            </div>
            <div>
              <label>Established In* </label>
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
            <label>Shop Address* </label>
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
            <label>Email* </label>
            <input
              type="email"
              onChange={handleUpdateDetails}
              name="email"
              value={shopDetail.email}
              disabled
            />
          </div>
          <div>
            <label>Contact Number*</label>
            <input
              type="number"
              onChange={handleUpdateDetails}
              name="number"
              placeholder="1234567890"
            />
          </div>
        </div>
        <button onClick={handleSubmitForm}>Submit</button>
      </div>
      <div
        id="AddVehicle"
        style={{ display: contextContent.toggleAddShop ? "none" : "block" }}
      >
        <div>
          <p>Select Vehicle:</p>
          <label>
            <input
              onClick={handleUpdateRadio}
              type="radio"
              name="vehicle"
              value="Car"
            />
            Car
          </label>
          <label>
            <input
              onClick={handleUpdateRadio}
              type="radio"
              name="vehicle"
              value="Bike"
            />
            Bike
          </label>
        </div>
        <div
          id="CarForm"
          style={{ display: vehicle === "Car" ? "block" : "none" }}
        >
          <Carform/>
        </div>
        <div
          id="BikeForm"
          style={{ display: vehicle === "Bike" ? "block" : "none" }}
        >
          <div className="vehicleImgSection">
            <div>
              <h2>Upload Bike Images</h2>
              <div className="inputImgCover">
                <input type="file" id="BikeImg1" name="filename" />
                <input
                  className="submitBtn"
                  type="submit"
                  id="BikeUploadBtn1"
                  onClick={() => {
                    handleBikeImgUpload("BikeImg1");
                  }}
                />
              </div>
              <div className="inputImgCover">
                <input type="file" id="BikeImg2" name="filename" />
                <input
                  className="submitBtn"
                  type="submit"
                  id="BikeUploadBtn2"
                  onClick={() => {
                    handleBikeImgUpload("BikeImg2");
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <label>Brand Name* </label>
                <input
                  type="text"
                  name="brandName"
                  placeholder="Honda,Tvs,Bajaj.."
                  onChange={handleUpdateBikeDetails}
                />
              </div>
              <div>
                <label>Model Name* </label>
                <input
                  type="text"
                  onChange={handleUpdateBikeDetails}
                  name="modelName"
                  placeholder="CBR,NTORQ,PULSAR ...."
                />
              </div>
              <div>
                <label>Year Model* </label>
                <input
                  type="number"
                  onChange={handleUpdateBikeDetails}
                  name="year"
                  placeholder="2010"
                />
              </div>
            </div>
          </div>
          <div className="vehicleDetailSection">
            <div>
              <label>Category</label>
              <input
                type="text"
                name="category"
                onChange={handleUpdateBikeDetails}
                placeholder="SuperBike , cafe racer, naked"
              />
            </div>
            <div>
              <label>Class* </label>
              <input
                type="text"
                onChange={handleUpdateBikeDetails}
                name="class"
                placeholder="I/II/III"
              />
            </div>
            <div>
              <label>KM Riden*</label>
              <input
                type="number"
                onChange={handleUpdateBikeDetails}
                name="kms"
                placeholder="23000"
              />
            </div>
            <div>
              <label>CC*</label>
              <input
                type="number"
                onChange={handleUpdateBikeDetails}
                name="cc"
                placeholder="1000/650/150"
              />
            </div>
            <div>
              <label>Price/24hrs*</label>
              <input
                type="number"
                onChange={handleUpdateBikeDetails}
                name="price"
                placeholder="500"
              />
            </div>
            <button
              className="submitBtn"
              style={{ marginTop: "2rem" }}
              onClick={handleAddBike}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addshop;
