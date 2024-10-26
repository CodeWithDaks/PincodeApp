import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

function PincodeEntry() {
  const [pincode, setPincode] = useState('');
  
  
  const navigate = useNavigate();

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pincode.length !== 6 || isNaN(pincode)) {
        alert('Postal code should be a 6-digit number.');
        setPincode('')
        return;
      }
    navigate(`/detail/${pincode}`)
  };

  return (
    <div>
      <h1>Enter Pincode</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <br />
        <br />
        <button type="submit" id='btn'>Lookup</button>
      </form>
    </div>
  );
}

export default PincodeEntry;