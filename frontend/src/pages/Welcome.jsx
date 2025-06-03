import React from "react";
import "../styling/welcome.scss";
import { useNavigate } from "react-router";

const Welcome = () => {
    const navigate = useNavigate()

    return (
        <div className="wrapper">
            <div className="login-box">
                <h1>Welcome to our project</h1>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    )

}

export default Welcome