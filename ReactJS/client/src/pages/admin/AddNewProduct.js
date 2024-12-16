import React from 'react'
import SideBarAdmin from '../../components/SideBarAdmin';

const ProductAdmin = () => {
    return (
        <div className="container-fluid background-admin">
            <div className="row">
                <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <SideBarAdmin />
                </div>
            </div>
        </div>
    )
}

export default ProductAdmin