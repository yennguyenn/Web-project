import React from 'react'
import { FaPhoneAlt, FaFax, FaMapMarkerAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa'
import './Footer.scss'

const Footer = () => {
  return (
    <footer className='pt-5 bg-body-tertiary text-muted'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 mb-5 mb-lg-0'>
            <h6 className='heading-xxxs mb-4 mt-3'>About</h6>
            <p className='blockquote-footer pe-5' style={{textAlign: 'justify'}}>Welcome to Liceria, your destination for premium, exquisite jewelry that helps you shine every moment.</p>
            <ul className='list-unstyled'>
              <li><FaPhoneAlt className="me-2" /> <strong>Tel:</strong> +84 987 654 321</li>
              <li><FaFax className="me-2" /> <strong>Fax:</strong> +84 123 456 789</li>
              <li><FaMapMarkerAlt className="me-2" /> <strong>Address:</strong> Ward 6, Thu Duc City, Ho Chi Minh City</li>
              <li><FaEnvelope className="me-2" /> <strong>Email:</strong> <a href="mailto:contact@liceria.com" className="text-reset">contact@liceria.com</a></li>
            </ul>
          </div>
          <div className='col-lg-2 col-md-6 mb-5 mb-lg-0'>
            <h6 className='heading-xxs mb-3'>Support</h6>
            <ul className='list-unstyled mb-5 mb-sm-0'>
              <li className='text-gray'>
                <a className='text-reset'>Contact Us</a>
              </li>
              <li className='text-gray'>
                <a className='text-reset'>FAQs</a>
              </li>
              <li className='text-gray'>
                <a className='text-reset'>Shipping & Returns</a>
              </li>
            </ul>
          </div>
          <div className='col-lg-2 col-md-6 mb-5 mb-lg-0'>
            <h6 className='heading-xxs mb-3'>Privacy & Policy</h6>
            <ul className='list-unstyled mb-r mb-sm-0'>
              <li className='text-gray'>
                <a className='text-reset'>Pricing Policy</a>
              </li>
              <li className='text-gray'>
                <a className='text-reset'>Shipping Policy</a>
              </li>
              <li className='text-gray'>
                <a className='text-reset'>Order Policy</a>
              </li>
              <li className='text-gray'>
                <a className='text-reset'>Help</a>
              </li>
            </ul>
          </div>
          <div className='col-lg-4'>
            <h6 className='heading-xxs mb-3'>Daily Offers & Discounts</h6>
            <small className='mb-3'>Discover amazing deals and discounts every day! Stay tuned for exclusive offers and savings on your favorite products.</small>
            <form>
              <div className='input-group mt-3'>
                <input className='form-control bg-transparent border-secondary border-end-0 input' type='email' placeholder='Your Email Address' aria-label='Your Email Address' style={{borderRadius: '0'}}/>
                <div className='input-group-append'>
                  <button className='btn btn-outline-secondary border-start-0 button' style={{borderRadius: '0'}} type='submit'>
                    <FaPaperPlane className='text-lg text-dark'/>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='text-center mt-5 border-top'>
        <div className='container'>
          <div className='row py-3'>
            <p className='mb-3 mb-md-0 fs-xxs text-muted'>© 2023 Copyright: <span className='fw-bold'>Liceria Jewelry</span></p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
