import React, { useState } from 'react';
import { auth } from '../firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Correctly initialize the useNavigate hook.

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      setError(null); // Clear any previous errors
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Successfully signed in");
      navigate("/"); // Use the navigate function to redirect upon successful login
    } catch (error) {
      setError(error.message); // Set the error message
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="w-[400px] h-[300px] bg-[#F1EFEF] rounded-lg p-5 montserrat">
        <h1 className="text-center font-bold text-3xl text-[#191717]">Login</h1>
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
        <button className="h-12 w-full mt-5 bg-[#1e1d1d] transition-all ease-in-out duration-300 hover:bg-[#000000] text-white rounded-md" onClick={handleSignIn}>
          Login
        </button>
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        <Link to="/signup"> {/* Use the Link component for navigation */}
          <h1 className="text-sm font-light text-[#191717] my-2 text-center cursor-pointer">
            Don't have an account? Sign Up!
          </h1>
        </Link>
      </div>
    </div>
  );
};
export default SignIn;
