import React, { useState } from "react";
import rentalcontext from "./Rentalcontext";
import { Account, Client, Databases, Locale, Storage } from "appwrite";
const Rentalstate = (props) => {
  const [newUser, setNewUser] = useState(true);
  const [sesionDetail, setSessionDetail] = useState();
  const [successAlertText, setSuccessAlertText] = useState("success full alert");
  const [failureAlertText, setFailureAlertText] = useState("failure full alert");

  const client = new Client();
  client
    .setEndpoint(process.env.REACT_APP_ENDPOINT)
    .setProject(process.env.REACT_APP_PROJECT_ID);
  const account = new Account(client);
  const locale = new Locale(client);
  const storage = new Storage(client);
  const database = new Databases(client);


  const handleSuccessAlert=(text)=>{
    document.getElementById("SuccessAlert").style.display="flex";
    setSuccessAlertText(text);
    document.getElementById("SuccessAlert").classList.add("showNotification");
  }

  const closeSuccessAlert=()=>{
    document.getElementById("SuccessAlert").classList.remove("showNotification");
  }
  const handleFailureAlert=(text)=>{
    document.getElementById("FailureAlert").style.display="flex";
    setFailureAlertText(text);
    document.getElementById("FailureAlert").classList.add("showNotification");
  }

  const closeFailureAlert=()=>{
    document.getElementById("FailureAlert").classList.remove("showNotification");
  }
  return (
    <rentalcontext.Provider
      value={{
        account,
        client,
        newUser,
        setNewUser,
        setSessionDetail,
        sesionDetail,
        locale,
        storage,
        database,
        successAlertText,
        setSuccessAlertText,
        handleSuccessAlert,
        closeSuccessAlert,
        closeFailureAlert,
        handleFailureAlert,
        failureAlertText

      }}
    >
      {props.children}
    </rentalcontext.Provider>
  );
};

export default Rentalstate;
