import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { getDatabase, ref, remove } from 'firebase/database'; // Import the Firebase Realtime Database functions

const Home = () => {
  const database = getDatabase(); // Initialize Firebase database

  useEffect(() => {
    // Check if the user is logged in (email exists in localStorage)
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      // Extract the part before "@" symbol to use as the username
      const username = userEmail.split('@')[0];
      localStorage.setItem('username', username);
    }
  }, []);

  // Check if a username is present in localStorage
  const username = localStorage.getItem('username');

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Clear the localStorage
      localStorage.clear();

      // Clear the user's entry from the "riders" database
      const userId = localStorage.getItem('username');
      if (userId) {
        const riderRef = ref(database, `riders/${userId}`);
        await remove(riderRef);
      }

      // Clear the user's entry from the "drivers" database
      if (userId) {
        const driverRef = ref(database, `drivers/${userId}`);
        await remove(driverRef);
      }

      // Optionally, you can redirect the user to the login page or another page after logout.
      // Example: window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container landing-container">
        <div className="row">
          <div className="col-md-12 text-center mt-5">
            <h2 className="username">Hello {username}</h2>
            <h1>Welcome to SahaYaatra</h1>
            <p>An innovative way to Travel</p>
            {username ? (
              <>
                <Link to="/Rider" className="btn btn-outline-primary">
                  Ride
                </Link>
                <Link to="/Drive" className="btn btn-outline-primary">
                  Drive
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger"
                >
                  Logout
                </button>
              </>
            ) : (
              // If no username is present, show "Get Started" button
              <Link to="/signin" className="btn btn-outline-primary">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
