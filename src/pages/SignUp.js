import React, { useState } from 'react';
import { auth } from '../firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  const handleSignUp = async () => {
    try {
      setError(null); // Clear any previous errors

    

      // Create a new user with the provided email and password
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Successfully signed up');
      // You can redirect the user to the login page or perform other actions here
    } catch (error) {
      setError(error.message); // Set the error message
    }
  };

  return (
    <div className=" full-page">
      <div className="row h-100 justify-content-center align-items-center bg-dark">
        <div className="col-md-4">
          <div className="card bg-light rounded p-4">
          <Link to="/" >
                Back
            </Link>
            <h1 className="text-center font-weight-bold mb-4">
              Sign Up
            </h1>
           
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
            
            <button className="btn btn-primary btn-block" onClick={handleSignUp}>
              Sign Up
            </button>
            {error && (
              <p className="text-danger mt-3 text-center">{error}</p>
            )}
            <Link to="/signin" className="text-center d-block mt-2">
                Already have an account? Login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

