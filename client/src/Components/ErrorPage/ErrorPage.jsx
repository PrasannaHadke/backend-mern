import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Oops! Page Not Found</h2>
      <p className="error-description">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn-home">Go Back Home</Link>
    </div>
  );
}

export default ErrorPage;
