import React from "react";
import "./App.css";
import PersonalDetails from "./PersonalDetails";
import { IPersonState } from "./utils/ipersonstate";
import { IProps } from "./utils/iprops";

function App() {
  const defaultPerson: IPersonState = {
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    town: "",
    country: "",
    phonenumber: "",
    postcode: "",
    dateofbirth: new Date().toISOString().substring(0,10),
    personid: ""
  }
  return (
    <div>
      <PersonalDetails DefaultState={defaultPerson}></PersonalDetails>
    </div>
  );
}

export default App;
