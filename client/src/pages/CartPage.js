import React from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../components/NavBar'
import CartItem from '../components/CartItem'
import Footer from '../components/Footer'
import FooterCart from '../components/FooterCart'

import './CartPage.scss'

const CartPage = () => {
    return(
        <div>
            <NavBar/>
            <div className='container'>
                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb justify-content-start no-border my-4'>
                        <li className='breadcrumb-item'><Link className='breadcrumb-link' to='/home'>Home</Link></li>
                        <li className='breadcrumb-item active' aria-current='page'>Cart</li>
                    </ol>
                </nav>
                <div className='hero-content pb-4 text-center'>
                    <h1 className='hero-heading'>Shopping Cart</h1>
                </div> 
            </div>
            <CartItem/>
            <FooterCart/>
            <Footer/>
        </div>
    )
}

export default CartPage