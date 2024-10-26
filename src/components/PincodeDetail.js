import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PincodeDetail() {
  const [postalData, setPostalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const { pincode } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        setFetchSuccess(false);
       

        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data[0].Status === 'Success') {
          setPostalData(data[0].PostOffice);
          setFilteredData(data[0].PostOffice);
          setFetchSuccess(true);
        } else {
          setPostalData([]);
          setFilteredData([]);
          throw new Error(data[0].Message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pincode]);

  const handleFilterChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setFilterTerm(searchTerm);
    const filtered = postalData.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
       {fetchSuccess && (
        <div>
          <h1>Pincode: {pincode}</h1>
          <h1>Message: Number of pincode(s) found:{filteredData.length}</h1>
        </div>
      )}
      <input
        type="text"
        placeholder="Filter"
        value={filterTerm}
        onChange={handleFilterChange}
      />

      {loading && <div>Loading...</div>}
      
      {error && <div>Error: {error}</div>}

      {filteredData.length > 0 ? (
        <div className='main'>
          {filteredData.map((item, index) => (
            <div key={index} className='div1'>
              <div className='div'>
                <strong>Post Office Name: </strong>
                {item.Name}
              </div>
              <div className='div'>
                <strong>Branch Type: </strong>
                {item.BranchType}
              </div>
              <div className='div'>
                <strong>Delivery Status: </strong>
                {item.DeliveryStatus}
              </div>
              <div className='div'>
                <strong>District: </strong>
                {item.District}
              </div>
             
              <div className='div'>
                <strong>State: </strong>
                {item.State}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {loading ? null : (
            <div>
              <h3>Couldn’t find the postal data you’re looking for…</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PincodeDetail;