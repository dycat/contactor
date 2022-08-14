import React, { useEffect, useState } from "react";
import { Database, IRecordState, PersonRecord, RecordState } from "./Database/IRecordState";
import { PersonalDetailsTableBuilder } from "./PersonalDetailsTableBuilder";
import { IPersonState } from "./utils/ipersonstate";
import { IProps } from "./utils/iprops";
import { FormValidation } from "./validator/FormValidation";

function PersonalDetails({ DefaultState }: IProps): JSX.Element {
  const [defaultState] = useState<IPersonState>(DefaultState);
  const [state, setState] = useState<IPersonState>(DefaultState);
  const [canSave, setCanSave] = useState(true);

  let dataLayer: Database<PersonRecord>;
  let people: IPersonState[];
  const [peopleHTML, setPeopleHTML] = useState(Array<JSX.Element>());

  useEffect(() => {
    const tableBuilder = new PersonalDetailsTableBuilder();
    dataLayer = new Database(tableBuilder.Build());
    let local_people = null;
    if (people) {
      local_people = people.map((p) => {
        return (
          <div>
            <div key={p.personid}>
              <label>
                {p.firstname} {p.lastname}
              </label>
            </div>
            <button value={p.personid} onClick={setActive}>
              Edit
            </button>
            <button value={p.personid} onClick={deleteRecord}>
              Delete
            </button>
          </div>
        );
      });

      setPeopleHTML(local_people);
    }
  }, []);

  const setActive = (event: any) => {
    const person: string = event.target.value;
    const state = people.find((element: IPersonState) => {
      return element.personid === person;
    });
    if (state) {
      setState(state);
    }
  };

  const loadPeople = () => {
    people = new Array<PersonRecord>();
    dataLayer.Read().then((item) => {
      people = item;
      clear();
    });
  };

  const savePerson = () => {
    if (!canSave) {
      alert("Connot save this record with missing or incorrecty items");
      return;
    }
    const personState : IRecordState = new RecordState();
    personState.IsActive = true;
    const newState : PersonRecord = {...state, ...personState};
    if (newState.personid === "") {
      newState.personid = Date.now().toString();
      dataLayer.Create(newState);
      loadPeople();
      clear();
    } else {
      dataLayer.Update(newState).then((rsn) => loadPeople());
    }
  };

  const deleteRecord = (event: any) => {
    const person = event.target.value;
    deletePerson(person);

  };

  const deletePerson = async (person: string) => {
    const foundPerson = people.find((element: IPersonState) => {
      return element.personid === person;
    });
    if (!foundPerson) {
      return;
    }
    const personState: IRecordState = new RecordState();
    personState.IsActive = false;
    const stateToBeDeleted: PersonRecord = { ...foundPerson, ...personState};
    await dataLayer.Update(stateToBeDeleted);
    loadPeople();
    clear();
  };

  const clear = () => {
    setState(defaultState);
  };

  const userCanSave = (hasErrors: boolean) => {
    setCanSave(hasErrors);
  };

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
            id="firstname"
            placeholder="First Name"
            value={state.firstname}
            onChange={updateBinding}
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            value={state.lastname}
            onChange={updateBinding}
          />

          <label htmlFor="addr1">Address line 1</label>
          <input
            type="text"
            id="addr1"
            value={state.address1!}
            onChange={updateBinding}
            placeholder="Address line 1"
          />

          <label htmlFor="addr2">Address line 2</label>
          <input
            type="text"
            id="addr2"
            value={state.address2!}
            onChange={updateBinding}
            placeholder="Address line 2"
          />

          <label htmlFor="town">Town</label>
          <input
            type="text"
            id="town"
            value={state.town}
            onChange={updateBinding}
            placeholder="Town"
          />

          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={state.country}
            onChange={updateBinding}
            placeholder="Country"
          />

          <label htmlFor="postcode">Postal/Zipcode</label>
          <input
            type="text"
            id="postcode"
            value={state.postcode}
            onChange={updateBinding}
          />

          <label htmlFor="phonenumber">Phone Number</label>
          <input
            type="text"
            id="phonenumber"
            value={state.phonenumber}
            onChange={updateBinding}
          />

          <label htmlFor="dateofbirth">Date of birth</label>
          <input
            type="date"
            name=""
            id="dateofbirth"
            value={state.dateofbirth}
            onChange={updateBinding}
          />

          <button onClick={savePerson}>Save</button>
          <button onClick={clear}>Clear</button>

          <FormValidation
            CurrentState={state}
            CanSave={userCanSave}
          ></FormValidation>
        </div>

        <div>{peopleHTML}</div>
        <button onClick={loadPeople}>Load</button>
        <button onClick={clear}>New Person</button>
      </div>
    </div>
  );
}

export default PersonalDetails;
