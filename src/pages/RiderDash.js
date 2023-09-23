import React, { useState, useEffect } from 'react';

function RiderDashboard() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [rideOptions, setRideOptions] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);

  useEffect(() => {

    const fetchRideOptions = async () => {
      try {
        const data = [
          { id: 1, name: 'UberX', fare: '$10', eta: '5 min' },
          { id: 2, name: 'UberXL', fare: '$20', eta: '7 min' },
        ];
        setRideOptions(data);
      } catch (error) {
        console.error('Error fetching ride options: ', error);
      }
    };

    if (pickupLocation && dropoffLocation) {
      fetchRideOptions();
    }
  }, [pickupLocation, dropoffLocation]);

  const handleRequestRide = (ride) => {
    // Simulate requesting a ride
    setSelectedRide(ride);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
    <div className="max-w-xl mx-auto bg-white p-4 rounded-lg shadow-md">
      <h1 className=" text-3xl font-semibold mb-4">Rider Dashboard</h1>
      <div className="mb-4">
        <label className="block font-semibold">Pickup Location:</label>
        <input
          type="text"
          className=" border-black rounded-md py-2 px-3"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Dropoff Location:</label>
        <input
          type="text"
          className=" border-black rounded-md py-2 px-3"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
        />
      </div>
      {rideOptions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold">Ride Options</h2>
          <ul>
            {rideOptions.map((ride) => (
              <li key={ride.id}>
                <div className="bg-gray-200 p-3 rounded-lg">
                  <strong>{ride.name}</strong>
                  <p>Fare: {ride.fare}</p>
                  <p>ETA: {ride.eta}</p>
                  <button onClick={() => handleRequestRide(ride)}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg mt-2">
                    Request Ride
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedRide && (
        <div>
          <h2 className="text-xl font-semibold">Selected Ride</h2>
          <p>Ride Name: {selectedRide.name}</p>
          <p>Fare: {selectedRide.fare}</p>
          <p>ETA: {selectedRide.eta}</p>
          <p>Status: Requested</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default RiderDashboard;


