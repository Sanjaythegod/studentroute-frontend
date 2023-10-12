import React, { useState } from "react";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here, e.g., sending data to a server or handling it in-app.
        console.log("Form data submitted:", formData);
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
    };

    const formStyle = {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        width: "100%",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "10px 0",
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "#0073e6",
        color: "white",
        fontSize: "18px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>Login</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <button type="submit" style={buttonStyle}>
                    Login
                </button>
                <button style={buttonStyle}>
                    Forgot Password?
                </button>
            </form>
        </div>
    );
}
