import React from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Item from '../components/Item'
import NavBar from '../components/NavBar'
import './ProductPage.scss'

const categoryMap = {
    jewelry: 1,
    product: 2,
    material: 3,
    gift: 4
}

const subcategoryMap = {
    ring: 1,
    necklaces: 2,
    bracelets: 3,
    watches: 4,
    other: 5
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const ProductPage = () => {
    const { category, subcategory } = useParams()

    const categoryid = category ? categoryMap[category.toLowerCase()] : null
    const subcategoryid = subcategory ? subcategoryMap[subcategory.toLowerCase()] : null

    return (
        <div className='bg-1'>
            <NavBar />
            <div className='container'>
                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb justify-content-start no-border my-4'>
                        <li className='breadcrumb-item'><a className='breadcrumb-link bread-home' href='/'>Home</a></li>
                        {subcategory ? (
                            <>
                                <li className='breadcrumb-item'><a className='breadcrumb-link' href='/product/product'>{capitalizeFirstLetter('product')}</a></li>
                                <li className='breadcrumb-item active' aria-current='page'>{capitalizeFirstLetter(subcategory)}</li>
                            </>
                        ) : (
                            category && <li className='breadcrumb-item active' aria-current='page'>{capitalizeFirstLetter(category)}</li>
                        )}
                    </ol>
                </nav>
            </div>
            <div className='hero-content pb-4 text-center'>
                <h1 className='hero-heading'>
                    {subcategory ? (subcategory.charAt(0).toUpperCase() + subcategory.slice(1)) : (category ? (category.charAt(0).toUpperCase() + category.slice(1)) : 'Product')}
                </h1>
            </div> 
            <div className='container mb-5'>
                {categoryid && <Item categoryid={categoryid} />}
                {subcategoryid && <Item subcategoryid={subcategoryid} />}
            </div>
            <Footer />
        </div>
    )
}

export default ProductPage
