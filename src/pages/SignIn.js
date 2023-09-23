import React, { useState } from 'react';
import { auth } from '../firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Successfully signed in");
  
      // Store the email in localStorage
      localStorage.setItem('userEmail', email);
      
      navigate("/"); 
      window.location.reload();// Use navigate function to redirect upon successful login
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className=" full-page">
      <div className="row h-100 justify-content-center align-items-center bg-dark">
        <div className="col-md-4">
          <div className="card bg-light rounded p-4">
            <h1 className="text-center font-weight-bold mb-4">Login</h1>
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className="btn btn-primary btn-block"
              onClick={handleSignIn}
            >
              Login
            </button>
            {error && (
              <p className="text-danger mt-3 text-center">{error}</p>
            )}
            <Link to="/signup" className="text-center d-block mt-2">
              Don't have an account? Sign Up!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
