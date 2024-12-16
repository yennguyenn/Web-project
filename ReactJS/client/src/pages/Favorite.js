import React, { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { handleShowProductDetail } from '../services/cartService'
import { handleShowFavorite } from '../services/favoriteService'
import { handleUserAddToCart } from '../services/cartService'

import './Favorite.scss'
import NotFound from '../components/NotFound'

const Favorite = () => {

    const { isAuthenticated } = useContext(AuthContext)
    const { updateCartQuantity } = useContext(CartContext)

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [favoData, setFavoData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                let response = await handleShowFavorite(token)
                console.log(response)

                setFavoData(response.favorites)

                const detailsPromises = response.favorites.map(async (item) => {
                    const product = await handleShowProductDetail(item.ProductID)
                    return product
                })
                
                const detailedProducts = await Promise.all(detailsPromises)
                setProducts(detailedProducts)
                
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products: ', error)
                setError(error.message)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleAddToCart = async (productid) => {
        try {
            if (!productid) {
                console.error('Error: Invalid product')
                return
            }
            const token = localStorage.getItem('token')
            if (!token) {
                alert('You need to login first')
                return
            }
            await handleUserAddToCart(token, productid)
            
            alert('Added product to cart successfully')
            updateCartQuantity()
        } catch (error) {
            console.error('Error add product to cart:', error)
        }
    }

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
                            <li className='breadcrumb-item'><Link className='breadcrumb-link'>Account</Link></li>
                            <li className='breadcrumb-item active' aria-current='page'>Favotire</li>
                        </ol>
                    </nav>
                </div>
                <div className='hero-content pb-4 text-center'>
                    <h1 className='hero-heading'>Your Favorites</h1>
                </div> 
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-4 mb-5'>
                            <SideBar/>
                        </div>
                        <div className='col-lg-8 col-xl-9 align-middle'>
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
                        <li className='breadcrumb-item'><Link className='breadcrumb-link' to={`/profile/${isAuthenticated.user.Username}`}>Account</Link></li>
                        <li className='breadcrumb-item active' aria-current='page'>Favotire</li>
                    </ol>
                </nav>
            </div>
            <div className='hero-content pb-4 text-center'>
                <h1 className='hero-heading'>Your Favorites</h1>
            </div> 
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-3 col-lg-4 mb-5'>
                        <SideBar/>
                    </div>
                    <div className='col-lg-8 col-xl-9 align-middle'>
                        <div className='cart-header tex-center'>
                            <div className='row'>
                                <div className='col-md-5 text-center'>Item</div>
                                <div className='d-none d-md-block col'>
                                    <div className='row'>
                                        <div className='col-md-4 text-center'>Unit Price</div>
                                        <div className='col-md-4 text-center'>Stock Status</div>
                                        <div className='col-md-4'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='cart-body'>
                            {favoData.length === 0 ? (
                                <div className='col-lg my-5'>
                                    <div className='text-center' style={{ fontSize: '25px' }}>
                                        <p>You have no favorite items.</p>
                                    </div>
                                </div>
                            ) : (
                                products.map(product => (
                                    <div key={product.ProductID} className='cart-item'>
                                        <div className='row d-flex align-items-start'>
                                            <div className='col-md-5 d-flex'>
                                                <Link className='col-3' to={`/product/detail/${product.ProductID}`}>
                                                    <img className='cart-image' src={`${process.env.PUBLIC_URL}${product.Image}`} alt={product.ProductName} />
                                                </Link>
                                                <div className='cart-title col-9 mt-2'>
                                                    <Link className='text-uppercase' to={`/product/detail/${product.ProductID}`}>{product.ProductName}
                                                        <label role='button'>{product.Name}</label>
                                                    </Link>
                                                    <p className='text-muted text-sm text-truncate'>{product.Description}</p>
                                                </div>
                                            </div>
                                            <div className='col-md-7'>
                                                <div className='row pt-4'>
                                                    <div className='col-md-4 text-center'>
                                                        {product.Price.toLocaleString('vi-VN')} đ
                                                    </div>
                                                    <div className='col-md-4 text-center'>
                                                        <label className={`fw-bold ${product.InStock !== 0 ? 'text-dark' : 'text-danger' }`}>{(product.InStock !== 0) ? 'In Stock' : 'Out of Stock'}</label>
                                                    </div>
                                                    <div className='col-md-4 text-center'>
                                                        <button className='btn btn-sm btn-dark btn-cart' onClick={() => handleAddToCart(product.ProductID)}>
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default Favorite
