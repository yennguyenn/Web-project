import React, { useContext } from 'react'
import { LuCreditCard, LuHeart, LuShoppingBag, LuStar, LuUser, LuBell, LuBadgeHelp, LuBadgeInfo, LuLogOut, LuMapPin } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './SideBar.scss'

const SideBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    return(
        <div className='offcanvas-body d-block pb-lg-0'>
            <div className='cart-header topic'>Dashboard</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/order' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuShoppingBag className='fs-base opacity-75 me-2'/>Order
                    <span className='badge rounded-pill ms-auto'>1</span>
                </Link>
                <Link to='/favorite' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuHeart className='fs-base opacity-75 me-2'/>Favorite
                </Link>
                <Link to='/coming-soon' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuCreditCard className='fs-base opacity-75 me-2'/>Payment method
                </Link>
                <Link to='/coming-soon' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuStar className='fs-base opacity-75 me-2'/>My review
                </Link>
            </nav>
            <div className='cart-header topic mt-3'>Manage account</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to={`/profile/${isAuthenticated.user?.Username}`} className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuUser className='fs-base opacity-75 me-2'/>Personal info
                </Link>
                <Link to='/coming-soon' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuMapPin className='fs-base opacity-75 me-2'/>Address
                </Link>
                <Link to='/notification' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuBell className='fs-base opacity-75 me-2'/>Notification
                </Link>
            </nav>
            <div className='cart-header topic mt-3'>Customer service</div>
            <nav className='list-group list-group-borderless mt-1'>
                <Link to='/coming-soon' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuBadgeHelp className='fs-base opacity-75 me-2'/>Help center
                </Link>
                <Link to='/coming-soon' className='list-group-item list-group-item-action d-flex align-items-center'>
                    <LuBadgeInfo className='fs-base opacity-75 me-2'/>Terms and conditions
                </Link>
            </nav>
            <nav className='list-group list-group-borderless pt-3'>
                <Link className='list-group-item list-group-item-action d-flex align-items-center border-none' onClick={handleLogout}>
                    <LuLogOut className='fs-base opacity-75 me-2'/>Logout
                </Link>
            </nav>
        </div>
    )
}
export default SideBar;