import { addDays, format, parseISO } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useParams } from 'react-router-dom'

import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { BsClock, BsTruck } from 'react-icons/bs'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { LuCheckCircle, LuChevronRight, LuCornerDownRight, LuPackageX, LuPenLine } from 'react-icons/lu'

import { CartContext } from '../context/CartContext'
import { handleUserAddLargeItem } from '../services/cartService'
import { handleAddRemoveFavorite, handleCheckFavorite } from '../services/favoriteService'
import { getAllReviews, getProductById } from '../services/productService'
import { handleCreateReview } from '../services/reviewService'
import './ItemDetail.scss'
import NotFound from './NotFound'

const ItemDetail = () => {
    const { productid } = useParams()
    const { updateCartQuantity } = useContext(CartContext)

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [quantityNumber, setQuantityNumber] = useState(1)
    const [heart, setHeart] = useState(false)
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // Fetch product details
                const productResponse = await getProductById(productid)
                setProduct(productResponse)
    
                // Check favorite status
                const token = localStorage.getItem('token')
                if (!token) {
                    setHeart(false)
                    return
                }
                const favoriteStatus = await handleCheckFavorite(token, productid)
                setHeart(favoriteStatus.inFavo)

                // Show reviews
                const review = await getAllReviews(productid)
                setReviews(review)
            } catch (error) {
                console.error('Error fetching data:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
    
        if (productid) {
            fetchData()
        }
    }, [productid])

    const getEstimatedDeliveryDate = () => {
        const currentDate = new Date()
        const startDate = addDays(currentDate, 3)
        const endDate = addDays(currentDate, 7)
        const formattedStartDate = format(startDate, 'dd')
        const formattedEndDate = format(endDate, 'dd MMM, yyyy')
        return `${formattedStartDate} - ${formattedEndDate}`
    }

    const renderStars = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(
                    <FaStar
                        key={i}
                        className='text-warning'
                        style={{ fontSize: '16px' }}
                    />
                )
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                stars.push(
                    <FaStarHalfAlt
                        key={i}
                        className='text-warning'
                        style={{ fontSize: '16px' }}
                    />
                )
            } else {
                stars.push(
                    <FaRegStar
                        key={i}
                        className='text-warning'
                        style={{ fontSize: '16px' }}
                    />
                )
            }
        }
        return stars
    }

    const changeFormatDay = (dateString) => {
        const date = parseISO(dateString)
        const formattedDate = format(date, 'MMMM dd, yyyy')
        return formattedDate
    }

    const handleIncrement = () => {
        setQuantityNumber(quantityNumber + 1)
    }
    
    const handleDecrement = () => {
        if (quantityNumber > 1) {
          setQuantityNumber(quantityNumber - 1)
        }
    }

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token')
            const productid = product.ProductID

            await handleUserAddLargeItem(token, productid, quantityNumber)
            alert('Add to cart successfully!')
            
            updateCartQuantity()
        } catch (error) {
            console.error('Error in adding product to cart:', error)
        }
    }

    const handleToggleFavorite = async () => {
        try {
            const token = localStorage.getItem('token')
            const productid = product.ProductID

            await handleAddRemoveFavorite(token, productid)
            
            setHeart(!heart)
        } catch (error) {
            console.error('Error toggling favorite status:', error)
        }
    }

    const handleSetComment = (event) => {
        setComment(event.target.value)
    }

    const handlePostReview = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const result = await handleCreateReview(token, product.ProductID, rating, comment)

            if (result.errCode === 0) {
                alert('Review posted successfully!')
                window.location.reload()
                setRating(0)
                setComment('')
            } 
        } catch (error) {
            console.error('Error handling post review:', error)
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

    if (!product) {
        return <div>Product not found</div>
    }

    const visibleReviews = showAll ? reviews : reviews.slice(0, 3)

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 pb-4 pb-md-0 mb-2 mb-sm-3 mb-md-0 d-flex justify-content-end' style={{maxHeight: '550px'}}>
                    <img className='product-img me-5' src={`${process.env.PUBLIC_URL}${product.Image}`} alt={product.Name} />
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-between position-relative' style={{maxHeight: '550px'}}>
                    <div className='ps-md-4 ps-xl-0 me-5'>
                        <div className='row my-1'>
                            <div className='col'>
                                <a className='d-none d-md-flex align-items-center gap-2 text-decoration-none mb-3' href='#review'>
                                    <div className='d-flex gap-1 fs-sm'>
                                        {renderStars(product.AverageRating)}
                                    </div>
                                    <span className='text-body-tertiary fs-sm'>{product.TotalReviews} reviews</span>
                                </a>
                            </div>
                            <div className='col-auto'>
                                <button className='animate-pulse bg-transparent border-0 me-1' onClick={handleToggleFavorite}>
                                    {heart ? <IoMdHeart className='heart-fill' style={{fontSize: '25px'}}/> : <IoMdHeartEmpty className='heart-empty' style={{fontSize: '25px'}}/>}
                                </button>
                            </div>
                        </div>
                        <h1 className='h1 producttitle'>{product.Name}</h1>
                        <p className='fs-sm mb-0 text-secondary pb-3 mb-2 mb-lg-3'>{product.Description}</p>
                        <div style={{height: '95px'}}></div>
                        <div className='d-flex flex-wrap align-items-center'>
                            <div className='h3 mb-0 ms-3'>{product.Price.toLocaleString('vi-VN')} đ</div>
                            {product.InStock !== 0 ? (
                                <>
                                    <span className='d-flex align-items-center text-success fs-sm ms-auto me-3'>
                                        <LuCheckCircle  className='me-1'/> Available to order
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className='d-flex align-items-center text-danger fs-sm ms-auto me-3'>
                                        <LuPackageX className='me-1'/>Sold out
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='position-absolute bottom-0 info'>
                        <div className='d-flex gap-3 pb-3 pb-lg-4 mb-3'>
                            <div className='count-input flex-shrink-0'>
                                <button className='btn btn-icon btn-lg' type='button' data-decrement aria-label='Decrement quantity' onClick={handleDecrement}>
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'><path d='M2 7.75A.75.75 0 0 1 2.75 7h10a.75.75 0 0 1 0 1.5h-10A.75.75 0 0 1 2 7.75Z'></path></svg>
                                </button>
                                <input type='number' className='form-control form-control-lg quantity-number' min='1' value={quantityNumber} onChange={(event) => setQuantityNumber(event.target.value)}/>
                                <button className='btn btn-icon btn-lg' type='button' data-increment aria-label='Increment quantity' onClick={handleIncrement}>
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'><path d='M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z'></path></svg>
                                </button>
                            </div>
                            <button className='btn btn-lg btn-dark w-100' type='submit' onClick={handleAddToCart} disabled={product.InStock !== 0 ? false : true}>Add to cart</button>
                        </div>
                        <ul className='list-unstyled gap-3'>
                            <li className='d-flex flex-wrap fs-sm'>
                                <span className='d-flex align-items-center fw-medium text-dark-emphasis custom-capitalize me-2'>
                                    <BsClock className='icon-small fs-base me-2'/>
                                    Estimated delivery:
                                </span>
                                <span className='custom-capitalize'>{getEstimatedDeliveryDate()}</span>
                            </li>
                            <li className='d-flex flex-wrap fs-sm space'></li>
                            <li className='d-flex flex-wrap fs-sm'>
                                <span className='d-flex align-items-center fw-medium text-dark-emphasis custom-capitalize me-2'>
                                    <BsTruck className='icon-small fs-base me-2'/>
                                    Free shipping & returns:
                                </span>
                                <span className='custom-capitalize'>On all order over 400.000 đ</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='container pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5'>
                <div className='col-md-7' id='review'>
                    <div className='d-flex align-items-center pt-5 mb-4 mt-2 mt-md-3 mt-lg-4'>
                        <h2 className='h3 mb-0'>Reviews</h2>
                        <button className='btn btn-outline-secondary ms-auto align-center'>
                            <div className='accordion-item'>
                                <h2 className='accordion-header' id='headingOne'>
                                    <div className='accordion-button text-dark' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='false' aria-controls='collapseOne'>
                                        <LuPenLine className='ms-n1 me-2'/>Leave a review
                                    </div>
                                </h2>
                            </div>
                        </button>
                    </div>
                    <div id='collapseOne' className='accordion-collapse collapse pb-5 pt-4' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>
                        <div className='accordion-body'>
                            <form className='border-bottom border-top p-4' onSubmit={handlePostReview}>
                                <div className='row'>
                                    <div className='col-12 mb-4 text-center'>
                                        <p className='mb-1 fs-xs'>Score: </p>
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
                                                            style={{ display: 'none' }}
                                                        />
                                                        <FaStar
                                                            className='star'
                                                            color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                                                            size={25}
                                                        required />
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <div className='form-group reviewText'>
                                            <label className='visually-hidden' htmlFor='reviewText'>Review:</label>
                                            <textarea className='form-control form-control-sm' id='reviewText' rows='5' placeholder='Reviews should be more than 50 characters...' onChange={handleSetComment} value={comment}></textarea>
                                        </div>
                                    </div>
                                    <div className='col-12 text-center'>
                                        <button className='btn btn-outline-dark post-review' type='submit'>Post Review</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row g-4 pb-3'>
                        <div className='col-sm-4'>
                            <div className='d-flex flex-column align-items-center justify-content-center h-100 bg-body-tertiary rounded p-4'>
                                <div className='h1 pb-2 mb-1'>{product.AverageRating}</div>
                                <div className='hstack justify-content-center gap-1 fs-sm mb-2'>
                                    {renderStars(product.AverageRating)}
                                </div>
                                <div className='fs-sm'>{product.TotalReviews} reviews</div>
                            </div>
                        </div>
                        <div className='col-sm-8'>
                            <div className='vstack gap-3'>
                                <div className='hstack gap-2'>
                                    <div className='hstack fs-sm gap-1'>5
                                        <FaStar className='text-warning'/>
                                    </div>
                                    <div className='progress w-100' role='progressbar' aria-label='Five stars' aria-valuenow={(product.CountStars[5] / product.TotalReviews) * 100} aria-valuemin='0' aria-valuemax='100' style={{height: '4px'}}>
                                        <div className='progress-bar bg-warning rounded-pill' style={{width: `${(product.CountStars[5] / product.TotalReviews) * 100}%`}}></div>
                                    </div>
                                    <div className='fs-sm text-nowrap text-end' style={{width: '40px'}}>{product.CountStars[5]}</div>
                                </div>
                                <div className='hstack gap-2'>
                                    <div className='hstack fs-sm gap-1'>4
                                        <FaStar className='text-warning'/>
                                    </div>
                                    <div className='progress w-100' role='progressbar' aria-label='Five stars' aria-valuenow={(product.CountStars[4] / product.TotalReviews) * 100} aria-valuemin='0' aria-valuemax='100' style={{height: '4px'}}>
                                        <div className='progress-bar bg-warning rounded-pill' style={{width: `${(product.CountStars[4] / product.TotalReviews) * 100}%`}}></div>
                                    </div>
                                    <div className='fs-sm text-nowrap text-end' style={{width: '40px'}}>{product.CountStars[4]}</div>
                                </div>
                                <div className='hstack gap-2'>
                                    <div className='hstack fs-sm gap-1'>3
                                        <FaStar className='text-warning'/>
                                    </div>
                                    <div className='progress w-100' role='progressbar' aria-label='Five stars' aria-valuenow={(product.CountStars[3] / product.TotalReviews) * 100} aria-valuemin='0' aria-valuemax='100' style={{height: '4px'}}>
                                        <div className='progress-bar bg-warning rounded-pill' style={{width: `${(product.CountStars[3] / product.TotalReviews) * 100}%`}}></div>
                                    </div>
                                    <div className='fs-sm text-nowrap text-end' style={{width: '40px'}}>{product.CountStars[3]}</div>
                                </div>
                                <div className='hstack gap-2'>
                                    <div className='hstack fs-sm gap-1'>2
                                        <FaStar className='text-warning'/>
                                    </div>
                                    <div className='progress w-100' role='progressbar' aria-label='Five stars' aria-valuenow={(product.CountStars[2] / product.TotalReviews) * 100} aria-valuemin='0' aria-valuemax='100' style={{height: '4px'}}>
                                        <div className='progress-bar bg-warning rounded-pill' style={{width: `${(product.CountStars[2] / product.TotalReviews) * 100}%`}}></div>
                                    </div>
                                    <div className='fs-sm text-nowrap text-end' style={{width: '40px'}}>{product.CountStars[2]}</div>
                                </div>
                                <div className='hstack gap-2'>
                                    <div className='hstack fs-sm gap-1'>1
                                        <FaStar className='text-warning'/>
                                    </div>
                                    <div className='progress w-100' role='progressbar' aria-label='Five stars' aria-valuenow={(product.CountStars[1] / product.TotalReviews) * 100} aria-valuemin='0' aria-valuemax='100' style={{height: '4px'}}>
                                        <div className='progress-bar bg-warning rounded-pill' style={{width: `${(product.CountStars[1] / product.TotalReviews) * 100}%`}}></div>
                                    </div>
                                    <div className='fs-sm text-nowrap text-end' style={{width: '40px'}}>{product.CountStars[1]}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {product.TotalReviews === 0 ? (
                        <>
                            <p className='text-center mt-3'>This product does not have any reviews yet</p>
                        </>
                    ) : (
                        <>
                            {visibleReviews.map(review => (
                                <div key={review.ReviewID} className='border-bottom py-3 mb-3'>
                                    <div className='d-flex align-items-center mb-3'>
                                        <div className='text-nowrap me-3'>
                                            <span className='h6 mb-0'>{review['user.Username']}</span>
                                        </div>
                                        <span className='text-body-secondary fs-sm ms-auto'>{changeFormatDay(review.ReviewDate)}</span>
                                    </div>
                                    <div className='d-flex gap-1 fs-sm pb-2 mb-1'>
                                        {renderStars(review.Rating)}
                                    </div>
                                    <p className='fs-sm'>{review.Comment}</p>
                                    <div className='nav align-items-center'>
                                        <button type='button' className='nav-link animate-underline px-0'>
                                            <LuCornerDownRight className='fs-base ms-1 me-1'/>
                                            <span className='animate-target'>Reply</span>
                                        </button>
                                        <div className='ms-auto me-3 text-secondary'>
                                            <p className='mb-0 fs-ms'>Was this review helpful?</p>
                                        </div>
                                        <button type='button' className='nav-link text-body-secondary animate-scale px-0 me-n1'>
                                            <AiOutlineLike className='fa-base animate-target me-1'/>{Math.floor(Math.random() * 100) + 1}
                                        </button>
                                        <hr className='vr my-2 mx-3'></hr>
                                        <button type='button' className='nav-link text-body-secondary animate-scale px-0 me-n1'>
                                            <AiOutlineDislike className='fa-base animate-target me-1'/>{Math.floor(Math.random() * 100) + 1}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {!showAll && (
                                <div className='nav pb-5'>
                                    <button className='nav-link text-secondary animate-underline px-0' role='button' onClick={() => setShowAll(true)}>
                                        <span className='animate-danger'>See all reviews</span>
                                        <LuChevronRight className='fs-base ms-1'/>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className='container mt-5 pt-5 pb-4 pb-md-5 mb-2 mb-sm-0 mb-lg-2 mb-xl-4'>
                    <h2 className='h3 border-bottom pb-4 mb-0'>Viewed Product</h2>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail