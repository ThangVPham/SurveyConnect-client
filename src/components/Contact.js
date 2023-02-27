import React from "react";
import Nav from "./Nav";
import "./Contact.css";
import contactImage from "../assets/contactform.gif";

const Contact = () => {
  return (
    <div>
      <Nav />
      <div className="form__container">
        <img className="contact-gif" src={contactImage} alt="contact-img" />
        <form className="form">
          <input
            name="name"
            type="text"
            className="feedback-input"
            placeholder="Name"
          />
          <input
            name="email"
            type="text"
            className="feedback-input"
            placeholder="Email"
          />
          <textarea
            name="text"
            className="feedback-input"
            placeholder="Comment"
          ></textarea>
          <input type="submit" value="SUBMIT" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
