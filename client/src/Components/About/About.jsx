import React from 'react';
import { useAuth } from '../../ContextApi/auth';

function About() {
  const { user } = useAuth();

  // Handle loading or missing user data
  if (!user || !user.username) {
    return <div>Loading user...</div>;
  }

  // Capitalize first letter of username
  const capitalizedName =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);

  return (
    <div>
      Welcome, {capitalizedName}!
    </div>
  );
}

export default About;
