import React, { useState } from "react";
import API from "../apiconfig";
import { Navigate, useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import { CircularProgress } from "@mui/material";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginForm() {
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();

        console.log("Form data submitted:", formData);
        API.post('/login/', formData).then(res => {
            console.log(res.data)
            localStorage.setItem('auth', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('profile', JSON.stringify(res.data.profile))
            setLoading(false);


        }).then(() => {
            navigate('/dashboard')
        }).catch(err => {
            console.error('Status Code:', err.response.status);
            console.error('Response Data:', err.response.data);

        })
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
        backgroundColor: loading ? "#e1e1e1" : "#0073e6",
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
                {loading ? <CircularProgress size={20} /> : "Login"}
                </button>
                <button style={buttonStyle}>
                    Forgot Password?
                </button>
            </form>
            
        </div>
    );
}
