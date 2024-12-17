import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const NotFound = () => (

  <div className="not-found">
    <img
        src={`${process.env.PUBLIC_URL}/Error.png`}
        alt="not-found"
        style={{maxWidth: '100%'}}/>
  </div>
);

export default NotFound;