import React from 'react'
import { LuMapPin } from 'react-icons/lu'
import { FaFacebookSquare, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'

import '../App.css'

const ComingSoonPage = () => {
    return (
        <div className='mh-full-screen d-flex align-items-center dark-overlay'>
            <img src={`${process.env.PUBLIC_URL}/Background.png`} className='bg-image' style={{maxWidth: '1520px'}}/>
            <div className='container text-white text-center text-lg overlay-content py-6 py-lg-0'>
                <h1 className='mx-auto mb-5'>
                    <span className='sr-only'>Coming soon</span>
                    <img className='img-fluid' src='https://d19m59y37dris4.cloudfront.net/sell/2-0-1/img/coming-soon.png'/>
                </h1>
                <h3 className='mb-5 fw-normal'>Our website is under construction. Stay tuned for updates.</h3>
                <p className='mb-4'>
                    <LuMapPin className='me-2'/>20/4F 319 HHN St. D.9 HCM city
                </p>
                <ul className='list-inline'>
                    <li className='list-inline-item me-3'>
                        <a href='https://www.facebook.com/trafmy.wu/' className='text-white' target='_blank' title='facebook'><FaFacebookSquare/></a>
                    </li>
                    <li className='list-inline-item me-3'>
                        <a href='https://www.instagram.com/lerry.lazzy_handmade/' className='text-white' target='_blank' title='instagram'><FaInstagram/></a>
                    </li>
                    <li className='list-inline-item me-3'>
                        <a href='' className='text-white' target='_blank' title='tiktok'><FaTiktok/></a>
                    </li>
                    <li className='list-inline-item me-3'>
                        <a href='' className='text-white' target='_blank' title='X'><FaTwitter/></a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ComingSoonPage
