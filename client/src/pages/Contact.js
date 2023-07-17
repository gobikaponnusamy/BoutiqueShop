import React from 'react';
// import Header from '../components/Header'
import ContactHeader from '../components/ContactHeader';
import Footer from '../components/Footer';
import ContactInfo from '../components/homeComponents/ContactInfo';
import Contactform from '../components/Contactform';
// import Mainheader from '../components/Mainheader'

const Contact = () => {
  return (
    <div>
        <ContactHeader />
        <Contactform />
        <ContactInfo />
        <Footer />
    </div>
  )
}

export default Contact