import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import AiTools from '../components/AiTools.jsx'
import Testimonial from '../components/Testimonial.jsx'
import Plan from '../components/Plan.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <div>
      {/* We are using clerk for user login and authentication */}
      <Navbar />
      <Hero />
      <AiTools />
      {/* for testmony we are using 'prebuiltui' */}
      <Testimonial />
      {/* Clerk for pricing section */}
      <Plan />
      <Footer />

    </div>
  )
}

export default Home
