import React, { useState } from "react";

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        homeAddress: "",
        school: "",
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
        height: "100vh",
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
                <h2 style={{ textAlign: "center" }}>Sign up</h2>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="John"
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="Doe"
                    />
                </div>
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
                        placeholder="example@domain.com"
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
                <div>
                    <label htmlFor="homeAddress">Home Address:</label>
                    <input
                        type="text"
                        id="homeAddress"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="1234 Elk Wood Ln."
                    />
                </div>
                <div>
                    <label htmlFor="school">School:</label>
                    <input
                        type="text"
                        id="school"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="Name of student's school"
                    />
                </div>
                <label>
                    <input type="checkbox" name="becomeDriver" value="yes"/>
                    Yes, I want to become a driver
                </label>
                <button type="submit" style={buttonStyle}>
                    Sign up
                </button>
            </form>
        </div>
    );
}
