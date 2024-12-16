import React from 'react'
import { PiHandCoinsFill } from 'react-icons/pi'
import { FaTruckFast, FaHeadset } from 'react-icons/fa6'
import './FooterCart.scss'

const FooterCart = () => {
    return(
        <div className='bg-gray-100 text-dark-700 py-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-4 service-column'>
                        <FaTruckFast className='svg-icon service-icon'/>
                        <div className='service-text'>
                            <h6 className='text-uppercase'>Free shipping & return</h6>
                            <p className='text-muted fw-light text-sm mb-0'>Free Shipping Over 400.000 đ</p>
                        </div>
                    </div>
                    <div className='col-lg-4 service-column'>
                        <PiHandCoinsFill className='svg-icon service-icon' />
                        <div className='service-text'>
                            <h6 className='text-uppercase'>Money back guarantee</h6>
                            <p className='text-muted fw-light text-sm mb-0'>30 Days Money Back Guarantee</p>
                        </div>
                    </div>
                    <div className='col-lg-4 service-column'>
                        <FaHeadset className='svg-icon service-icon'/>
                        <div className='service-text'>
                            <h6 className='text-uppercase'>0666-666-666</h6>
                            <p className='text-muted fw-light text-sm mb-0'>24/7 Available Support</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterCart