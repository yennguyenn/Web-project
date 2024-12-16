import React from 'react'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import OrderComplete from '../components/OrderComplete'

const OrderCompletePage = () => {

    return (
      <div>
          <NavBar/>
          <OrderComplete/>
          <Footer/>
      </div>
    )
}

export default OrderCompletePage
