import React, { useContext, useState } from "react";
import "../css/carform.css";
import rentalcontext from "../context/Rentalcontext";
const Carform = (e) => {
  const contextContent = useContext(rentalcontext);
  const [vehicleImg1, setVehicleImg1] = useState("");
  const [vehicleImg2, setVehicleImg2] = useState("");
  const [carDetail, setCarDetail] = useState({
    brandName: "",
    modelName: "",
    year: 0,
    category: "",
    class: "",
    kms: 0,
    cc: 0,
    price: 0,
    fuelType: "",
    seater: 0,
  });

  const handleCarImgUpload = async (id) => {
    try {
      const res = await contextContent.storage.createFile(
        process.env.REACT_APP_BUCKET_ID,
        "unique()",
        document.getElementById(id).files[0]
      );
      if (id === "CarImg1") {
        setVehicleImg1(
          `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECT_ID}`
        );
        document.getElementById("CarUploadBtn1").style.borderColor = "green";
      } else {
        setVehicleImg2(
          `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECT_ID}`
        );
        document.getElementById("CarUploadBtn2").style.borderColor = "green";
      }
      contextContent.handleSuccessAlert("Image Uploaded Successfully.");
    } catch (e) {
      contextContent.handleFailureAlert("Image not  Uploaded Successfully.");
      if (id === "CarImg1")
        document.getElementById("CarUploadBtn1").style.borderColor = "red";
      else document.getElementById("CarUploadBtn2").style.borderColor = "red";
    }
  };

  const handleUpdateCarDetails = (e) => {
    setCarDetail({ ...carDetail, [e.target.name]: e.target.value });
  };
  const handleAddCar = async () => {
    try {
      if (vehicleImg2 !== "") {
        const result = await contextContent.database.createDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_CAR_COLLECTION_ID,
          "unique()",
          {
            shopId: `${contextContent.shopId}`,
            brandName: carDetail.brandName,
            modelName: carDetail.modelName,
            fuelType:carDetail.fuelType,
            seater:Number(carDetail.seater),
            year: Number(carDetail.year),
            kms: Number(carDetail.kms),
            cc: Number(carDetail.cc),
            price: Number(carDetail.price),
            category: carDetail.category,
            class: carDetail.class,
            carImg1: new URL(vehicleImg1),
            carImg2: new URL(vehicleImg2),
          },
          []
        );
        console.log(result);

      } else {
        const result = await contextContent.database.createDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_CAR_COLLECTION_ID,
          "unique()",
          {
            shopId: `${contextContent.shopId}`,
            brandName: carDetail.brandName,
            modelName: carDetail.modelName,
            fuelType:carDetail.fuelType,
            seater:Number(carDetail.seater),
            year: Number(carDetail.year),
            kms: Number(carDetail.kms),
            cc: Number(carDetail.cc),
            price: Number(carDetail.price),
            category: carDetail.category,
            class: carDetail.class,
            carImg1: new URL(vehicleImg1),
          },
          []
        );
      }
      contextContent.handleSuccessAlert("Car Added Successfully...");
    } catch (e) {
      if (vehicleImg1 === "") {
        document.getElementById("CarUploadBtn1").style.borderColor = "red";
        contextContent.handleFailureAlert("Image not  Uploaded.");
      } else {
        contextContent.handleFailureAlert(`${e}`);
      }
    }
  };
  return (
    <div>
      <div className="vehicleImgSection">
        <div>
          <h2>Upload Car Images</h2>
          <div className="inputImgCover">
            <input type="file" id="CarImg1" name="filename" />
            <input
              className="submitBtn"
              type="submit"
              id="CarUploadBtn1"
              onClick={() => {
                handleCarImgUpload("CarImg1");
              }}
            />
          </div>
          <div className="inputImgCover">
            <input type="file" id="CarImg2" name="filename" />
            <input
              className="submitBtn"
              type="submit"
              id="CarUploadBtn2"
              onClick={() => {
                handleCarImgUpload("CarImg2");
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
              placeholder="Honda,Mahindra,Toyota.."
              onChange={handleUpdateCarDetails}
            />
          </div>
          <div>
            <label>Model Name* </label>
            <input
              type="text"
              onChange={handleUpdateCarDetails}
              name="modelName"
              placeholder="Amaze,Scorpio,Fortuner ...."
            />
          </div>
          <div>
            <label>Year Model* </label>
            <input
              type="number"
              onChange={handleUpdateCarDetails}
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
            onChange={handleUpdateCarDetails}
            placeholder="Sedan|Hatchback|Coupe|Convertible.."
          />
        </div>
        <div>
          <label>Type</label>
          <input
            type="text"
            name="fuelType"
            onChange={handleUpdateCarDetails}
            placeholder="Petrol|Diesel.."
          />
        </div>
        <div>
          <label>Seater</label>
          <input
            type="number"
            name="seater"
            onChange={handleUpdateCarDetails}
            placeholder="1 | 2 | 3 | 4 | 5 | 6 | 7..."
          />
        </div>
        <div>
          <label>Class* </label>
          <input
            type="text"
            onChange={handleUpdateCarDetails}
            name="class"
            placeholder="I/II/III"
          />
        </div>
        <div>
          <label>KM Riden*</label>
          <input
            type="number"
            onChange={handleUpdateCarDetails}
            name="kms"
            placeholder="23000"
          />
        </div>
        <div>
          <label>CC*</label>
          <input
            type="number"
            onChange={handleUpdateCarDetails}
            name="cc"
            placeholder="1000/650/150"
          />
        </div>
        <div>
          <label>Price/24hrs*</label>
          <input
            type="number"
            onChange={handleUpdateCarDetails}
            name="price"
            placeholder="500"
          />
        </div>
        <button
          className="submitBtn"
          style={{ marginTop: "2rem" }}
          onClick={handleAddCar}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Carform;
