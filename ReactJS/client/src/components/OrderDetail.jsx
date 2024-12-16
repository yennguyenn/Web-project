import { format, parseISO } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { FaStar } from 'react-icons/fa'
import { FaAngleRight } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'

import { CartContext } from '../context/CartContext'
import { handleShowProductDetail, handleUserAddLargeItem } from '../services/cartService'
import { handleShowOrder, handleShowOrderItem } from '../services/orderService'
import { handleCreateReview } from '../services/reviewService'
import NotFound from './NotFound'

const OrderDetail = () => {
    const { orderid } = useParams()
    const [order, setOrder] = useState()
    const [orderItems, setOrderItems] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [shippingAddress, setShippingAddress] = useState('')
    const [deliveryMethod, setDeliveryMethod] = useState('')
    const [orderStatus, setOrderStatus] = useState('')
    const [orderStatusDate, setOrderStatusDate] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [total, setTotal] = useState('')
    const [note, setNote] = useState('')
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [currentProduct, setCurrentProduct] = useState(null)
    const [discount, setDiscount] = useState(0)

    const { updateCartQuantity } = useContext(CartContext)

    const buttonStyle = {
        width: '250px',
        textTransform: 'uppercase',
        letterSpacing: '0.2rem',
        lineHeight: '1.5',
        padding: '0.7rem 0.75rem',
        fontSize: '0.75rem',
        borderRadius: '0'
    }

    useEffect(() => {
        const fetchOrderItems = async () => {
            setLoading(false)
            try {
                const token = localStorage.getItem('token')
                const orderInfo = await handleShowOrder(token, orderid)
                setOrder(orderInfo.order)
                setShippingAddress(orderInfo.order.ShippingAddress)
                setDeliveryMethod(orderInfo.order.DeliveryMethod)
                setOrderStatus(orderInfo.order.Status)
                setOrderStatusDate(orderInfo.order.StatusDate)
                setPaymentMethod(orderInfo.order.PaymentMethod)
                setTotal(orderInfo.order.TotalPrice)
                setNote(orderInfo.order.Note)

                const orderDetail = await handleShowOrderItem(token, orderid)
                setOrderItems(orderDetail.orderItems)

                const detailsPromises = orderDetail.orderItems.map(async (item) => {
                    const product = await handleShowProductDetail(item.ProductID)
                    return {
                        ...product,
                        Quantity: item.Quantity,
                        Total: item.Quantity * item.Price
                    }
                })

                const detailedProducts = await Promise.all(detailsPromises)
                setProducts(detailedProducts)

                const total = detailedProducts.reduce((sum, product) => {
                    return sum + (product.Price * product.Quantity)
                }, 0)
                setTotalPrice(total)

                const discountPrice = (total * (orderInfo.discount / 100))
                setDiscount(discountPrice)

                calculateShippingFee(orderInfo.order.DeliveryMethod, total)
                
            } catch (error) {
                console.error('Error fetching order items:', error)
                setError('Failed to fetch order items')
                setLoading(false)
            }
        }
        fetchOrderItems()
    }, [orderid])

    const changeFormatDay = (dateString) => {
        const date = parseISO(dateString)
        const formattedDate = format(date, 'MMMM dd, yyyy')
        return formattedDate
    }

    const calculateShippingFee = (deliveryMethod, orderTotal) => {
        let fee = 0
        if (orderTotal >= 400000) {
            fee = 0
        } else {
            switch (deliveryMethod) {
                case 'Usp Next Day':
                    fee = 50000
                    break
                case 'Express Shipping':
                    fee = 35000
                    break
                case 'Standard Shipping':
                    fee = 15000
                    break
                case 'In Store Pickup':
                    fee = 0
                    break
                default:
                    fee = 0
            }
        }
        setShippingFee(fee)
    }

    const handleContShop = (event) => {
        event.preventDefault()
        window.location.href='/home'
    }

    const handleReview = (productid) => {
        setCurrentProduct(productid)
    }

    const handlePostReview = async () => {
        try {
            const token = localStorage.getItem('token')
            const result = await handleCreateReview(token, currentProduct, rating, comment)

            if (result.errCode === 0) {
                setRating(0)
                setComment('')
            } 
        } catch (error) {
            console.error('Error handling post review:', error)
        }
    }

    const handleRepurchase = async () => {
        try {
            const token = localStorage.getItem('token')
            const repurchasePromises = products.map((product) => {
                return handleUserAddLargeItem(token, product.ProductID, product.Quantity)
            })

            await Promise.all(repurchasePromises)

            localStorage.setItem('subTotal', totalPrice)
        
            window.location.href='/checkout'

            updateCartQuantity()
        } catch (error) {
            console.error('Error repurchasing items:', error)
            
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

    if (!order) {
        return <div>Order not found</div>
    }

    return (
        <div className='container'>
            {order && (
                <div className='hero-content pb-5 text-center'>
                    <h1 className='h1 hero-heading'>Order #{orderid}</h1>
                    <div className='row'>
                        <div className='col-xl-8 offset-xl-2'>
                            <p className='lead text-muted'>
                                Order #{orderid} was placed on <strong>{changeFormatDay(order.OrderDate)}</strong> and is currently <strong>{order.Status}</strong>
                            </p>
                            <p className='text-muted'>If you have any questions, please feel free to <a href='/coming-soon'>contact us</a>, our customer service center is working for you 24/7.</p>
                        </div>
                    </div>
                </div>
            )}            
            {orderItems.length > 0 && (
                <div className='row'>
                    <div className='col-lg-7 col-xl-8'>
                        <div className='cart'>
                            <div className='cart-wrapper'>
                                <div className='cart-header text-center'>
                                    <div className='row'>
                                        <div className='col-5'>Item</div>
                                        <div className='col-2'>Price</div>
                                        <div className='col-1'>Qty</div>
                                        <div className='col-2'>Total</div>
                                        <div className='col-2'></div>
                                    </div>
                                </div>
                                <div className='cart-body'>
                                    {products.map(product => (
                                        <div key={product.ProductID} className='cart-item'>
                                            <div className='row d-flex align-items-center text-center'>
                                                <div className='col-md-5 d-flex text-start'>
                                                    <Link className='col-3' to={`/product/detail/${product.ProductID}`}>
                                                        <img className='cart-image' src={`${process.env.PUBLIC_URL}${product.Image}`} alt={product.ProductName} />
                                                    </Link>
                                                    <div className='cart-title col-9 mt-2 ps-2'>
                                                        <Link className='text-uppercase' to={`/product/detail/${product.ProductID}`}>{product.ProductName}
                                                            <label role='button'>{product.Name}</label>
                                                        </Link>
                                                        <p className='text-muted text-sm text-truncate'>{product.Description}</p>
                                                    </div>
                                                </div>
                                                <div className='col-2'>{product.Price.toLocaleString('vi-VN')} đ</div>
                                                <div className='col-1'>{product.Quantity}</div>
                                                <div className='col-2'>{product.Total.toLocaleString('vi-VN')} đ</div>
                                                <div className='col-2'>
                                                    <button role='button' className='btn btn-outline-dark' style={{borderRadius: '0'}} data-bs-toggle='modal' data-bs-target='#exampleModal' onClick={() => handleReview(product.ProductID)} disabled={orderStatus !== 'Delivered'}>Review</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='col-12 text-end mt-5'>
                                        {orderStatus === 'Pending Comfirmation' ? (
                                            <button className='btn btn-dark justify-content-center' style={buttonStyle}>
                                                <span>Continue Checkout</span>
                                                <FaAngleRight className='align-middle ms-2' style={{marginBottom: '1.8px'}}/>
                                            </button>
                                        ) : (orderStatus === 'Delivered' || orderStatus === 'Canceled') ? (
                                            <button className='btn btn-dark justify-content-center' style={buttonStyle} onClick={handleRepurchase}>
                                                <span>Repurchase</span>
                                                <FaAngleRight className='align-middle ms-2' style={{marginBottom: '1.8px'}}/>
                                            </button>
                                        ) : (
                                            <button className='btn btn-dark justify-content-center' style={buttonStyle} onClick={handleContShop}>
                                                
                                                <span>Continue Shopping</span>
                                                <FaAngleRight className='align-middle ms-2' style={{marginBottom: '1.8px'}}/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 mb-5'>
                        <div className='block'>
                            <div className='block-header'>
                                <h6 className='text-uppercase mb-0'>Order Summary</h6>
                            </div>
                            <div className='block-body bg-light pt-1'>
                                <ul className='order-summary mb-0 list-unstyled'>
                                    <li className='order-summary-item'>
                                        <span>Subtotal</span>
                                        <span>{totalPrice.toLocaleString('vi-VN')} đ</span>
                                    </li>
                                    <li className='order-summary-item'>
                                        <span>Shipping</span>
                                        <span>{shippingFee.toLocaleString('vi-VN')} đ</span>
                                    </li>
                                    <li className='order-summary-item'>
                                        <span>Discount</span>
                                        <span>{(discount !== 0 ? (- discount) : 0).toLocaleString('vi-VN')} đ</span>
                                    </li>
                                    <li className='order-summary-item border-0'>
                                        <strong className='order-summary-total'>Total</strong>
                                        <strong className='order-summary-total'>{(total).toLocaleString('vi-VN')} đ</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='block mt-5'>
                            <div className='block-header'>
                                <h6 className='text-uppercase mb-0'>Order Status</h6>
                            </div>
                            <div className='block-body bg-light pt-0'>
                                <p>{orderStatus} on {changeFormatDay(orderStatusDate)}</p>
                            </div>
                            <div className='block-header'>
                                <h6 className='text-uppercase mb-0'>Shipping Address</h6>
                            </div>
                            <div className='block-body bg-light pt-0'>
                                <p className='text-justify'>{shippingAddress}</p>
                            </div>
                            <div className='block-header'>
                                <h6 className='text-uppercase mb-0'>Delivery Method</h6>
                            </div>
                            <div className='block-body bg-light pt-0'>
                                <p>{deliveryMethod}</p>
                            </div>
                            <div className='block-header'>
                                <h6 className='text-uppercase mb-0'>Payment Method</h6>
                            </div>
                            <div className='block-body bg-light pt-0'>
                                <p>{paymentMethod}</p>
                            </div>
                            {note && (
                                <>
                                    <div className='block-header'>
                                        <h6 className='text-uppercase mb-0'>Note</h6>
                                    </div>
                                    <div className='block-body bg-light pt-0'>
                                        <p>{note}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered modal-lg'>
                    <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLabel'>Let's rate product</h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <form className='p-3'>
                            <div className='row'>
                                <div className='col-12 text-center mb-4'>
                                    <div className='d-flex justify-content-center'>
                                        {[...Array(5)].map((star, index) => {
                                            const ratingValue = index + 1
                                            return (
                                                <label key={index}>
                                                    <input
                                                        type='radio'
                                                        id='rating'
                                                        name='rating'
                                                        value={ratingValue}
                                                        onClick={() => setRating(ratingValue)}
                                                        style={{ display: 'none'}}
                                                    />
                                                    <FaStar
                                                        className='star mx-2'
                                                        color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                                                        size={50}
                                                    required />
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='col-12 mt-2 mb-3 px-5'>
                                    <div className='form-group reviewText'>
                                        <label className='visually-hidden' htmlFor='reviewText'>Review:</label>
                                        <textarea className='form-control form-control-sm border' id='reviewText' rows='5' placeholder='Reviews should be more than 50 characters...' value={comment} style={{resize: 'none'}} onChange={(e) => setComment(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                        <button type='button' className='btn btn-dark' data-bs-dismiss='modal' onClick={handlePostReview}>Post Review</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
