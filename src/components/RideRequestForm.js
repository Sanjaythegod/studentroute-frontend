import React, { useState } from "react";

export default function RideReqiestForm() {
    const [formData, setFormData] = useState({
        frequency: "daily",
        date: "",
        time: "",
        message: "",
    });

    const containerStyle = {
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f2f2f2",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
    };

    const labelStyle = {
        display: "block",
        margin: "10px 0",
        fontSize: "14px",
        fontWeight: "bold",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
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
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here for form submission
        console.log("Form data submitted:", formData);
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ textAlign: "center" }}>Request a Ride</h1>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle} htmlFor="frequency">
                    Frequency:
                </label>
                <input style={inputStyle}/>

                <label style={labelStyle} htmlFor="date">
                    Date:
                </label>
                <input
                    style={inputStyle}
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Ex: Every Monday and Wednesday"
                />

                <label style={labelStyle} htmlFor="time">
                    Time:
                </label>
                <input
                    type="time"
                    style={inputStyle}
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                />

                <label style={labelStyle} htmlFor="message">
                    Additional Info:
                </label>
                <textarea
                    style={inputStyle}
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>

                <button type="submit" style={buttonStyle}>
                    Request Ride
                </button>
            </form>
        </div>
    );
}
