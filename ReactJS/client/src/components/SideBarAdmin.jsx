import React, { useContext } from 'react';
import { LuBarChart2, LuBell, LuBox, LuClipboardCheck, LuClipboardList, LuCreditCard, LuHeart, LuLogOut, LuMapPin, LuShoppingBag, LuTag, LuUser } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './SideBarAdmin.scss'

const SideBarAdmin = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    return (
        <div className='sidebar offcanvas-body d-block pb-lg-0'>
            <div className='cart-header side-head'></div>
            <div className='cart-header side-head'>Dashboard</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/admin/overview' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuShoppingBag className='fs-base opacity-75 me-2' />Overview
                </Link>
                <Link to='/admin/sales-statistics' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuBarChart2 className='fs-base opacity-75 me-2' />Sales Statistics
                </Link>
                <Link to='/admin/inventory-status' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuClipboardList className='fs-base opacity-75 me-2' />Inventory Status
                </Link>
            </nav>

            <div className='cart-header side-head'>Orders</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/admin/orders' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuClipboardList className='fs-base opacity-75 me-2' />All Orders
                </Link>
                <Link to='/admin/orders/pending' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuClipboardList className='fs-base opacity-75 me-2' />Pending Orders
                </Link>
                <Link to='/admin/orders/completed' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuClipboardCheck className='fs-base opacity-75 me-2' />Completed Orders
                </Link>
            </nav>

            <div className='cart-header side-head'>Products</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/admin/products' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuBox className='fs-base opacity-75 me-2' />All Products
                </Link>
                <Link to='/admin/products/add' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuBox className='fs-base opacity-75 me-2' />Add New Product
                </Link>
                <Link to='/admin/categories' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuBox className='fs-base opacity-75 me-2' />Categories
                </Link>
                <Link to='/admin/stock' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuClipboardList className='fs-base opacity-75 me-2' />Stock Management
                </Link>
            </nav>

            <div className='cart-header side-head'>Customers</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/admin/customers' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuUser className='fs-base opacity-75 me-2' />Customer List
                </Link>
                <Link to='/admin/feedback' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuHeart className='fs-base opacity-75 me-2' />Customer Feedback
                </Link>
                <Link to='/admin/support' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuBell className='fs-base opacity-75 me-2' />Support Tickets
                </Link>
            </nav>

            <div className='cart-header side-head'>Promotions</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/admin/discounts' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuTag className='fs-base opacity-75 me-2' />Discount Codes
                </Link>
                <Link to='/admin/promotions' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuTag className='fs-base opacity-75 me-2' />Promotions
                </Link>
            </nav>

            <div className='cart-header side-head'>Settings</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/admin/settings/store' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuMapPin className='fs-base opacity-75 me-2' />Store Settings
                </Link>
                <Link to='/admin/settings/payment' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuCreditCard className='fs-base opacity-75 me-2' />Payment Settings
                </Link>
                <Link to='/admin/settings/shipping' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuMapPin className='fs-base opacity-75 me-2' />Shipping Settings
                </Link>
            </nav>

            <div className='cart-header side-head'>Account</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/admin/profile' className='list-group-item list-group-item-action d-flex align-items-center side-item'>
                    <LuUser className='fs-base opacity-75 me-2' />Profile
                </Link>
                <Link className='list-group-item list-group-item-action d-flex align-items-center border-none side-item' onClick={handleLogout}>
                    <LuLogOut className='fs-base opacity-75 me-2' />Logout
                </Link>
            </nav>
        </div>
    );
}

export default SideBarAdmin;
