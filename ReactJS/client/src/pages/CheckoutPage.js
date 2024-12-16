import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Checkout from '../components/Checkout'
import Footer from '../components/Footer'
import FooterCart from '../components/FooterCart'

const CheckoutPage = () => {
    return(
        <div>
            <NavBar/>
            <div className='container'>
                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb justify-content-start no-border my-4'>
                        <li className='breadcrumb-item'><Link className='breadcrumb-link' to='/home'>Home</Link></li>
                        <li className='breadcrumb-item'>Cart</li>
                        <li className='breadcrumb-item active' aria-current='page'>Checkout</li>
                    </ol>
                </nav>
                <div className='hero-content pb-4 text-center'>
                    <h1 className='hero-heading'>Check Out</h1>
                </div>
                <Checkout/>
            </div>
            <FooterCart/>
            <Footer/>
        </div>
    )
}

export default CheckoutPage