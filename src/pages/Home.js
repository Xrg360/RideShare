import React from "react"; // If using React Router for navigation

function Home() {
  return (
    <div className="bg-[#191717] min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4 text-[#F1EFEF]">
        Welcome to Sahayatri
      </h1>
      <p className="text-lg text-[#F1EFEF] mb-8">
        Your Reliable Ride Sharing Service
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Book Your Ride</h2>
        <label className="block text-gray-600 text-left mb-2">
          Enter Destination:
        </label>
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring focus:border-blue-300"
        />

        <label className="block text-gray-600 text-left mb-2">
          Select Car Type:
        </label>
        <select className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring focus:border-blue-300">
          <option value="economy">Economy</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </div>
    </div>
  );
}

export default Home;
