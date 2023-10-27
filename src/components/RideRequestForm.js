import React, { useState } from "react";
import API from "../apiconfig";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





export default function RideReqiestForm() {
    const [formData, setFormData] = useState({
        frequency: "",
        date: "",
        time: "",
        additional_info: "",
        rider: 5
    });

    const [open, setOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


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
        const user_id = JSON.parse(localStorage.getItem('user')).user_id
        e.preventDefault();

        API.get(`/users/${user_id}/`).then(res => {
            API.get('/profiles').then(res => {
                const profileID = res.data.filter(profile => profile.user === user_id).length > 0 ? res.data.filter(profile => profile.user === user_id)[0].id : null
                API.get('/profiles/riders/').then(res => {
                    const riderID = res.data.filter(rider => rider.profile === profileID).length > 0 ? res.data.filter(rider => rider.profile === profileID)[0].id : null
                    API.get('/posts').then((postsResponse) => {
                        for (const post of postsResponse.data) {
                            if (post.rider === riderID) {
                                console.log("Matching Post ID:", post.id);
                            }
                        }
                    })
                    API.post('/posts', {
                        frequency: formData.frequency,
                        date: formData.date,
                        time: formData.time,
                        additional_info: formData.additional_info,
                        rider: riderID
                    }).then((res) => {
                        console.log(res.data)
                        handleClick();
                    }).catch(error => {
                        console.error('Status Code:', error.response.status);
                        console.error('Response Data:', error.response.data);
                        setErrorOpen(true)
                    })
                })
            })
        })
    };

    return (

        <div style={containerStyle}>
            <h1 style={{ textAlign: "center" }}>Request a Ride</h1>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle} htmlFor="frequency">
                    Frequency:
                </label>
                <input style={inputStyle}
                    value={formData.frequency}
                    id="frequency"
                    name="frequency"
                    onChange={handleChange}
                    placeholder="Ex: Every other Wednesday"

                />
                <label style={labelStyle} htmlFor="date">
                    Date of pick-up:
                </label>
                <input
                    style={inputStyle}
                    id="date"
                    name="date"
                    value={formData.date}
                    type="date"
                    onChange={handleChange}
                    placeholder="Ex: Every Monday and Wednesday"
                />

                <label style={labelStyle} htmlFor="time">
                    Time of pick-up:
                </label>
                <input
                    type="time"
                    style={inputStyle}
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                />

                <label style={labelStyle} htmlFor="additional_info">
                    Additional Info:
                </label>
                <textarea
                    style={inputStyle}
                    id="additional_info"
                    name="additional_info"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>

                <button type="submit" style={buttonStyle}>
                    Request Ride
                </button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Request Created!
                </Alert>
            </Snackbar>

            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => {
                setErrorOpen(false)
            }}>
                <Alert onClose={() => {
                    setErrorOpen(false)
                }} severity="warning" sx={{ width: '100%' }}>
                    You havent been Verified as a driver yet!
                </Alert>
            </Snackbar>
        </div>
    );
}
