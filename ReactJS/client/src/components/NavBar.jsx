import { faBell, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSearch } from '../context/SearchContext'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import Search from './Search'

import './NavBar.scss'

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const { cartQuantity } = useContext(CartContext)
  const { updateKeyword } = useSearch()
  const { category, subcategory } = useParams()
  
  console.log(category, subcategory)
  console.log(isAuthenticated.user, isAuthenticated.token)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSearch = (keyword) => {
    updateKeyword(keyword)
    navigate('/product/search');
  }

  return (
    <nav className='navbar navbar-expand-lg sticky-top w-100 menu bg-white'>
      <div className='container-fluid'>
        <div className='navbar-brand ml-30 mr-0 w-400'>
          <Link to='/' className='text-brown'>
          <img src={`${process.env.PUBLIC_URL}/images/photos/logo.png`} alt='logo' className='logo' />
          </Link>
        </div>
        <div className='collapse navbar-collapse mx-0' id='navbarSupportedContent'>
          <ul className='navbar-nav mb-2 mb-lg-0 text-center mx-auto d-flex justify-content-center'>
            <li className='nav-item'>
              <div className='text-black mx-3'>
                <Link to='/' className='text-brown'>HOME</Link>
              </div>
            </li>
            <li className='nav-item'>
              <div className='text-black mx-3'>
                <Link to='/product/wool' className='text-brown'>WOOL</Link>
              </div>
            </li>
            <li className='nav-item dropdown mx-3 d-flex align-item-center'>
              <div className='text-black px-1'>
                <Link to='/product/product' className='text-brown'>PRODUCT</Link>
              </div>
              <div className='dropdown-toggle' role='button' data-bs-toggle='dropdown' aria-expanded='false'></div>
              <ul className='dropdown-menu'>
                <li className='dropdown-item'><Link to='/product/product/animal' className='text-brown'>Animal</Link></li>
                <li className='dropdown-item'><Link to='/product/product/plant' className='text-brown'>Plant</Link></li>
                <li className='dropdown-item'><Link to='/product/product/food' className='text-brown'>Food</Link></li>
                <li className='dropdown-item'><Link to='/product/product/cloth' className='text-brown'>Cloth</Link></li>
                <li className='dropdown-item'><Link to='/product/product/accessory' className='text-brown'>Accessory</Link></li>
                <li className='dropdown-item'><Link to='/product/product/mochi' className='text-brown'>Mochi</Link></li>
                <li className='dropdown-item'><Link to='/product/product/other' className='text-brown'>Other</Link></li>
              </ul>
            </li>
            <li className='nav-item'>
              <div className='text-black mx-3'>
                <Link to='/product/material' className='text-brown'>MATERIAL</Link>
              </div>
            </li>
            <li className='nav-item'>
              <div className='text-black mx-3'>
                <Link to='/product/tool' className='text-brown'>TOOL</Link>
                </div>
            </li>
          </ul>
          <div className='w-400'>
            {isAuthenticated.token ? (
              <>
                <div className='d-flex float-end mx-4'>
                  <div className='' role='button' aria-expanded='false'>
                    <Search onSearch={handleSearch}/>
                  </div>
                  <div className='nav-icon d-flex'>
                    <div className='cart-count'>
                      <FontAwesomeIcon icon={faBell} className='mx-2 icon-nav'/>
                      <span className='badge d-flex align-items-center justify-content-center'>
                        <span>6</span>
                      </span>
                    </div>
                  </div>
                  <div className='nav-icon d-flex'>
                    <Link to='/cart' className='cart-count'> 
                      <FontAwesomeIcon icon={faShoppingCart} className='text-brown mx-2 icon-nav' />
                      <span className='badge d-flex align-items-center justify-content-center'>
                        <span>{cartQuantity}</span>
                      </span>
                    </Link>
                  </div>
                  <div className='nav-icon dropdown'>
                    <div className='text-black' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                      <FontAwesomeIcon icon={faUser} className='text-brown mx-2 icon-nav' />
                    </div>
                    <ul className=' dropdown-menu dropdown-menu-end'>
                        <li><Link to={`/profile/${isAuthenticated.user.Username}`} className='text-brown dropdown-item text-dark'>Your Profile</Link></li>
                        <li><Link to='/comming-soon' className='text-brown dropdown-item' style={{cursor: 'no-drop'}}>Help & Support</Link></li>
                        <li><hr className='dropdown-divider'/></li>
                        <li className='dropdown-item' style={{cursor: 'pointer'}} onClick={handleLogout}>Sign out</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='d-flex float-end mx-2'>
                  <div className='' role='button' aria-expanded='false'>
                    <Search onSearch={handleSearch}/>
                  </div>
                  <div className='nav-button mx-1'>
                    <button className='btn rounded-pill border border-dark'><Link to='/login' className='text-brown'>Sign In</Link></button>
                  </div>
                  <div className='nav-button mx-1'>
                    <button className='btn rounded-pill border border-dark'><Link to='/register' className='text-brown'><b>Sign Up</b></Link></button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar