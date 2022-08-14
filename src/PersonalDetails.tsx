import React, { useEffect, useState } from "react";
import { Database, PersonRecord } from "./Database/IRecordState";
import { PersonalDetailsTableBuilder } from "./PersonalDetailsTableBuilder";
import { IPersonState } from "./utils/ipersonstate";
import { IProps } from "./utils/iprops";
import { FormValidation } from "./validator/FormValidation";

function PersonalDetails({ DefaultState }: IProps): JSX.Element {
  const [defaultState, setDefaultState] = useState<IPersonState>(DefaultState);
  const [state, setState] = useState<IPersonState>(DefaultState);
  const [canSave, setCanSave] = useState(true);

  let dataLayer: Database<PersonRecord>;
  let people: IPersonState[];

  useEffect(() => {
    const tableBuilder = new PersonalDetailsTableBuilder();
    dataLayer= new Database(tableBuilder.Build())
    let local_people = null;
    if (people) {
      local_people = people.map((p) => {
        return (
          <div>
            <div key={p.personid}><label>{p.firstname} {p.lastname}</label></div>
            <button value={p.personid} onClick={setActive}>Edit</button>
            <button value={p.personid} onClick={deletePerson}>Delete</button>
          </div>
        )
      })
    }

  }, [])

  const setActive = (event: any) => {
    const person: string = event.target.value;
    const state = people.find((element: IPersonState) => {
      return element.personid === person;
    })
    if (state) {
      setState(state);
    }
  }

  const deletePerson = () => {

  }


  const userCanSave = (hasErrors: boolean) => {
    setCanSave(hasErrors);
  }

  const updateBinding = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    switch (target.id) {
      case "firstname":
        setState((prevState) => {
          return { ...prevState, firstname: target.value };
        });
        break;
      case "lastname":
        setState((prevState) => {
          return { ...prevState, lastname: target.value };
        });
        break;
      case "addr1":
        setState((prevState) => {
          return { ...prevState, addr1: target.value };
        });
        break;
      case "addr2":
        setState((prevState) => {
          return { ...prevState, addr2: target.value };
        });
        break;
      case "town":
        setState((prevState) => {
          return { ...prevState, town: target.value };
        });
        break;
      case "country":
        setState((prevState) => {
          return { ...prevState, country: target.value };
        });
        break;
      case "postcode":
        setState((prevState) => {
          return { ...prevState, postcode: target.value };
        });
        break;
      case "phonenumber":
        setState((prevState) => {
          return { ...prevState, phonenumber: target.value };
        });
        break;
      case "dateofbirth":
        setState((prevState) => {
          return { ...prevState, dateofbirth: target.value };
        });
        break;
    }
  };

  return (
    <div className="flex flex-col m-2 gap-2">
      <div className="w-full h-1/6">
        <h2>Personal details</h2>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name=""
            id="firstname"
            placeholder="First Name"
            value={state.firstname}
            onChange={updateBinding}
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name=""
            id="lastname"
            placeholder="Last Name"
            value={state.lastname}
            onChange={updateBinding}
          />

          <label htmlFor="addr1">Address line 1</label>
          <input type="text" name="" id="addr1" placeholder="Address line 1" />

          <label htmlFor="addr2">Address line 2</label>
          <input type="text" name="" id="addr2" placeholder="Address line 2" />

          <label htmlFor="town">Town</label>
          <input type="text" name="" id="town" placeholder="Town" />

          <label htmlFor="country">Country</label>
          <input type="text" name="" id="country" placeholder="Country" />

          <label htmlFor="postcode">Postal/Zipcode</label>
          <input type="text" name="" id="postcode" />

          <label htmlFor="phonenumber">Phone Number</label>
          <input type="text" name="" id="phonenumber" />

          <label htmlFor="dateofbirth">Date of birth</label>
          <input type="date" name="" id="dateofbirth" />

          <button>Save</button>
          <button>Clear</button>

          <FormValidation CurrentState={state} CanSave={userCanSave}></FormValidation>
        </div>

        <button>Load</button>
        <button>New Person</button>
      </div>
    </div>
  );
}

export default PersonalDetails;
