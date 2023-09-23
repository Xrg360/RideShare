import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="container landing-container">
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1>Welcome to Our Landing Page</h1>
          <p>This is a Bootstrap-based landing page with centered text.</p>
          <a href="#" className="btn btn-primary">Get Started</a>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Home