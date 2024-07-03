import React, { useState } from "react";
import rentalcontext from "./Rentalcontext";
import { Account, Client } from "appwrite";
const Rentalstate = (props) => {
  const [newUser,setNewUser]=useState(true);
  const [sesionDetail,setSessionDetail]=useState();

  const client = new Client();
  client.setEndpoint(process.env.REACT_APP_ENDPOINT).setProject(process.env.REACT_APP_PROJECT_ID);
  const account=new Account(client);

  return (
    <rentalcontext.Provider value={{
        account,client,newUser,setNewUser,setSessionDetail,sesionDetail
    }}>{props.children}</rentalcontext.Provider>
  );
};

export default Rentalstate;
