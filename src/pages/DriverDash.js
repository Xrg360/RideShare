import React, { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseApp } from "../firebaseconfig";

function DriverDashboard() {
  const [rideRequests, setRideRequests] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [destination, setDestination] = useState(""); // State for destination

  const database = getDatabase(firebaseApp);

  // Function to write user data to the Firebase Realtime Database
  const writeUserData = () => {
    try {
      const userId = localStorage.getItem('username');
      const userEmail = localStorage.getItem('userEmail');

      if (userId && userEmail && destination) {
        const dataToInsert = {
          email: userEmail,
          destination: destination,
        };

        const userRef = ref(database, `drivers/${userId}`);
        set(userRef, dataToInsert)
          .then(() => {
            console.log("Data inserted successfully");
          })
          .catch((error) => {
            console.error("Error inserting data:", error);
          });
      } else {
        console.error("Missing user information or destination");
      }
    } catch (error) {
      console.error("Error writing user data:", error);
    }
  };

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

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
            {isAvailable ? "Go Online" : "Go Offline"}
          </button>
          {/* Input field for destination */}
          {!isAvailable && (
            <input
              type="text"
              placeholder="Enter destination"
              className="p-2 mt-2 rounded-lg w-full"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          )}
          <button className="btn btn-primary" onClick={writeUserData}>
            Save Destination
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
                <button
                  className="py-1 px-2 bg-blue-500 text-white rounded-lg mt-2"
                  onClick={() => {
                    /* Add code to accept the ride request */
                  }}
                >
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
