import React, { useState, useEffect } from "react";

function DriverDashboard() {
  const [rideRequests, setRideRequests] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  // Simulate fetching ride requests from an API or database
  useEffect(() => {
    // Replace this with actual API call
    const fetchRideRequests = async () => {
      try {
        // Fetch ride requests data
        const response = await fetch("api/ride-requests");
        const data = await response.json();
        setRideRequests(data);
      } catch (error) {
        console.error("Error fetching ride requests: ", error);
      }
    };

    fetchRideRequests();
  }, []);

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <div className="bg-[#191717] min-h-screen p-8 ">
      <div className="max-w-xl mx-auto bg-[#F1EFEF] p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Driver Dashboard</h1>
        <div className="mb-4">
          <button
            onClick={handleToggleAvailability}
            className={`py-2 px-4 rounded-lg ${
              isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isAvailable ? "Go Offline" : "Go Online"}
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-2">Pending Ride Requests</h2>
        <ul>
          {rideRequests.map((request) => (
            <li key={request.id} className="mb-2">
              <div className="bg-gray-200 p-2 rounded-lg">
                <strong>Passenger: {request.passengerName}</strong>
                <br />
                From: {request.pickupLocation} - To: {request.destination}
                <br />
                Distance: {request.distance} miles
                <br />
                Fare: ${request.fare}
                <br />
                <button className="py-1 px-2 bg-blue-500 text-white rounded-lg mt-2">
                  Accept
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DriverDashboard;
