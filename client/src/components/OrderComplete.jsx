import React, { useEffect, useState } from 'react'

const OrderComplete = () => {
    const [orderId, setOrderId] = useState('')

    useEffect(() => {
        setOrderId(localStorage.getItem('OrderID'))
    }, [])

    const handleViewOrder = () => {
        window.location.href=`/order/detail/${orderId}`
        localStorage.removeItem('OrderID')
    }

    return (
        <div className='container py-5 my-5'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-10 col-lg-8 col-xl-6 text-center'>
                    <div className='mb-5 fs-1'>❤️</div>
                    <h2 className='mb-5'>Your Order is Completed!</h2>
                    {orderId && (
                        <p className='mb-5 text-gray-500'>
                            Your order #<span className='text-body text-decoration-underline'>{orderId}</span> has been completed. Your order details are shown for your personal account.
                        </p>
                    )}
                    <a className='btn btn-dark' style={{borderRadius: '0', letterSpacing: '0.1rem'}} onClick={handleViewOrder}>View Your Order</a>
                </div>
            </div>
        </div>
    )
}

export default OrderComplete
