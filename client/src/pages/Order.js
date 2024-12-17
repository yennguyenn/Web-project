import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { handleShowAllOrders } from '../services/orderService'

import './Order.scss'
import NotFound from '../components/NotFound'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filterStatus, setFilterStatus] = useState('All')

    useEffect(() => {
        const fetchCartData = async () => {
            setLoading(false)
            try {
                const token = localStorage.getItem('token')
                const response = await handleShowAllOrders(token)

                setOrders(response.orders)
                
            } catch (error) {
                console.error('Error fetching orders data:', error)
                setError(error)
            }
        }
        fetchCartData()
    }, [])

    const getBadgeClass = (status) => {
        switch (status) {
            case 'Pending Confirmation':
                return 'badge-pending-confirm'
            case 'Pending Pickup':
                return 'badge-pending-pickup'
            case 'Pending Delivery':
                return 'badge-pending-delivery'
            case 'Delivered':
                return 'badge-delivered'
            case 'Canceled':
                return 'badge-canceled'
            default:
                return 'badge-other'
        }
    }

    const handleStatusFilterChange = (status) => {
        setFilterStatus(status);
    }

    const filteredOrders = filterStatus === 'All' ? orders : orders.filter(order => order.Status === filterStatus)

    if (loading) {
        return (
            <div>
                <NavBar/>
                <div className='container'>
                    <nav aria-label='breadcrumb'>
                        <ol className='breadcrumb justify-content-start no-border my-4'>
                            <li className='breadcrumb-item'><Link className='breadcrumb-link' to='/home'>Home</Link></li>
                            <li className='breadcrumb-item active' aria-current='page'>Account</li>
                        </ol>
                    </nav>
                </div>
                <div className='hero-content pb-4 text-center'>
                    <h1 className='hero-heading'>Your Account</h1>
                </div> 
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-4 mb-5'>
                            <SideBar/>
                        </div>
                        <div className='col-lg-8 col-xl-9 d-flex align-items-center justify-content-center'>
                            <Spinner animation='border' role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </Spinner>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <NavBar/>
                <div className='container'>
                    <nav aria-label='breadcrumb'>
                        <ol className='breadcrumb justify-content-start no-border my-4'>
                            <li className='breadcrumb-item'><Link className='breadcrumb-link' to='/home'>Home</Link></li>
                            <li className='breadcrumb-item active' aria-current='page'>Account</li>
                        </ol>
                    </nav>
                </div>
                <div className='hero-content pb-4 text-center'>
                    <h1 className='hero-heading'>Your Account</h1>
                </div> 
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-4 mb-5'>
                            <SideBar/>
                        </div>
                        <div className='col-lg-8 col-xl-9 d-flex align-items-center justify-content-center'>
                           <NotFound/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    return (
        <div>
            <NavBar/>
            <div className='container'>
                    <nav aria-label='breadcrumb'>
                        <ol className='breadcrumb justify-content-start no-border my-4'>
                            <li className='breadcrumb-item'><Link className='breadcrumb-link' to='/home'>Home</Link></li>
                            <li className='breadcrumb-item active' aria-current='page'>Account</li>
                        </ol>
                    </nav>
                </div>
                <div className='hero-content pb-4 text-center'>
                    <h1 className='hero-heading'>Your Orders</h1>
                </div> 
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-4 mb-5'>
                            <SideBar/>
                        </div>
                        <div className='col-lg-8 col-xl-9 order-body'>
                            <div className='cart-header mb-4'>
                                <div className='row'>
                                    <div className='col'>Orders History</div>
                                    <div className='col-auto'>
                                        <select
                                            className='form-select form-select-sm select-form'
                                            aria-label='Filter orders by status'
                                            value={filterStatus}
                                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                                        >   
                                            <option value='All'>All</option>
                                            <option value='Delivered'>Delivered</option>
                                            <option value='Pending Pickup'>Pending Pickup</option>
                                            <option value='Pending Delivery'>Pending Delivery</option>
                                            <option value='Canceled'>Canceled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {filteredOrders.length === 0 ? (
                                <div className='col-lg my-5'>
                                    <div className='text-center' style={{ fontSize: '25px' }}>
                                        <p>No purchase history!</p>
                                    </div>
                                </div>
                            ) : (
                                <table className='table table-hover'>
                                    <thead>
                                        <tr className='table-head'>
                                            <th scope='col' className='py-4 text-uppercase text-sm'>Order #</th>
                                            <th scope='col' className='py-4 text-uppercase text-sm'>Date Order</th>
                                            <th scope='col' className='py-4 text-uppercase text-sm'>Total</th>
                                            <th scope='col' className='py-4 text-uppercase text-sm'>Status</th>
                                            <th scope='col' className='py-4 text-uppercase text-sm'>Action</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length === 0 ? (
                                            <div className='col-lg my-5'>
                                                <div className='text-center' style={{ fontSize: '25px' }}>
                                                    <p>No purchase history!</p>
                                                </div>
                                            </div>
                                        ) : (
                                            filteredOrders.map(order => (
                                                <tr key={order.OrderID}>
                                                    <td className='py-4 align-middle order-bold'>
                                                        <div className='text-center'># {order.OrderID}</div>
                                                    </td>
                                                    <td className='py-4 align-middle'>
                                                        <div className='text-center'>{order.OrderDate}</div>
                                                    </td>
                                                    <td className='py-4 align-middle'>{order.TotalPrice.toLocaleString('vi-VN')} đ</td>
                                                    <td className='py-4 align-middle'>
                                                        <span className={`badge p-2 text-uppercase ${getBadgeClass(order.Status)}`}>{order.Status}</span>
                                                    </td>
                                                    <td className='py-4 align-middle'>
                                                        <Link to={`/order/detail/${order.OrderID}`} className='btn btn-outline-dark btn-sm px-3'>View</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Order
