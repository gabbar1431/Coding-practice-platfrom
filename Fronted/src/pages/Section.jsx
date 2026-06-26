import React from 'react'
import Appp from './Appp'
import Stats from './Stats'
import FeaturesCard from './FeaturesCard'
import Footer from './Footer'
import Popular from './Popular'

function Section() {
  return (
    <div className='bg-white overflow-hidden'>
    <Appp/>
    <Stats />
    <FeaturesCard />
    <Popular />
    <Footer />

    </div>
  )
}

export default Section
