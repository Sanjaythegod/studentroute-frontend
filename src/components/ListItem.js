import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import { Divider, Box, Modal, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import Chip from '@mui/material/Chip';
import API from '../apiconfig'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const generateRandomColor = (firstName) => {
    const firstLetter = firstName.charAt(0).toLowerCase();
    const letterCode = firstLetter.charCodeAt(0) - 97; // ASCII code for 'a' is 97

    const r = (letterCode * 7) % 256;
    const g = (letterCode * 13) % 256;
    const b = (letterCode * 19) % 256;

    return `rgb(${r}, ${g}, ${b})`;
};



export function generateColorFromInitial(initial) {
    // Define an array of possible colors
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33d1', '#33a5ff', '#ffc933'];

    // Use the ASCII value of the initial character to pick a color from the array
    const charCode = initial.charCodeAt(0);
    const colorIndex = charCode % colors.length;

    // Return the selected color
    return colors[colorIndex];
}

export default function ({ isDriver, driverID, apiData, profileId }) {

    const [hover, setHover] = useState(false);
    const [openmodal, setOpenModal] = React.useState(false);
    const [open, setOpen] = useState(false)
    const [driverOpen, setDriverOpen] = useState(false)
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('data from listItem API', apiData)
        console.log(!!driverID)
    })

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const driveRider = () => {
        console.log(apiData.riders.id)
        API.put(`/profiles/riders/${apiData.riders.id}/`, {
            profile: apiData.profiles.id,
            driver: driverID
        }).then((res) => {
            console.log(res.data)
            setDriverOpen(true)
        })
    }

    const becomeDriver = () => {
        API.post('/profiles/drivers/', {
            profile: profileId,
            approved: false
        }).then(res => {
            console.log('response from making a driver request', res.data)
        }).catch(error => {
            setOpen(true)

        })
    }
    return (
        <div>
            <Grid container spacing={2} style={{ maxWidth: "95%", marginTop: "auto", }}>
                <Grid item xs={12}>
                    <Paper elevation={1} style={{
                        padding: "20px",
                        backgroundColor: 'white',
                        // boxShadow: "10px 4px 18px rgb(213 235 234)",
                        borderRadius: "20px",
                        border: "none", // Add border when selected
                        transition: "border 0.1s", // Add smooth transition effect
                    }}

                    >
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                {apiData.user.first_name ?
                                    <Avatar
                                        sx={{
                                            width: "100px",
                                            height: "100px",
                                            fontSize: "36px",
                                            backgroundColor: generateColorFromInitial(apiData.user.first_name),
                                        }}
                                    >
                                        {apiData.user.first_name.charAt(0)}{apiData.user.last_name.charAt(0)}
                                    </Avatar> :
                                    <Avatar sx={{
                                        width: "100px",
                                        height: "100px",
                                    }} />
                                }

                            </Grid>

                            <Grid item xs={8}>
                                <Typography variant="subtitle1" color="primary">
                                    {
                                        apiData.user.id != JSON.parse(localStorage.getItem('user')).user_id ? (
                                            isDriver ? (
                                                <Chip
                                                    label="Drive this rider"
                                                    onClick={driveRider}
                                                    icon={<DriveEtaIcon />}
                                                    color="success"
                                                    variant={hover ? 'solid' : 'outlined'}
                                                    onMouseEnter={() => {
                                                        setHover(true);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setHover(false);
                                                    }}
                                                />
                                            ) : (
                                                !!driverID ? null:
                                                <Typography variant="h8" style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleOpen}>
                                                    Want to drive? Click here to become a driver
                                                </Typography>
                                            )
                                        ): null
                                    }



                                </Typography>
                                <Typography variant="h6" fontWeight="bold" style={{ color: 'black' }}>
                                    {apiData.user.first_name} {apiData.user.last_name}
                                </Typography>

                                <div style={{ marginBottom: "5px" }}>
                                    <Typography variant="body2" color="textSecondary" style={{ color: 'black' }}>
                                        {apiData.posts.time}
                                        &nbsp;•&nbsp;
                                        {apiData.posts.date}
                                        &nbsp;•&nbsp;
                                        {apiData.posts.frequency}
                                    </Typography>
                                </div>

                                <Divider />

                                <Typography variant="body2" sx={{ color: "rgb(0,0,0)", marginY: "7px" }}>
                                    {apiData.profiles.address}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#2376d2", marginY: "7px" }}>
                                    Contact: {apiData.user.email}
                                </Typography>
                            </Grid>

                            <Grid item xs>
                                <Typography>
                                    {apiData.posts.additional_info}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Modal
                open={openmodal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Become a Driver?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Make a new account as a driver?
                    </Typography>
                    <Button variant="outlined" sx={{ marginTop: '10px' }} onClick={() => {
                        handleClose();
                        navigate('/signup')
                    }}>Continue to Sign up</Button>
                </Box>
            </Modal>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => {
                setOpen(false)
            }}>
                <Alert onClose={() => {
                setOpen(false)
                }} severity="error" sx={{ width: '100%' }}>
                    You have already submitted a request
                </Alert>
            </Snackbar>

            <Snackbar open={driverOpen} autoHideDuration={6000} onClose={() => {
                setDriverOpen(false)
            }}>
                <Alert onClose={() => {
                setDriverOpen(false)
                }} severity="success" sx={{ width: '100%' }}>
                    You are now driving {apiData.user.first_name} {apiData.user.last_name}
                </Alert>
            </Snackbar>
        </div>
    )
}
