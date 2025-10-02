import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import {useNavigate} from 'react-router-dom'
function Signup() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      user, // ✅ send user data here
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("res.data",response);
    console.log("res.data",response.data);
    console.log("res.data",response.data.token);
    if (response.ok) {
      // alert("User registered successfully!");
      let res_data = response.data.token
      // store token in local storage
      // storeTokenInLs(response.data.token)
      localStorage.setItem("token",res_data)
      setUser({ username: "", email: "", phone: "", password: "" });
      navigate('/')
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.msg || "Error registering user");
    } else {
      alert("Server error, try again later.");
    }
    console.log("Register error:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="signup-container">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleInput}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleInput}
          required
        />

        <label htmlFor="phone">Number:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={user.phone}
          onChange={handleInput}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleInput}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
