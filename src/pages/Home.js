import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
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

  return (
    <div>
      <Navbar />
      <div className="container landing-container">
        <div className="row">
          <div className="col-md-12 text-center mt-5">
            <h2 className="usename">Hello {username}</h2>
            <h1>Welcome to SahaYaatra</h1>
            <p>An innovative way to Travel</p>
            {username ? (
              // If a username is present, show "Go to Dashboard" button
              <Link to="/dashboard" className="btn btn-outline-primary">
                Go to Dashboard
              </Link>
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
