import React from 'react'

import ContactInfo from '../components/homeComponents/ContactInfo'
import Footer from '../components/Footer'
import Mainheader from '../components/Mainheader'
import TrendingProducts from '../components/Trending/TrendingProducts'


const Home = () => {
  return (
    <div>
        <Mainheader />
        <TrendingProducts/>
        <ContactInfo />
        <Footer />
    </div>
  )
}

export default Home