import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ComingSoonPage from './pages/ComingSoon'
import Favorite from './pages/Favorite'
import HomePage from './pages/HomePage'
import Notification from './pages/Notification'
import Order from './pages/Order'
import OrderCompletePage from './pages/OrderComplete'
import OrderInfo from './pages/OrderInfo'
import ProductInfo from './pages/ProductInfo'
import ProductPage from './pages/ProductPage'
import Profile from './pages/Profile'
import ProductList from './pages/ProductList'
import Admin from './pages/admin/Admin'

import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext'
import PrivateRoute from './route/PrivateRoute'

import './App.css'
import ProductAdmin from './pages/admin/ProductAdmin'
import NotFoundPage from './pages/NotFound'


function App() {
    return (
        <div className='outfit text-brown bg-img'>
            <AuthProvider>
                <SearchProvider>
                    <CartProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path='/' exact element={<HomePage />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/reset-password' element={<ForgotPassword />} />
                                <Route path='/register' element={<Register />} />
                                <Route path='/product/:category' element={<ProductPage />} />
                                <Route path='/product/product/:subcategory' element={<ProductPage />} />
                                <Route path='/product/detail/:productid' element={<ProductInfo />} />                            
                                <Route path='/home' element={<PrivateRoute><HomePage /></PrivateRoute>} />
                                <Route path='/order' element={<PrivateRoute><Order/></PrivateRoute>} />
                                <Route path='/favorite' element={<PrivateRoute><Favorite/></PrivateRoute>} />
                                <Route path='/cart' element={<PrivateRoute><CartPage/></PrivateRoute>} />
                                <Route path='/profile/:username'element={<PrivateRoute><Profile/></PrivateRoute>} />
                                <Route path='/notification' element={<PrivateRoute><Notification/></PrivateRoute>} />
                                <Route path='/checkout' element={<PrivateRoute><CheckoutPage/></PrivateRoute>}/>
                                <Route path='/order-complete' element={<PrivateRoute><OrderCompletePage/></PrivateRoute>}/>
                                <Route path='/order/detail/:orderid' element={<PrivateRoute><OrderInfo/></PrivateRoute>}/>
                                <Route path='/coming-soon' element={<ComingSoonPage />} />
                                <Route path='/product/search' element={<ProductList />} />
                                <Route path='/admin' element={<PrivateRoute><Admin/></PrivateRoute>}/>
                                <Route path='/admin/products' element={<PrivateRoute><ProductAdmin/></PrivateRoute>}/>
                                <Route path='/notfound' element={<NotFoundPage />} />
                            </Routes>
                        </BrowserRouter>
                    </CartProvider>
                </SearchProvider>
            </AuthProvider>
        </div>
    )
}

export default App
