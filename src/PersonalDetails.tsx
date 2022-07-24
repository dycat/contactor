function PersonalDetails(): JSX.Element {
  return (
    <div className="flex flex-col m-2 gap-2">
      <div  className="w-full h-1/6">
        <h2>Personal details</h2>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="firstname">First Name</label>
          <input type="text" name="" id="" placeholder="First Name" />

          <label htmlFor="lastname">Last Name</label>
          <input type="text" name="" id="" placeholder="Last Name" />

          <label htmlFor="addr1">Address line 1</label>
          <input type="text" name="" id="" placeholder="Address line 1" />

          <label htmlFor="addr2">Address line 2</label>
          <input type="text" name="" id="" placeholder="Address line 2" />

          <label htmlFor="town">Town</label>
          <input type="text" name="" id="town" placeholder="Town" />

          <label htmlFor="country">Country</label>
          <input type="text" name="" id="country" placeholder="Country" />

          <label htmlFor="postcode">Postal/Zipcode</label>
          <input type="text" name="" id="" />

          <label htmlFor="phonenumber">Phone Number</label>
          <input type="text" name="" id="" />

          <label htmlFor="dateofbirth">Date of birth</label>
          <input type="date" name="" id="dateofbirth" />

          <button>Save</button>
          <button>Clear</button>
        </div>

        <button>Load</button>
        <button>New Person</button>
      </div>
    </div>
  );
}

export default PersonalDetails;
