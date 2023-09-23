import React, { useState } from 'react';
import { auth } from '../firebaseconfig';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
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

  const handleSignUp = async () => {
    try {
      setError(null); // Clear any previous errors
      // Create a new user with the provided email and password
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Successfully signed up");
      // You can redirect the user to the login page or perform other actions here
    } catch (error) {
      setError(error.message); // Set the error message
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center montserrat bg-black">
      <div className="w-[400px] h-[300px] bg-[#F1EFEF] rounded-lg p-5">
        <h1 className="text-center font-bold text-3xl text-[#191717]">
          Sign Up
        </h1>
        <input
          type="email"
          placeholder="email"
          className="h-12 w-full mt-5 p-3 rounded-md"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="h-12 w-full mt-5 p-3 rounded-md"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="h-12 w-full mt-5 bg-[#1e1d1d] transition-all ease-in-out duration-300 hover:bg-[#000000] text-white rounded-md" onClick={handleSignUp}>
          Sign Up
        </button>
        <a to="/signin">
          <h1 className="text-sm font-light text-[#191717] my-2 text-center cursor-pointer">
            Already have an account? Login!
          </h1>
        </a>
      </div>
    </div>
  );
};

export default SignUp;
