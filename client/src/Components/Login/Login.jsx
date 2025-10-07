import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextApi/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserSignIn({
      ...userSignIn,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        userSignIn,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        storeTokenInLs(token);
        setUserSignIn({ email: "", password: "" });
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        const message =
          error.response.data?.message ||
          error.response.data.errors[0]?.join(", ") ||
          "Error signing in user";
          console.log(message);
        toast.error(message);
      } else {
        toast.error("Server error, try again later");
      }
      console.error("Login error:", error.response.data.errors[0]);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            onChange={handleInput}
            value={userSignIn.email}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            onChange={handleInput}
            value={userSignIn.password}
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>

      {/* ToastContainer renders the toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default Login;
