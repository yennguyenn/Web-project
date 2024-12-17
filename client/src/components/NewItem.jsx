import { faChevronLeft, faChevronRight, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link} from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { handleUserAddToCart } from '../services/cartService'
import { handleAddRemoveFavorite, handleCheckFavorite } from '../services/favoriteService'
import { getNewProduct } from '../services/productService'
import './Item.scss'
import NotFound from './NotFound'

const NewItem = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { updateCartQuantity } = useContext(CartContext)
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(false)
        const fetchData = async () => {
            try {
                const response = await getNewProduct()
                if (response) {
                    const productsWithFavoriteStatus = await Promise.all(
                        response.map(async (product) => {
                            if (token) {
                                const favoriteStatus = await handleCheckFavorite(token, product.ProductID)
                                return { ...product, isFavorite: favoriteStatus.inFavo }
                            }
                            return { ...product, isFavorite: false }
                        })
                    )
                    setProducts(productsWithFavoriteStatus)
                }
            } catch (error) {
                console.error('Error fetching products: ', error)
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [token])

    const handleAddToCart = async (id) => {
        try {
            if (!id) throw new Error('Invalid product')
            if (!token) throw new Error('You need to login first')

            await handleUserAddToCart(token, id)
            alert('Added product to cart successfully')
            updateCartQuantity()
        } catch (error) {
            console.error('Error adding product to cart:', error)
            alert(error.message)
        }
    }

    const handleToggleFavorite = async (productId) => {
        try {
            if (!productId) throw new Error('Invalid product')
            if (!token) throw new Error('You need to login first')

            await handleAddRemoveFavorite(token, productId)
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.ProductID === productId
                        ? { ...product, isFavorite: !product.isFavorite }
                        : product
                )
            )
        } catch (error) {
            console.error('Error toggling favorite status:', error)
            alert(error.message)
        }
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1,
        }
    }

    const CustomLeftArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest
    
        return (
            <button
                className='arrow-left position-absolute'
                onClick={() => onClick()}
                aria-label="Prev Slide"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        )
    }
    
    const CustomRightArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest
    
        return (
            <button
                className='arrow-right position-absolute'
                onClick={() => onClick()}
                aria-label="Next Slide"
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        )
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
        <Carousel
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            customTransition='transform 200ms ease-in-out'
            transitionDuration={200}
            containerClass='carousel-container'
            itemClass='carousel-item-padding-60-px'
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
        >
            {products.slice(0, 12).map(product => (
                <div key={product.ProductID} className='card h-100 product-box mx-2' style={{border: 'none'}}>
                    <div className='product-image'>
                        <a href={`/product/detail/${product.ProductID}`}>
                            <img src={`${process.env.PUBLIC_URL}${product.Image}`} className='card-img' alt={product.Name} />
                        </a>
                        <span className='product-promo bg-red'>hot</span>
                        <div className='product-action'>
                            <a className='i-cart' onClick={() => handleAddToCart(product.ProductID)}>
                                <FontAwesomeIcon icon={faShoppingCart} className='mx-2' />
                            </a>
                            <a className={`${product.isFavorite ? 'i-heart-favo' : 'i-heart'}`} onClick={() => handleToggleFavorite(product.ProductID)}>
                                <FontAwesomeIcon icon={faHeart} className='mx-2'/>
                            </a>
                        </div>
                    </div>
                    <div className='product-content'>
                        <h3 className='product-title fw-bold'><Link to={`/product/detail/${product.ProductID}`}>{product.Name}</Link></h3>
                        <span className='product-price'>{product.Price.toLocaleString('vi-VN')} đ</span>
                    </div>
                </div>
            ))}
        </Carousel>
    )
}

export default NewItem
