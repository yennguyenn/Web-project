import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/productService'
import Footer from '../components/Footer'
import ItemDetail from '../components/ItemDetail'
import NavBar from '../components/NavBar'
import './ProductPage.scss'

const ProductInfo = () => {
    const { category, subcategory, productid } = useParams()
    const [productName, setProductName] = useState('Product')
    const [productCategory, setProductCategory] = useState(null)
    const [productSubcategory, setProductSubcategory] = useState(null)

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const product = await getProductById(productid)
                setProductName(product.Name)
                setProductCategory(product.CategoryID)
                setProductSubcategory(product.SubcategoryID)
            } catch (error) {
                console.error('Error fetching product details:', error)
            }
        }
        getProductDetails()
    }, [productid])

    const categoryMap = {
        1: 'wool',
        2: 'product',
        3: 'material',
        4: 'tool'
    }

    const subcategoryMap = {
        1: 'animal',
        2: 'plant',
        3: 'food',
        4: 'cloth',
        5: 'accessory',
        6: 'mochi',
        7: 'other'
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div>
            <NavBar />
            <div className='container'>
                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb justify-content-start no-border my-4'>
                        <li className='breadcrumb-item'><Link className='breadcrumb-link bread-home' to='/home'>Home</Link></li>
                        {productCategory && <li className='breadcrumb-item'><Link className='breadcrumb-link' to={`/product/${categoryMap[productCategory]}`}>{capitalizeFirstLetter(categoryMap[productCategory])}</Link></li>}
                        {productSubcategory && productCategory && <li className='breadcrumb-item'><Link className='breadcrumb-link' to={`/product/${categoryMap[productCategory]}/${subcategoryMap[productSubcategory]}`}>{capitalizeFirstLetter(subcategoryMap[productSubcategory])}</Link></li>}
                        <li className='breadcrumb-item active' aria-current='page'>{productName}</li>
                    </ol>
                </nav>
            </div>
            <div className='container my-5'>
                <ItemDetail productid={productid}/>  
            </div>
            <Footer />
        </div>
    )
}

export default ProductInfo
