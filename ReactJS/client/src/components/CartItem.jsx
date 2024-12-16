import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { BsDash, BsPlus } from 'react-icons/bs'
import { FaAngleRight } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'

import { CartContext } from '../context/CartContext'
import {
    handleShowProductDetail,
    handleUserDecreaseItem,
    handleUserIncreaseItem,
    handleUserRemoveAllProduct,
    handleUserRemoveFromCart,
    handleUserShowCart
} from '../services/cartService'

import { handleApplyCoupon } from '../services/orderService'
import './CartItem.scss'
import NotFound from './NotFound'

const Cart = () => {
    const [cartData, setCartData] = useState({
        errCode: 0,
        errMessage: '',
        cart: [],
        numberProduct: 0
    })

    const navigate = useNavigate()

    const [productDetails, setProductDetails] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [code, setCode] = useState('')
    const [cartEmpty, setCartEmpty] = useState(true)

    const [showModal, setShowModal] = useState(false)
    const [showCoupon, setShowCoupon] = useState(false)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { updateCartQuantity } = useContext(CartContext)


    const updateCartData = async (token) => {
        try {
            const response = await handleUserShowCart(token)
            setCartData(response)
        
            const detailsPromises = response.cart.map(async (item) => {
                const product = await handleShowProductDetail(item.ProductID)
                return product
            })
        
            const productDetails = await Promise.all(detailsPromises)
            setProductDetails(productDetails)
        
            const orderSubtotal = response.cart.reduce((sum, item, index) => {
                const price = productDetails[index]?.Price || 0
                return sum + item.Quantity * price
            }, 0)
            setSubtotal(orderSubtotal)
            localStorage.setItem('subTotal', orderSubtotal)
        } catch (error) {
            console.error('Error updating cart data:', error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem('token')
                await updateCartData(token)
            } catch (error) {
                console.error('Error fetching cart data:', error)
            }
        }
        fetchCartData()
    }, [])

    useEffect(() => {
        if (cartData.errCode === 0 && cartData.cart.length > 0) {
            setCartEmpty(false)
        } else {
            setCartEmpty(true)
        }
    }, [cartData])

    const handleIncreaseItem = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const productIdToIncrease = event.currentTarget.dataset.productid

            await handleUserIncreaseItem(token, productIdToIncrease)
            console.log(productIdToIncrease)

            await updateCartData(token)
            updateCartQuantity()
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const handleRemoveItem = async (event) => {
        try {
            const token = localStorage.getItem('token')
            const productIdToRemove = event.currentTarget.dataset.productid

            await handleUserRemoveFromCart(token, productIdToRemove)
            
            await updateCartData(token)
            updateCartQuantity()
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const handleDecreaseItem = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const productIdToDecrease = event.currentTarget.dataset.productid

            await handleUserDecreaseItem(token, productIdToDecrease)
            console.log(productIdToDecrease)

            await updateCartData(token)
            updateCartQuantity()
        } catch (error) {
            console.error('Error decreasing product quantity:', error)
        }
    }

    const handleRemoveAllProduct = async () => {
        try {
            const token = localStorage.getItem('token')
            await handleUserRemoveAllProduct(token)
            setShowModal(false)
            window.location.reload()
            updateCartQuantity()
        } catch (error) {
            console.error('Error remove all product:', error)
        }
    }

    const toggleCoupon = () => {
        setShowCoupon(!showCoupon)
    }

    const redirectToHome = () => {
        navigate('/home')
    }

    const handleCheckout = async () => {
        try {
            navigate('/checkout')
        } catch (error) {
            console.error('Error during checkout:', error)
        }
    }

    const applyCoupon = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await handleApplyCoupon(token, code)
            
            if (response.errCode === 0) {
                setShowCoupon(false)
                setDiscountPrice(subtotal * (response.coupon.Discount / 100))
            } else {
                alert(response.errMessage)
            }

        } catch (error) {
            console.error('Error during apply coupon:', error)
        }
    }

    if (loading) {
        return (
            <div className='container d-flex align-items-center justify-content-center'>
                <Spinner animation='border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            </div>
        )
    }

    if (error) {
        return <div><NotFound/></div>
    }

    return (
        <div>
            <div className='container cart-content'>
                <div className='mb-5 row'>
                    <div className='col-lg-8'>
                        <div className='cart'>
                            <div className='cart-header text-center'>
                                <div className='row'>
                                    <div className='col-md-5'>Item</div>
                                    <div className='d-none d-md-block col'>
                                        <div className='row'>
                                            <div className='col-md-3'>Price</div>
                                            <div className='col-md-4'>Quantity</div>
                                            <div className='col-md-3'>Total</div>
                                            <div className='col-md-2'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {cartData.errCode !== 0 ? (
                                <div className='col-lg my-5'>
                                    <div className='text-center' style={{fontSize: '25px'}}>
                                        <p>Your cart is empty!</p>
                                    </div>
                                    <div className='text-end justify-content-center position-relative me-1 shopnow'>
                                        <label className='shop-now mx-1' role='button' onClick={redirectToHome}>Shop now</label>
                                        <svg className='arrow-shop' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="15" height="15"><path d="M4.7 10c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1L6.9 6 4.2 3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.3 3.2c.3.3.3.8 0 1.1L5.3 9.7c-.2.2-.4.3-.6.3Z"></path></svg>
                                    </div>
                                    
                                </div>
                            ) : (
                                <>
                                    {cartData.cart.length > 0 ? (
                                        <div className='cart-body'>
                                            {cartData.cart.map((item, index) => (
                                                <div className='cart-item' key={item.CartID}>
                                                    <div className='d-flex align-items-center justify-content-center row'>
                                                        <div className='col-md-5'>
                                                            <div className='d-flex'>
                                                                <Link to={`/product/detail/${item.ProductID}`}>
                                                                    {productDetails[index] && (
                                                                        <img className='cart-image' src={`${process.env.PUBLIC_URL}${productDetails[index].Image}`} alt={productDetails[index].ProductName} />
                                                                    )}
                                                                </Link>
                                                                <div className='cart-title text-start align-items-start mt-2'>
                                                                    <Link className='text-uppercase' to={`/product/detail/${item.ProductID}`}>
                                                                        <label>{productDetails[index] ? productDetails[index].Name : 'Loading...'}</label>
                                                                    </Link>
                                                                    <div className='text-muted text-sm'>...</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mt-4 mt-md-0 col-md-7'>
                                                            <div className='align-items-center row'>
                                                                <div className='col-md-3'>
                                                                    <div className='row'>
                                                                        <div className='text-center text-md-centert col-md-12 col-6'>
                                                                        {productDetails[index] ? productDetails[index].Price.toLocaleString('vi-VN') : 'Loading...'} đ
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-4'>
                                                                    <div className='align-items-center row'>
                                                                        <div className='col-md-12 col-sm-3'>
                                                                            <div className='d-flex align-items-center justify-content-center'>
                                                                                <div className='btn btn-items btn-items-decrease'>
                                                                                    <BsDash className='icon-btn' size={20} onClick={handleDecreaseItem} data-productid={item.ProductID}/>
                                                                                </div>
                                                                                <input type='number' className='text-center input-items' value={item.Quantity} readOnly/>
                                                                                <div className='btn btn-items btn-items-increase'>
                                                                                    <BsPlus className='icon-btn' size={20} onClick={handleIncreaseItem} data-productid={item.ProductID}/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-3'>
                                                                    <div className='row'>
                                                                        <div className='text-end text-md-center col-md-12 col-6'>
                                                                            {productDetails[index] ? (item.Quantity * productDetails[index].Price).toLocaleString('vi-VN') : 'Loading...'} đ
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='d-none d-md-block text-center col-2'>
                                                                    <div className='cart-remove-container' role='button' data-productid={item.ProductID} onClick={handleRemoveItem}>
                                                                        <svg className='cart-remove' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12'><path d='M2.22 2.22a.749.749 0 0 1 1.06 0L6 4.939 8.72 2.22a.749.749 0 1 1 1.06 1.06L7.061 6 9.78 8.72a.749.749 0 1 1-1.06 1.06L6 7.061 3.28 9.78a.749.749 0 1 1-1.06-1.06L4.939 6 2.22 3.28a.749.749 0 0 1 0-1.06Z'></path></svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className='my-4 d-flex justify-content-between flex-column flex-lg-row'>
                                                        <a role='button' className='text-muted btn-n'>
                                                            <svg className='btn-arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"></path></svg>
                                                            <label role='button' className='btn-name mx-1' onClick={redirectToHome}>Continue Shopping</label>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='col-auto'>
                                                    <div className='my-4 d-flex justify-content-end flex-column flex-lg-row'>
                                                        <div className='remove-all' role='button' onClick={() => setShowModal(true)}>Remove All</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='block mb-5'>
                            <div className='block-header'>
                                <h6 className='text-uppercase mb-0'>Order Summary</h6>
                            </div>
                            <div className='block-body bg-light pt-1'>
                                <p className='text-sm'>Shipping cost calculated at checkout</p>
                                <ul className='order-summary mb-0 list-unstyled'>
                                    <li className='order-summary-item'>
                                        <span>Order subtotal</span>
                                        <span>{subtotal.toLocaleString('vi-VN')} đ</span>
                                    </li>
                                    <li className='order-summary-item'>
                                        <span>Shipping and handling</span>
                                        <span>0 đ</span>
                                    </li>
                                    <li className='order-summary-item position-relative'>
                                        <span>Discount</span>
                                        <span>{(discountPrice !== 0 ? (- discountPrice) : 0).toLocaleString('vi-VN')} đ</span>
                                        <span className='position-absolute discount' role='button' onClick={toggleCoupon}>Have a promotion?</span>
                                    </li>
                                    <li className='order-summary-item position-relative'>
                                        <span>Total</span>
                                        <strong className='order-summary-total'>{(subtotal - discountPrice).toLocaleString('vi-VN')} đ</strong>
                                    </li>
                                </ul>
                            </div>
                            <button type='button' className={`btn btn-dark mt-4 py-3 w-100 d-flex align-items-center justify-content-center checkout ${cartEmpty ? 'disabled' : ''}`} disabled={cartEmpty} onClick={cartEmpty ? null : handleCheckout}>
                                <a className='text-decoration-none text-white'>Proceed to checkout</a>
                                <FaAngleRight className='arrow'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Remove All Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove all product? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={handleRemoveAllProduct}>
                        Remove All
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCoupon} onHide={() => setShowCoupon(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Have a promotion?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className='form-control coupon-in' style={{borderRadius: '0'}} name='Code' placeholder='Enter your promotion...' value={code} onChange={(event) => setCode(event.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowCoupon(false)}>
                        Cancel
                    </Button>
                    <Button variant='dark' onClick={applyCoupon}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Cart
