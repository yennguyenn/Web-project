import React, { useState, useContext } from 'react'

import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Spinner from 'react-bootstrap/Spinner';

import { AuthContext } from '../context/AuthContext'

import './Notification.scss'

const Notifications = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const { isAuthenticated } = useContext(AuthContext)

    const [notifications, setNotifications] = useState({
        exclusiveOffers: false,
        orderUpdates: true,
        productRecommendations: true,
        restockNotifications: false,
        eventReminders: false,
        accountSecurityAlerts: true,
        customerSupportUpdates: false,
    })

    const [selectAll, setSelectAll] = useState(false)

    const handleToggle = (name) => {
        setNotifications({ ...notifications, [name]: !notifications[name] })
    }

    const handleSelectAllToggle = () => {
        const newSelectAllState = !selectAll
        setSelectAll(newSelectAllState)
        const updatedNotifications = {}
        for (const key in notifications) {
          updatedNotifications[key] = newSelectAllState
        }
        setNotifications(updatedNotifications)
    }

    return (
      <div>
          <NavBar/>
          <div className='container'>
              <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb justify-content-start no-border my-4'>
                      <li className='breadcrumb-item'><Link className='breadcrumb-link' to='/home'>Home</Link></li>
                      <li className='breadcrumb-item'><Link className='breadcrumb-link'>Account</Link></li>
                      <li className='breadcrumb-item active' aria-current='page'>Notification</li>
                  </ol>
              </nav>
          </div>
          <div className='hero-content pb-4 text-center'>
              <h1 className='hero-heading'>Notification</h1>
          </div> 
          <div className='container'>
              <div className='row'>
                  <div className='col-xl-3 col-lg-4 mb-5'>
                      <SideBar/>
                  </div>
                  <div className='col-lg-8 col-xl-9 align-middle'>
                      <div className='cart-header flex-nowrap align-items-center justify-content-between'>
                          <div className='row'>
                              <div className='col'>Notification Settings</div>
                              <div className='col-auto form-check form-switch noti'>
                                  <label className='form-check-label animate-target text-capitalize' htmlFor='unselectAll'>Select all</label>
                                  <input
                                      className='form-check-input align-middle me-2'
                                      id='unselectAll'
                                      type='checkbox'
                                      checked={selectAll}
                                      onChange={handleSelectAllToggle}
                                  />
                              </div>
                          </div>
                      </div>
                      <div className='cart-body mt-4'>
                          {Object.keys(notifications).map((key) => (
                              <div key={key} className='mb-4 form-check form-switch noti'>
                                  <input
                                      className='form-check-input me-2'
                                      id={key}
                                      type='checkbox'
                                      checked={notifications[key]}
                                      onChange={() => handleToggle(key)}
                                  />
                                  <label className='form-check-label' htmlFor={key}>
                                      <span className='d-block h6 mb-2'>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                      <span className='fs-sm'>{getNotificationDescription(key)}</span>
                                  </label>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
          <Footer/>
      </div>
    )
}

const getNotificationDescription = (key) => {
    const descriptions = {
        exclusiveOffers: 'Receive alerts about exclusive discounts, promotions, and special offers tailored just for you.',
        orderUpdates: 'Stay informed about the status of your orders, including confirmations, shipping updates, and delivery notifications.',
        productRecommendations: 'Get personalized recommendations based on your browsing and purchase history to discover new products you\'ll love.',
        restockNotifications: 'Be the first to know when out-of-stock items are back in inventory, ensuring you never miss out on your favorite products.',
        eventReminders: 'Receive reminders about upcoming sales events, flash sales, or product launches to make sure you\'re always in the loop.',
        accountSecurityAlerts: 'Receive notifications about any suspicious account activity or changes to your login credentials for enhanced security.',
        customerSupportUpdates: 'Get updates on any inquiries or support tickets you\'ve submitted, ensuring timely resolution of any issues.',
    }
    return descriptions[key] || ''
}

export default Notifications
