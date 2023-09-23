import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  orderByChild,
} from "firebase/database";
import { firebaseApp } from "../firebaseconfig";

function DriverDashboard() {
  const [rideRequests, setRideRequests] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [dest, setDest] = useState("");
  const [source, setSource] = useState("");
  const database = getDatabase(firebaseApp);

  // Function to write user data to the Firebase Realtime Database
  const writeUserData = () => {
    try {
      const userId = localStorage.getItem("username");
      const userEmail = localStorage.getItem("userEmail");

      if (userId && userEmail && dest && source) {
        const dataToInsert = {
          email: userEmail,
          dest: dest,
          source: source,
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

  // Function to fetch pending ride requests for the current driver
  const fetchPendingRideRequests = () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      console.log("User Email:", userEmail);
  
      if (userEmail) {
        const rideRequestsRef = ref(database, "ride-requests");
  
        // Query ride requests where the driverMail matches the user's email and status is "pending"
        const query = orderByChild(rideRequestsRef, "status").equalTo("pending");

        console.log("Query:", query.toString());
  
        onValue(query, (snapshot) => {
          const rideRequestsData = snapshot.val();
          console.log("Ride Requests Data:", rideRequestsData);
  
          if (rideRequestsData) {
            const pendingRequests = Object.values(rideRequestsData);
            console.log("All Pending Requests:", pendingRequests);
  
            // Filter the pending requests to only include those assigned to the current driver
            const driverPendingRequests = pendingRequests.filter((request) => {
              return request.driverMail === userEmail && request.status === "pending";
            });
            console.log("Driver Pending Requests:", driverPendingRequests);
  
            setRideRequests(driverPendingRequests);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching pending ride requests: ", error);
    }
  };
  

  // Function to accept a ride request
  const acceptRideRequest = (request) => {
    try {
      const rideRequestId = request.id; // Replace with the actual ID of the ride request
      const rideRequestsRef = ref(database, "ride-requests");
      const userEmail = localStorage.getItem("userEmail");

      // Update the ride request with the driver's email and status "accepted"
      set(child(rideRequestsRef, rideRequestId), {
        ...request, // Keep the existing data
        driverMail: userEmail,
        status: "accepted",
      })
        .then(() => {
          console.log("Ride request accepted successfully");
          // Fetch updated list of pending ride requests
          fetchPendingRideRequests();
        })
        .catch((error) => {
          console.error("Error accepting ride request:", error);
        });
    } catch (error) {
      console.error("Error accepting ride request: ", error);
    }
  };

  useEffect(() => {
    fetchPendingRideRequests();
  }, []);

  return (
    <div className="bg-[#191717] min-h-screen p-8">
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
          {!isAvailable && (
            <>
              <input
                type="text"
                placeholder="Enter source"
                className="p-2 mt-2 rounded-lg w-full"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter dest"
                className="p-2 mt-2 rounded-lg w-full"
                value={dest}
                onChange={(e) => setDest(e.target.value)}
              />
            </>
          )}
          <button className="btn btn-primary" onClick={writeUserData}>
            Save Route
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-2">Pending Ride Requests</h2>
        <ul>
          {rideRequests.map((request) => (
            <li key={request.id} className="mb-2">
              <div className="bg-gray-200 p-2 rounded-lg">
                <strong>Rider: {request.riderUserId}</strong>
                <br />
                Pickup Location: {request.pickupLocation}
                <br />
                Dropoff Location: {request.dropoffLocation}
                <br />
                <button
                  className="py-1 px-2 bg-blue-500 text-white rounded-lg mt-2"
                  onClick={() => acceptRideRequest(request)}
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
