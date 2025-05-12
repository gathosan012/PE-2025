import React from "react";
import "../styling/components/signup.scss";

function SignUp({ text }) {
  return (
    <div className="signup-container">
      <form className="signup-inner">
        <span className="title">Register</span>
        <div className="fields-container">
          <input
            type="text"
            name="fullname"
            placeholder="Your fullname"
            required
          />
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Telephone number"
            required
          />
          <input type="text" name="province" placeholder="City" required />
          <input type="text" name="district" placeholder="Town" required />
          <input type="text" name="ward" placeholder="Ward" required />
          <input type="text" name="address" placeholder="Address" required />
        </div>
        <div className="divider"></div>
        <div className="submit-container">{text}</div>
      </form>
    </div>
  );
}

export default SignUp;
