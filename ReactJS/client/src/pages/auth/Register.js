import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { handleRegisterApi, handleLoginApi } from '../../services/userService'
import './Form.scss'

const Register = () => {
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)

    const [usernameValid, setUsernameValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    const [fullnameValid, setFullnameValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)
    const [confPassValid, setConfPassValid] = useState(true)
    const [termValid, setTermValid] = useState(true)

    const [errUsername, setErrUsername] = useState('')
    const [errFullname, setErrFullname] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [errPassword, setErrPassword] = useState('')
    const [errConfPass, setErrConfPass] = useState('')

    const { login } = useContext(AuthContext)
    
    const handleRegister = async (event) => {
        event.preventDefault()

        if (username.trim() === '') {
            setUsernameValid(false)
            setErrUsername('Please enter your username')
            return
        }

        if (firstname.trim() === '' || lastname.trim() === '') {
            setFullnameValid(false)
            setErrFullname('Please enter your name')
            return
        }

        if (email.trim() === '') {
            setEmailValid(false)
            setErrEmail('Please enter your email')
            return
        }

        if (password.trim() === '') {
            setPasswordValid(false)
            setErrPassword('Please enter your password')
            return
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

        if (!agreeTerms) {
            setTermValid(false)
            return
        }

        const userData = {
            username,
            firstname,
            lastname,
            email,
            password,
        }

        try {
            let response = await handleRegisterApi(userData)
            console.log(response)
            
            if (response && response.errCode === 1) {
                setUsernameValid(false)
                setErrUsername(response.errMessage)
            } else if (response && response.errCode === 0) {
                let loginResponse = await handleLoginApi(username, password)
                console.log(loginResponse)
                if (loginResponse && loginResponse.errCode === 0) {
                    const { token, user } = loginResponse;
                    login(token, user)
                    window.history.back()
                    alert(response.errMessage)
                }
            }
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
            case 'firstname':
            case 'lastname':
                if (name === 'firstname') setFirstname(value)
                if (name === 'lastname') setLastname(value)
                setFullnameValid(true)
                setErrFullname('')
                break
            case 'email':
                setEmail(value)
                setEmailValid(true)
                setErrEmail('')
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

    const handleCheckboxChange = (event) => {
        setAgreeTerms(event.target.checked)
        setTermValid(true)
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark back-ground" style={{ borderRadius: '1rem' }}>
                            <div className="card-body px-5 py-4 back-ground-2">
                                <div className="mb-md-3">
                                    <h2 className="fw-bold mb-2 text-uppercase text-center text-white">Register</h2>
                                    <p className="text-white-50 mb-4 text-center">Please enter your details to register!</p>

                                    <form onSubmit={handleRegister}>
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                id="typeUsername" 
                                                name="username" 
                                                placeholder="Username" 
                                                className={`form-control form-control-lg input ${(!usernameValid ? 'is-invalid' : '')}`}
                                                value={username} 
                                                onChange={handleOnChangeInput}
                                            />
                                            <label htmlFor="typeUsername">Username</label>
                                            <div className="error-message">
                                                {errUsername}
                                            </div>
                                        </div>

                                        <div className="row position-relative mb-3">
                                            <div className='col-md-6'>
                                                <div className="form-floating">
                                                    <input 
                                                        type="text" 
                                                        id="typeFirstname" 
                                                        name="firstname" 
                                                        placeholder="First name" 
                                                        className={`form-control form-control-lg input ${(!fullnameValid ? 'is-invalid' : '')}`}
                                                        value={firstname} 
                                                        onChange={handleOnChangeInput} 
                                                    />
                                                    <label htmlFor="typeFirstname">First name</label>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='form-floating'>
                                                    <input 
                                                        type="text" 
                                                        id="typeLastname" 
                                                        name="lastname" 
                                                        placeholder="Last name" 
                                                        className={`form-control form-control-lg input ${(!fullnameValid ? 'is-invalid' : '')}`}
                                                        value={lastname} 
                                                        onChange={handleOnChangeInput} 
                                                    />
                                                    <label htmlFor="typeLastname">Last name</label>
                                                </div>
                                            </div>
                                            <div className="error-message">
                                                {errFullname}
                                            </div>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input 
                                                type="email" 
                                                id="typeEmail"
                                                name="email"
                                                placeholder="Email" 
                                                value={email} 
                                                onChange={handleOnChangeInput} 
                                                className={`form-control form-control-lg input ${(!emailValid ? 'is-invalid' : '')}`}
                                            />
                                            <label htmlFor="typeEmail">Email</label>
                                            <div className="error-message">
                                                {errEmail}
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
                                        
                                        <div className="mb-4">
                                            <input 
                                                type='checkbox' 
                                                id="terms"
                                                className='mx-2 form-check-input'
                                                onChange={handleCheckboxChange}/>
                                            <label htmlFor="terms" className={`form-check-label terms ${(!termValid ? 'text-danger' : 'text-white-50')}`}>
                                                I agree to the <u className='fw-bold'>Terms & Conditions</u>
                                            </label>
                                        </div>
                                        
                                        <div className="d-flex justify-content-center align-items-center pt-2">
                                            <button className="btn btn-outline-light btn-lg px-5 text-center" type="submit">Register</button>
                                        </div>                                       
                                    </form>
                                </div>

                                <div>
                                    <p className="mb-0 text-center text-white">Have an account? <a href="/login" className="text-white-50 fw-bold"><u>Sign In</u></a></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
