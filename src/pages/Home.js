import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="container landing-container">
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1>Welcome to SahaYaatra</h1>
          <p>A innovative way to Travel</p>
          <a href="#" className="btn btn-primary">Get Started</a>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Home