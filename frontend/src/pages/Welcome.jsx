import React from "react";
import "../styling/welcome.scss";
import { useNavigate } from "react-router";

const Welcome = () => {
    const navigate = useNavigate()

    return (
        <div className="wrapper">
            <div className="login-box">
                <button onClick={() => navigate('/register')}>Sign Up</button>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
            <div className="title-box">
                <h1>Apartment Management</h1>
            </div>
        </div>
    )

}

export default Welcome