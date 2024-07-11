import React, { useContext, useEffect, useState } from "react";
import rentalcontext from "../context/Rentalcontext";
import { Query } from "appwrite";
import ShopCard from "./ShopCard";
import "../css/userShop.css";
const Usershop = () => {
  const contextContent = useContext(rentalcontext);
  const check=async()=>{
    try{
      if(!contextContent.sesionDetail){
        const acc=await contextContent.account.get();
        contextContent.setNewUser(false); 
        //console.log(acc);
        contextContent.setSessionDetail(acc);
      }
    }
    catch(e){
      contextContent.setNewUser(true);
      //console.log(e);
    }
  }
  const [myShop,setMyShop]=useState([]);
    const handleDocumentList=async()=>{
        try{
          if(contextContent.sesionDetail){
            const promise = await contextContent.database.listDocuments(
                process.env.REACT_APP_DATABASE_ID,
                process.env.REACT_APP_SHOP_DETAIL_COLLECTION_ID,
                [Query.equal("id", `${contextContent.sesionDetail.$id}`)]
              );
              setMyShop(promise.documents);
              console.log(promise);
          }
        }
        catch(e){
            contextContent.handleFailureAlert(e);
        }
    }
  useEffect(() => {
    check();
    handleDocumentList();
  }, [contextContent.sesionDetail]);


  return (
    <div>
        <div id="ShopCover" style={{display:(myShop.length===0)?"none":"block"}}>
            {myShop.map((singleShop)=>{
                return <ShopCard key={singleShop.$id} shop={singleShop}/>
                })}
        </div>
    </div>
  )
};

export default Usershop;
