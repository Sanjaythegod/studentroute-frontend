import React, { useState } from "react";
import API from '../apiconfig'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        is_active: true
    });
    const [profileData, setProfileData] = useState({
        address: "",
        school: "",
        user: null
    });
    const [riderData, setRiderData] = useState({
        profile: null,
        driver: null
    })

    const [driverData, setDriverData] = useState({
        profile: null,
        approved: false
    })

    const [driverChecked, setDriverChecked] = useState(false)

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here, e.g., sending data to a server or handling it in-app.
        console.log("userData data submitted:", userData);
        console.log("Profile data submitted:", profileData);

        API.post('/users', userData)
            .then((res) => {
                console.log('result from creating a user', res.data);
                const updatedProfile = { ...profileData, user: res.data.id };
                API.post('/profiles', updatedProfile)
                    .then((res) => {
                        console.log('result from creating a profile', res.data);
                        const updatedRider = { ...riderData, profile: res.data.id }
                        const updatedDriver = { ...driverData, profile: res.data.id }
                        //Diffrent endpoints if the user wants to become a driver or rider
                        if (driverChecked) {
                            API.post('/profiles/drivers/', updatedDriver).then((res) => {
                                console.log('result from creating a driver', res.data);
                                navigate('/login')
                            }).catch(err => {
                                console.error('Status Code profile:', err.response.status);
                                console.error('Response Data profile:', err.response.data);
                                setOpen(true)
                            })
                        } else {
                            API.post('/profiles/riders/', updatedRider).then((res) => {
                                console.log('result from creating a rider', res.data);
                                navigate('/login')
                            }).catch(err => {
                                console.error('Status Code profile:', err.response.status);
                                console.error('Response Data profile:', err.response.data);
                                setOpen(true)
                            })
                        }
                    }).catch((err) => {
                        console.error('Status Code profile:', err.response.status);
                        console.error('Response Data profile:', err.response.data);
                        setOpen(true)
                    });
            })
            .catch((err) => {
                console.error('Status Code:', err.response.status);
                console.error('Response Data:', err.response.data);
                setOpen(true)

            });

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
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleUserChange}
                        required
                        style={inputStyle}
                        placeholder="John"
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleUserChange}
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
                        value={userData.email}
                        onChange={handleUserChange}
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
                        value={userData.password}
                        onChange={handleUserChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="address">Home Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        required
                        style={inputStyle}
                        placeholder="1234 Elk Wood Ln."
                    />
                </div>
                <div>
                    <label htmlFor="school">School:</label>
                    {/* <select
                        id="school"
                        name="school"
                        value={profileData.school}
                        onChange={handleProfileChange}
                        required
                        style={inputStyle}
                    >
                        <option value="">Select a school</option>
                        <option value="Westview High School">Westview High School</option>
                        <option value="Del Norte High School">Del Norte High School</option>
                        <option value="Mount Carmel High School">Mount Carmel High School</option>
                    </select> */}
                    <input 
                        style={inputStyle}
                        required
                        onChange={handleProfileChange}
                        value={profileData.school}
                        id="school"
                        name="school"
                    />
                </div>

                <label>
                    <input type="checkbox" name="becomeDriver" value="yes" onChange={(event) => {
                        setDriverChecked(event.target.checked)
                    }} />
                    Yes, I want to become a driver
                </label>
                <button type="submit" style={buttonStyle}>
                    Sign up
                </button>
            </form>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => {
                setOpen(false)
            }}>
                <Alert onClose={() => {
                    setOpen(false)
                }} severity="error" sx={{ width: '100%' }}>
                    Email already taken
                </Alert>
            </Snackbar>
        </div>


    );
}
