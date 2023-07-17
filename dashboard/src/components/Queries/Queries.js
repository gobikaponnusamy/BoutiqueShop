import React from 'react'
import Sidebar from '../sidebar'
import Header from '../Header'
import Querie from '../products/Queries'

const Queries = () => {
  return (
    <div>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Querie />
      </main>
    </div>
  )
}

export default Queries