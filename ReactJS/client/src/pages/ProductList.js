import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSearch } from '../context/SearchContext'
import { CartContext } from '../context/CartContext'

import { getProductByKeyword } from '../services/productService'
import { handleUserAddToCart } from '../services/cartService'
import { handleAddRemoveFavorite } from '../services/favoriteService'

import Spinner from 'react-bootstrap/Spinner'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'


const ProductList = () => {
    const { keyword } = useSearch()
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { updateCartQuantity } = useContext(CartContext)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await getProductByKeyword(keyword)
                console.log(response)

                if (response.errCode === 0) {
                    setProducts(response.products)
                    setCount(response.count)
                    setError(null)
                } else {
                    setError(response.errMessage)
                    setProducts([])
                }
            } catch (error) {
                console.error('Error searching products:', error)
                setError('An error occurred while searching for products.')
                setProducts([])
            } finally {
                setLoading(false)
            }
        }

        if (keyword !== '') {
            fetchProducts()
        } else {
            setProducts([])
        }
    }, [keyword])

    const handleAddToCart = async (id) => {
        try {
            if (!id) {
                console.error('Error: Invalid product')
                return
            }
            const token = localStorage.getItem('token')
            if (!token) {
                alert('You need to login first')
                return
            }

            await handleUserAddToCart(token, id)
            
            alert('Added product to cart successfully')
            updateCartQuantity()
        } catch (error) {
            console.error('Error add product to cart:', error)
        }
    }

    const handleToggleFavorite = async (productId) => {
        try {
            if (!productId) {
                console.error('Error: Invalid product')
                return
            }

            const token = localStorage.getItem('token')
            if (!token) {
                alert('You need to login first')
                return
            }

            await handleAddRemoveFavorite(token, productId)

            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.ProductID === productId
                        ? { ...product, isFavorite: !product.isFavorite }
                        : product
                )
            );
        } catch (error) {
            console.error('Error toggling favorite status:', error)
        }
    }

    if (loading) {
        return (
            <div>
                <NavBar />
                <div className='container my-5 py-3'>
                    <h4>About {count} results found for "{keyword}"</h4>
                </div>
                <div className='container d-flex align-items-center justify-content-center'>
                    <Spinner animation='border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
                <Footer />
            </div>
        )
    }

    

    if (error) {
        return <div><NotFound/></div>
    }

    return (
        <div>
            <NavBar />
            <div className='container my-5 py-3'>
                <h4 className='mb-4'>About {count} results found for "{keyword}"</h4>
                <div className='row row-cols-1 row-cols-md-4 g-4'>
                    {products.map(product => (
                        <div key={product.ProductID} className='col'>
                            <div className='card h-100 product-box'>
                                <div className='product-image'>
                                    <Link to={`/product/detail/${product.ProductID}`}>
                                        <img src={`${process.env.PUBLIC_URL}${product.Image}`} className='card-img' alt={product.Name} />
                                    </Link>
                                    <div className='product-action'>
                                        <Link className='i-cart' onClick={() => handleAddToCart(product.ProductID)}>
                                            <FontAwesomeIcon icon={faShoppingCart} className='mx-2' />
                                        </Link>
                                        <Link className={`${product.isFavorite ? 'i-heart-favo' : 'i-heart'}`} onClick={() => handleToggleFavorite(product.ProductID)}>
                                            <FontAwesomeIcon icon={faHeart} className='mx-2'/>
                                        </Link>
                                    </div>
                                </div>
                                <div className='product-content'>
                                    <h3 className='product-title fw-bold'><a href={`/product/detail/${product.ProductID}`}>{product.Name}</a></h3>
                                    <span className='product-price'>{product.Price.toLocaleString('vi-VN')} đ</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>    
            <Footer />
        </div>
    )
}

export default ProductList
