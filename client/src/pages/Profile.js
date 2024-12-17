import React, { useContext, useEffect, useState } from 'react'

import Spinner from 'react-bootstrap/Spinner'
import Flatpickr from 'react-flatpickr'
import { format } from 'date-fns'
import { Button, Modal } from 'react-bootstrap'
import { CiCalendar } from 'react-icons/ci'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import { handleDeleteUserAccount, handleShowProfile, handleUpdateProfile } from '../services/userService'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import './Profile.scss'
import NotFound from '../components/NotFound'

const Profile = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)
    
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [currPassValid, setCurrPassValid] = useState(true)
    const [newPassValid, setNewPassValid] = useState(true)
    const [confPassValid, setConfPassValid] = useState(true)

    const [errCurrPass, setErrCurrPass] = useState('')
    const [errNewPass, setErrNewPass] = useState('')
    const [errConfPass, setErrConfPass] = useState('')

    useEffect(() => {
        let ignore = false

        const fetchData = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                const response = await handleShowProfile(token)
                if (!ignore) {
                    setProfile(response.user)
                }
            } catch (error) {
                if (!ignore) {
                    setError(error) 
                    console.error('Error fetching profile:', error)
                }
            } finally {
                if (!ignore) {
                    setLoading(false) 
                }
            }
        }
        fetchData()
        return () => {
            ignore = true 
        }
    }, [isAuthenticated.token])

    const handleChange = (event) => {
        const { name, value } = event.target
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }))
    }

    const handleChangeProfile = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')

            await handleUpdateProfile(token, profile)

            const responseShow = await handleShowProfile(token)
        
            setProfile(responseShow.user)
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    }

    const hidePassword = (password) => {
        return password.replace(/./g, '*')
    }

    const handleChangePassword = (event) => {
        const { name, value } = event.target
        if (name === 'currentPassword') {
            setCurrentPassword(value)
            if (value.trim() !== '') {
                setCurrPassValid(true)
                setErrCurrPass('')
            }
        } else if (name === 'newPassword') {
            setNewPassword(value)
            if (value.trim() !== '') {
                setNewPassValid(true)
                setErrNewPass('')
            }
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value)
            if (value.trim() !== '') {
                setConfPassValid(true)
                setErrConfPass('')
            }
        }
    }

    const handleSubmitPassword = async (event) => {
        event.preventDefault()
        
        if (currentPassword.trim() === '') {
            setCurrPassValid(false)
            setErrCurrPass('Please enter your current password')
            return
        }

        if (newPassword.trim() === '') {
            setNewPassValid(false)
            setErrNewPass('Please enter your new password')
            return
        }

        if (newPassword.trim().length < 8) {
            setNewPassValid(false)
            setErrNewPass('Password must be at least 8 characters long')
            return
        }

        if (confirmPassword.trim() === '') {
            setConfPassValid(false)
            setErrConfPass('Please enter your confirm password')
            return
        }

        if (newPassword !== confirmPassword) {
            setNewPassValid(false)
            setConfPassValid(false)
            setErrNewPass('New password and confirm password do not match')
            return
        }

        try {
            const token = localStorage.getItem('token')
            const response = await handleChangePassword(token, currentPassword, newPassword)

            if (response && response.errCode === 1) {
                setCurrPassValid(false)
                setErrCurrPass(response.errMessage)
            } else if (response && response.errCode === 4) {
                setNewPassValid(false)
                setConfPassValid(false)
                setErrNewPass(response.errMessage)
            } else if (response && response.errCode === 0) {
                alert(response.errMessage)
                window.location.reload()
            }
        } catch (error) {
            console.error('Change password error:', error)
        }
    }

    const handleDeleteAccount = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const response = await handleDeleteUserAccount(token)
            alert(response.errMessage)
            logout()
        } catch (error) {
            console.error('Error deleting proflie:', error)
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
                        <li className='breadcrumb-item active' aria-current='page'>Profile</li>
                    </ol>
                </nav>
                <div className='hero-content pb-4 text-center'>
                    <h1 className='hero-heading'>Your Account</h1>
                </div> 
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-3 col-lg-4 mb-5'>
                        <SideBar/>
                    </div>
                    <div className='col-lg-8 col-xl-9'>
                        <div className='cart-header'>Your Profile</div>
                        <div className='cart-body'>
                            <div className='border-bottom py-4'>
                                <div className='nav flex-nowrap align-items-center justify-content-between pb-1 mb-3'>
                                    <h2 className='h6 mb-0'>Basic Info</h2>
                                    <a className='nav-link hiding-collapse-toggle text-decoration-underline p-0 collapsed text-capitalize text-dark' href='.basic-info' data-bs-toggle='collapse' aria-expanded='false' aria-controls='basicInforPreview basicInfoEdit'>Edit</a>
                                </div>
                                <div className='basic-info collapse show' id='basicInfoPreview'>
                                    <ul className='list-unstyled fs-sm m-0 info-name'>
                                        <li>{profile.Lastname + ' ' + profile.Firstname}</li>
                                        <li className='mt-1'>{profile.DateOfBirth ? format(new Date(profile.DateOfBirth), 'MMMM dd, yyyy') : ''}</li>
                                        <li className='mt-1'>{profile.Address}</li>
                                    </ul>
                                </div>
                                <div className='basic-info collapse' id='basicInfoEdit'>
                                    <form onSubmit={handleChangeProfile}>
                                        <div className='row g-3 g-sm-4'>
                                            <div className='col-sm-6'>
                                                <label htmlFor='fn1' className='form-label ms-2'>Firstname</label>
                                                <div className='position-relative'>
                                                    <input type='text' className='form-control' id='fn1' name='Firstname' value={profile?.Firstname || ''} onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <label htmlFor='fn2' className='form-label ms-2'>Lastname</label>
                                                <div className='position-relative'>
                                                    <input type='text' className='form-control' id='fn2' name='Lastname' value={profile?.Lastname || ''} onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <label htmlFor='dob' className='form-label ms-2'>Date of birth</label>
                                                <div className='position-relative'>
                                                    <Flatpickr
                                                        id='dob'
                                                        name='DateOfBirth'
                                                        className='form-control form-icon-end'
                                                        value={profile?.DateOfBirth || ''}
                                                        onChange={(selectedDates) => {
                                                            const selectedDate = selectedDates[0];
                                                            setProfile(prevProfile => ({
                                                                ...prevProfile,
                                                                DateOfBirth: selectedDate instanceof Date ? selectedDate.toISOString() : ''
                                                            }));
                                                        }}
                                                        options={{
                                                            dateFormat: 'F j, Y',
                                                        }}
                                                        placeholder='Choose date'
                                                    />
                                                    <CiCalendar className='position-absolute top-50 end-0 translate-middle-y me-3 h4'/>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <label htmlFor='address' className='form-label ms-2'>Address</label>
                                                <div className='position-relative'>
                                                    <input type='text' className='form-control' id='address' name='Address' value={profile.Address || ''} onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex gap-3 pt-2 pt-sm-0'>
                                                    <button type='submit' className='btn btn-danger opacity-75' data-bs-toggle='collapse' data-bs-target='.basic-info' aria-expanded='true' aria-controls='basicInfoPreview basicInfoEdit'>Save changes</button>
                                                    <button type='button' className='btn btn-secondary opacity-75' data-bs-toggle='collapse' data-bs-target='.basic-info' aria-expanded='true' aria-controls='basicInfoPreview basicInfoEdit'>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='border-bottom py-4'>
                                <div className='nav flex-nowrap align-items-center justify-content-between pb-1 mb-3'>
                                    <h2 className='h6 mb-0'>Contact</h2>
                                    <a className='nav-link hiding-collapse-toggle text-decoration-underline p-0 collapsed text-capitalize text-dark' href='.contact-info' data-bs-toggle='collapse' aria-expanded='false' aria-controls='contactInforPreview contacInfoEdit'>Edit</a>
                                </div>
                                <div className='contact-info collapse show' id='contactInfoPreview'>
                                    <ul className='list-unstyled fs-sm m-0'>
                                        <li>{profile.Email}<span className='text-success ms-3'>Verified</span></li>
                                        <li className='mt-1'>{profile.Phone ? `0${profile.Phone}` : ''} {profile.Phone ? <span className='text-success ms-3'>Verified</span> : ''}</li>
                                    </ul>
                                </div>
                                <div className='contact-info collapse' id='contactInfoEdit'>
                                    <form onSubmit={handleChangeProfile}>
                                        <div className='row g-3 g-sm-4'>
                                            <div className='col-sm-6'>
                                                <label htmlFor='email' className='form-label ms-2'>Email</label>
                                                <div className='position-relative'>
                                                    <input type='text' className='form-control' id='email' name='Email' value={profile.Email || ''} onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <label htmlFor='phone' className='form-label ms-2'>Phone number</label>
                                                <div className='position-relative'>
                                                    <input type='text' className='form-control' id='phone' name='Phone' value={profile.Phone || ''} onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex gap-3 pt-2 pt-sm-0'>
                                                    <button type='submit' className='btn btn-danger opacity-75' data-bs-toggle='collapse' data-bs-target='.contact-info' aria-expanded='true' aria-controls='contactInfoPreview contactInfoEdit'>Save changes</button>
                                                    <button type='button' className='btn btn-secondary opacity-75' data-bs-toggle='collapse' data-bs-target='.contact-info' aria-expanded='true' aria-controls='contactInfoPreview contactInfoEdit'>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='border-bottom py-4'>
                                <div className='nav flex-nowrap align-items-center justify-content-between pb-1 mb-3'>
                                    <h2 className='h6 mb-0'>Password</h2>
                                    <a className='nav-link hiding-collapse-toggle text-decoration-underline p-0 collapsed text-capitalize text-dark' href='.pass-info' data-bs-toggle='collapse' aria-expanded='false' aria-controls='passInforPreview passInfoEdit'>Edit</a>
                                </div>
                                <div className='pass-info collapse show' id='passInfoPreview'>
                                    <ul className='list-unstyled fs-sm m-0'>
                                        <li>{hidePassword(profile.Password).slice(0, 10)}</li>
                                    </ul>
                                </div>
                                <div className='pass-info collapse' id='passInfoEdit'>
                                    <form onSubmit={handleSubmitPassword}>
                                        <div className='row g-3 g-sm-4'>
                                            <div className='col-sm-4'>
                                                <label htmlFor='currentPassword' className='form-label ms-2'>Current password</label>
                                                <div className='position-relative'>
                                                    <input 
                                                        type="password" 
                                                        className={`form-control ${!currPassValid ? 'is-invalid' : ''}`} 
                                                        id="currentPassword" 
                                                        name="currentPassword" 
                                                        value={currentPassword} 
                                                        onChange={handleChangePassword}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errCurrPass}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-4'>
                                                <label htmlFor='newPassword' className='form-label ms-2'>New password</label>
                                                <div className='position-relative'>
                                                    <input 
                                                        type="password" 
                                                        className={`form-control ${!newPassValid ? 'is-invalid' : ''}`} 
                                                        id="newPassword" 
                                                        name="newPassword"  
                                                        value={newPassword} 
                                                        onChange={handleChangePassword}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errNewPass}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-4'>
                                                <label htmlFor='confirmPassword' className='form-label ms-2'>Confirm new password</label>
                                                <div className='position-relative'>
                                                    <input 
                                                        type="password" 
                                                        className={`form-control ${!confPassValid ? 'is-invalid' : ''}`} 
                                                        id="confirmPassword" 
                                                        name="confirmPassword" 
                                                        value={confirmPassword} 
                                                        onChange={handleChangePassword}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errConfPass}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex gap-3 pt-2 pt-sm-0'>
                                                    <button type='submit' className='btn btn-danger opacity-75'>Save changes</button>
                                                    <button type='button' className='btn btn-secondary opacity-75' data-bs-toggle='collapse' data-bs-target='.pass-info' aria-expanded='true' aria-controls='passInfoPreview passInfoEdit'>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {profile.Role === 'customer' && (
                            <div className='pt-3 mt-2 mt-sm-3 mb-5 pb-4'>
                                <h2 className='h6'>Delete account</h2>
                                <p className='fs-sm mt-4 blockquote-footer'>
                                    When you delete your account, your public profile will be deactivated immediately. If you change your mind before the 14 days are up, sign in with your email and password, and we'll send you a link to reactivate your account.
                                </p>
                                <a className='text-danger fs-sm fw-medium text-decoration-none delete' type='button' onClick={() => setShowModal(true)}>Delete account</a>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Account Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your account? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={handleDeleteAccount}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer/>
        </div>
    )

}

export default Profile
