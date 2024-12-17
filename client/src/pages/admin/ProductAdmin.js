import React, { useEffect, useState } from 'react';
import SideBarAdmin from '../../components/SideBarAdmin';
import { getAllProducts } from '../../services/productService';

const ProductAdmin = () => {

    const [products, setProducts] = useState([]);

    const categoryMap = {
        1: 'wool',
        2: 'product',
        3: 'material',
        4: 'tool'
    };

    const subcategoryMap = {
        1: 'animal',
        2: 'plant',
        3: 'food',
        4: 'cloth',
        5: 'accessory',
        6: 'mochi',
        7: 'other'
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                const formattedProducts = response.map(product => ({
                    ...product,
                    createdAt: formatDate(product.createdAt), // Format date to dd/mm/yyyy
                    CategoryName: categoryMap[product.CategoryID],
                    SubcategoryName: subcategoryMap[product.SubcategoryID]
                }));
                setProducts(formattedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="container-fluid background-admin">
            <div className="row">
                <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <SideBarAdmin />
                </div>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Product</h1>
                    </div>
                    <div className='mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1'>
                        <div>
                            <div className='d-flex flex-wrap gap-3'></div>
                            <div className='scrollbar ms-n1 ps-1'>
                                <table className='phoenix-table fs-9 table'>
                                    <thead>
                                        <tr>
                                        <th className='ps-4 sort text-uppercase' style={{width: '70px'}}></th>
                                            <th className='ps-4 sort text-uppercase' style={{width: '350px'}}>Product name</th>
                                            <th className='ps-4 text-end sort text-uppercase' style={{width: '150px'}}>Price</th>
                                            <th className='ps-4 sort text-uppercase' style={{width: '150px'}}>Category</th>
                                            <th className='ps-4 sort text-uppercase' style={{width: '150px'}}>Subcategory</th>
                                            <th className='ps-4 sort text-uppercase' style={{width: '50px'}}></th>
                                            <th className='ps-4 sort text-uppercase' style={{width: '150px'}}>Published on</th>
                                            <th style={{width: '7%'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.ProductID}>
                                                <td className='ps-4'><a className='rounded-2 border border-translucent d-inline-block' src={`${process.env.PUBLIC_URL}${product.Image}`}></a></td>
                                                <td className='ps-4 fw-semibold line-clamp-3'>{product.Name}</td>
                                                <td className='fw-bold ps-4 text-body-tertiary text-end'>{product.Price}</td>
                                                <td className='fs-9 fw-semibold ps-4 text-body-tertiary text-opacity-85'>{product.CategoryName}</td>
                                                <td className='fs-9 fw-semibold ps-4 text-body-tertiary text-opacity-85'>{product.SubcategoryName}</td>
                                                <td className='ps-4 fw-semibold text-start'>{/* Additional actions or icons */}</td>
                                                <td className='text-body-tertiary text-opacity-85 ps-4'>{product.createdAt}</td>
                                                <td className='text-end btn-reveal-trigger'>{/* Button to reveal more actions */}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ProductAdmin