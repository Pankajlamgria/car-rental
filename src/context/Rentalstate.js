import React, { useState } from "react";
import rentalcontext from "./Rentalcontext";
import { Account, Client, Databases, Locale, Storage } from "appwrite";
const Rentalstate = (props) => {
  const [newUser,setNewUser]=useState(true);
  const [sesionDetail,setSessionDetail]=useState();

  const client = new Client();
  client.setEndpoint(process.env.REACT_APP_ENDPOINT).setProject(process.env.REACT_APP_PROJECT_ID);
  const account=new Account(client);
  const locale = new Locale(client);
  const storage=new Storage(client)
  const database=new Databases(client);

  return (
    <rentalcontext.Provider value={{
        account,client,newUser,setNewUser,setSessionDetail,sesionDetail,locale,storage,database
    }}>{props.children}</rentalcontext.Provider>
  );
};

export default Rentalstate;
