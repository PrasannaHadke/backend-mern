import React, { useEffect, useState } from "react";
import "./Contact.css";
import { useAuth } from "../../ContextApi/auth";
import axios from "axios";

function Contact() {
  const { user } = useAuth();
  console.log("contact user" , user);
  const [contactedUser, setContactedUser] = useState({
    username: "",
    email: "",
    message: "",
  });
  // console.log("contact user",contactedUser);
  // ✅ Prefill user data once when user is available
  useEffect(() => {
    if (user) {
      setContactedUser((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContactedUser({
      ...contactedUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/form/contact",
        contactedUser,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Message sent successfully!");
        setContactedUser({
          username: user?.username || "",
          email: user?.email || "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            required
            value={contactedUser.username}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            required
            value={contactedUser.email}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Write your message here..."
            value={contactedUser.message}
            onChange={handleInput}
          />
        </div>

        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
