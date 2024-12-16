import React, { useState } from "react"
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { handleGetVerifyCode, handleResetPassword, handleCheckVerifyCode } from '../../services/userService'
import './Form.scss'

const ForgotPassword = () => {
    const [username, setUsername] = useState('') 
    const [email, setEmail] = useState('') 
    const [code, setCode] = useState('') 
    const [password, setPassword] = useState('') 
    const [confPass, setConfPass] = useState('') 

    const [usernameValid, setUsernameValid] = useState(true) 
    const [emailValid, setEmailValid] = useState(true) 
    const [codeValid, setCodeValid] = useState(true) 
    const [passwordValid, setPasswordValid] = useState(true) 
    const [confPassValid, setConfPassValid] = useState(true) 

    const [errUsername, setErrUsername] = useState('') 
    const [errEmail, setErrEmail] = useState('') 
    const [errCode, setErrCode] = useState('') 
    const [errPassword, setErrPassword] = useState('') 
    const [errConfPass, setErrConfPass] = useState('') 

    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault() 

        if (username.trim() === '') {
            setUsernameValid(false);
            setErrUsername('Please enter your username');
            return;
        }

        if (email.trim() === '') {
            setEmailValid(false);
            setErrEmail('Please enter your email');
            return;
        }

        if (password.trim().length < 8) {
            setPasswordValid(false) 
            setErrPassword('Password must be at least 8 characters long') 
            return 
        }

        if (confPass.trim() === '') {
            setConfPassValid(false) 
            setErrConfPass('Please confirm your password') 
            return 
        }

        if (password !== confPass) {
            setPasswordValid(false)
            setConfPassValid(false) 
            setErrConfPass('Passwords do not match') 
            return 
        }

        try {
            const response = await handleResetPassword(username, code, password)
            if (response.errCode !== 0) {
                setCodeValid(false)
                setErrCode(response.errMessage)
                return
            } else if (response.errCode === 0) {
                alert(response.errMessage)
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
        }
    } 

    const handleCheckCode = async (event) => {
        event.preventDefault()

        if (code.trim() === '') {
            setCodeValid(false) 
            setErrCode('Please enter your verify code') 
            return 
        }

        try {
            let response = await handleCheckVerifyCode(username, code)
            console.log(response)
            if (response.errCode !== 0) {
                setCodeValid(false)
                setErrCode(response.errMessage)
            }
            alert(response.errMessage)
            setShowModal(false)

        } catch (error) {
            console.error(error)
        }
    }

    const handleOnChangeInput = (event) => {
        const { name, value } = event.target 

        switch (name) {
            case 'username':
                setUsername(value) 
                setUsernameValid(true) 
                setErrUsername('') 
                break 
            case 'email':
                setEmail(value) 
                setEmailValid(true) 
                setErrEmail('') 
                break 
            case 'code':
                setCode(value) 
                setCodeValid(true) 
                setErrCode('') 
                break 
            case 'password':
                setPassword(value) 
                setPasswordValid(true) 
                setErrPassword('') 
                break 
            case 'confPass':
                setConfPass(value) 
                setConfPassValid(true) 
                setErrConfPass('') 
                break 
            default:
                break 
        }
    } 

    const handleSendCode = async () => {
        if (username.trim() === '') {
            setUsernameValid(false) 
            setErrUsername('Please enter your username') 
            return 
        }

        if (email.trim() === '') {
            setEmailValid(false) 
            setErrEmail('Please enter your email') 
            return 
        }

        if (username === '' || email === '') {
            setShowModal(false);
            return
        }
        if (!usernameValid || !emailValid) {
            setShowModal(false);
            return
        }

        try {
            let response = await handleGetVerifyCode(username, email)
            if (response && response.errCode === 1) {
                setUsernameValid(false);
                setErrUsername(response.errMessage);
                setShowModal(false) 
            } else if (response && response.errCode === 2) {
                setEmailValid(false);
                setErrEmail(response.errMessage);
                setShowModal(false) 
            } else {
                alert(response.errMessage)
                setShowModal(true)
            }
        } catch (error) {
            console.log(error)
        }
    } 

    const handleCloseModal = () => setShowModal(false) 

    return(
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark back-ground" style={{ borderRadius: '1rem' }}>
                            <div className="card-body px-5 py-4">
                                <div className="mb-md-5 mt-md-4 forgot">
                                    <h2 className="fw-bold mb-5 text-uppercase text-center text-white">Forgot Password</h2>            
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-4">
                                            <input 
                                                type="text" 
                                                id="typeUsername" 
                                                name="username" 
                                                placeholder="Username" 
                                                className={`form-control form-control-lg input ${!usernameValid ? 'is-invalid' : ''}`}
                                                value={username} 
                                                onChange={handleOnChangeInput}
                                            />
                                            <label htmlFor="typeUsername">Username</label>
                                            <div className="error-message">
                                                {errUsername}
                                            </div>
                                        </div>
                                        <div className="d-flex mb-3 align-items-center">
                                            <div className="flex-grow-1 form-floating">
                                                <input 
                                                    type="text" 
                                                    id="typeEmail" 
                                                    name="email" 
                                                    placeholder="Email" 
                                                    className={`form-control form-control-lg input ${!emailValid ? 'is-invalid' : ''}`}
                                                    value={email} 
                                                    onChange={handleOnChangeInput}
                                                />
                                                <label htmlFor="typeUsername">Email</label>
                                                <div className="error-message">
                                                    {errEmail}
                                                </div>
                                            </div>
                                            <div className="ms-1" style={{ flexShrink: 0 }}>
                                                <button 
                                                    className="btn btn-lg custom-button" 
                                                    type="button"
                                                    onClick={handleSendCode}
                                                >Send Code
                                                </button>
                                            </div>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input 
                                                type="password"
                                                id="typePassword" 
                                                name="password"
                                                placeholder="Password"
                                                value={password} 
                                                className={`form-control form-control-lg input ${(!passwordValid ? 'is-invalid' : '')}`}
                                                onChange={handleOnChangeInput} 
                                            />
                                            <label htmlFor="typePpassword">Password</label>
                                            <div className="error-message">
                                                {errPassword}
                                            </div>
                                        </div>

                                        <div className="form-floating mb-2">
                                            <input 
                                                type="password" 
                                                id="confirmPassword" 
                                                name="confPass"
                                                placeholder="Confirm password"
                                                value={confPass} 
                                                className={`form-control form-control-lg input ${(!confPassValid ? 'is-invalid' : '')}`}
                                                onChange={handleOnChangeInput} 
                                            />
                                            <label htmlFor="confirmPassword">Confirm password</label>
                                            <div className="error-message">
                                                {errConfPass}
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex justify-content-center align-items-center pt-4 pb-2">
                                            <button className="btn btn-outline-light btn-lg px-5 text-center" type="submit">Submit</button>
                                        </div>  
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Verification Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating">
                        <input 
                            type="text" 
                            id="typeCode" 
                            name="code" 
                            placeholder="Verify code" 
                            className={`form-control form-control-lg input ${!codeValid ? 'is-invalid' : ''}`}
                            value={code} 
                            onChange={handleOnChangeInput}
                        />
                        <label htmlFor="typeCode">Verify code</label>
                        <div className="error-message">
                            {errCode}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCheckCode}>
                        Verify Code
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default ForgotPassword 
