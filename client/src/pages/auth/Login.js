import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { handleLoginApi } from '../../services/userService';
import './Form.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isValidP, setIsValidP] = useState(true);
    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        // Validate email and password
        if (email.trim() === '') {
            setErrEmail('Email is required');
            return;
        }

        if (password.trim() === '') {
            setIsValidP(false);
            setErrPassword('Password is required');
            return;
        }

        try {
            const response = await handleLoginApi(email, password);  // Send email and password
            console.log('API response:', response);

            if (response.errCode === 0) {
                const { token, user } = response;
                if (token && user) {
                    console.log('Login successful:', token, user);

                    // Check roleId and assign role
                    if (user.roleId === 1) {
                        console.log('User is an admin');
                        localStorage.setItem('userRole', 'admin');
                        navigate('/admin-dashboard'); 
                    } else {
                        console.log('User is a customer');
                        localStorage.setItem('userRole', 'customer');
                        navigate('/customer-dashboard');  
                    }

                    login(token, user);
                    alert(response.errMessage);
                } else {
                    throw new Error('Invalid response: missing token or user');
                }
            } else if (response.errCode === 3) {
                setIsValidP(false);
                setErrPassword(response.errMessage);
            } else {
                console.error('Unhandled API error:', response);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleOnChangeInput = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
            if (value.trim() !== '') {
                setErrEmail('');
            }
        } else if (name === 'password') {
            setPassword(value);
            if (value.trim() !== '') {
                setIsValidP(true);
                setErrPassword('');
            }
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark back-ground" style={{ borderRadius: '1rem' }}>
                            <div className="card-body px-5 py-4">
                                <div className="mb-md-5 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase text-center text-white">Login</h2>
                                    <p className="text-white-50 mb-5 text-center">Please enter your email and password!</p>

                                    <form onSubmit={handleLogin}>
                                        {/* Email field */}
                                        <div className="form-floating mb-4">
                                            <input 
                                                type="email" 
                                                id="typeEmail" 
                                                name="email" 
                                                placeholder="Email" 
                                                className="form-control form-control-lg input"
                                                value={email} 
                                                onChange={handleOnChangeInput}
                                            />
                                            <label htmlFor="typeEmail">Email</label>
                                            <div className="error-message">
                                                {errEmail}
                                            </div>
                                        </div>
                                        <div className="form-floating mb-4 position-relative">
                                            <input 
                                                type={showPassword ? "text" : "password"} 
                                                id="typePassword" 
                                                name="password" 
                                                placeholder="Password" 
                                                className="form-control form-control-lg input" 
                                                style={{ borderColor: (isValidP ? '' : 'red') }}
                                                value={password} 
                                                onChange={handleOnChangeInput}
                                            />
                                            <label htmlFor="typePassword">Password</label>
                                            <i
                                                className={"fa " + (showPassword ? "fa-eye" : "fa-eye-slash") + " position-absolute"}
                                                style={{ top: '23px', right: '10px', cursor: 'pointer', opacity: '0.7'}}
                                                onClick={handleShowPassword}
                                            ></i>
                                            <div className="error-message">
                                                {errPassword}
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end mb-4">
                                            <Link to="/reset-password" className="small mb-2 pb-lg-2 forgot">Forgot password?</Link>
                                        </div>

                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-outline-light btn-lg px-5 text-center" type="submit">Login</button>
                                        </div>
                                    </form>

                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                    </div> 
                                </div>

                                <div>
                                    <p className="mb-0 text-center text-white">Don't have an account? <a href="/register" className="text-white-50 fw-bold"><u>Sign Up</u></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
