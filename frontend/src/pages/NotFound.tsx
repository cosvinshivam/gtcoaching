import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1 className="h1">404</h1>
          <h2 className="h2">Page not found</h2>
          <p className="p-large">Oops! The page you are looking for doesn't exist or has been moved.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn-black-v2">
              <Home size={20} />
              Back to Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-outline">
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
