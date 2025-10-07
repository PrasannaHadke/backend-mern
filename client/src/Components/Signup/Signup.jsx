import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextApi/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        storeTokenInLs(response.data.token);
        toast.success("User registered successfully!");
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      const errorsArray = error.response?.data?.errors;

      if (errorsArray && errorsArray.length > 0) {
        // Show each Zod error as a toast
        errorsArray.forEach((err) => toast.error(err));
      } else {
        toast.error(error.response?.data?.message || "Server error");
      }

      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInput}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInput}
          required
        />

        <label>Number:</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleInput}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInput}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Signup;
