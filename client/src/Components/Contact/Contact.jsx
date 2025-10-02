import React, { useState } from 'react'
import "./Contact.css"

function Contact() {
  const [contactedUser , setContactedUser] = useState({
    "username" :"",
    "email" : "",
    "message" : ""
  })

  const handleInput = (e)=>{
    const {name , value} = e.target;
    setContactedUser({
      ...contactedUser,
      [name] : value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(contactedUser);
  }

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
            placeholder='username'
            required
            value={contactedUser.username}
            onChange={handleInput} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="text"
            name="email"
            id="email"
            placeholder='email'
            required
            value={contactedUser.email}
            onChange={handleInput} />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            name="message" 
            id="message" 
            placeholder='Write your message here...'
            value={contactedUser.message}
            onChange={handleInput} />
        </div>

        <button className="btn-submit" type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Contact
