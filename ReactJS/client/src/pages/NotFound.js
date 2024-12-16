import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import NotFound from '../components/NotFound';

const NotFoundPage = () => (

  <div className="not-found">
    <NavBar/>
    <NotFound/>
    <Footer/>
  </div>
);

export default NotFoundPage;