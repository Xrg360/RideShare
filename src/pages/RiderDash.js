import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { firebaseApp } from "../firebaseconfig";
import { Link } from "react-router-dom";

function RiderDashboard() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [drivers, setDrivers] = useState([]);

  const database = getDatabase(firebaseApp);

  // Function to write rider data to the Firebase Realtime Database
  const writeRiderData = () => {
    try {
      const userId = localStorage.getItem("username");
      const userEmail = localStorage.getItem("userEmail");

      if (userId && userEmail && dropoffLocation) {
        const dataToInsert = {
          email: userEmail,
          pickupLocation: pickupLocation,
          dropoffLocation: dropoffLocation,
        };

        const userRef = ref(database, `riders/${userId}`);
        set(userRef, dataToInsert)
          .then(() => {
            console.log("Data inserted successfully");
            // Fetch all drivers after saving rider data
            fetchAllDrivers();
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

  const fetchAllDrivers = () => {
    try {
      // Fetch the list of all drivers from the database
      const driversRef = ref(database, "drivers");
      onValue(driversRef, (snapshot) => {
        const driverData = snapshot.val();
        if (driverData) {
          // Filter drivers based on destination
          const allDrivers = Object.values(driverData).filter(
            (driver) => driver.destination === dropoffLocation
          );
          setDrivers(allDrivers);
        }
      });
    } catch (error) {
      console.error("Error fetching drivers: ", error);
    }
  };
  

  useEffect(() => {
    // Fetch all drivers when the component mounts
    fetchAllDrivers();
  }, []);

  return (
    <div className="bg-[#191717] min-h-screen p-8">
      <div className="max-w-xl mx-auto bg-[#F1EFEF] p-4 rounded-lg shadow-md">
        <Link to='/' >back</Link>
        <h1 className="text-3xl font-semibold mb-4">Rider Dashboard</h1>
        <div className="mb-4">
          <label className="block font-semibold">Pickup Location:</label>
          <input
            type="text"
            className="border-black rounded-md py-2 px-3"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold">Dropoff Location:</label>
          <input
            type="text"
            className="border-black rounded-md py-2 px-3"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={writeRiderData}>
          Save Locations
        </button>
        <h2 className="text-xl font-semibold mt-4">All Drivers</h2>
        <ul>
          {drivers.map((driver) => (
            <li key={driver.id} className="mb-2">
              <div className="bg-gray-200 p-2 rounded-lg">
              <strong>Driver: {driver.email.split("@")[0]}</strong>

                <br />
                Destination: {driver.destination}
                <br />
                <button
                  className="py-1 px-2 bg-blue-500 text-white rounded-lg mt-2"
                  onClick={() => {
                    // Add code to request a ride with the selected driver
                  }}
                >
                  Request Ride
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RiderDashboard;
