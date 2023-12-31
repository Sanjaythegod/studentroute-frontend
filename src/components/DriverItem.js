import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import { Snackbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CancelIcon from '@mui/icons-material/Cancel';
import Chip from '@mui/material/Chip';
import API from '../apiconfig'
import MuiAlert from '@mui/material/Alert';





export const generateRandomColor = (firstName) => {
    const firstLetter = firstName.charAt(0).toLowerCase();
    const letterCode = firstLetter.charCodeAt(0) - 97; 

    const r = (letterCode * 7) % 256;
    const g = (letterCode * 13) % 256;
    const b = (letterCode * 19) % 256;

    return `rgb(${r}, ${g}, ${b})`;
};

export function generateColorFromInitial(initial) {

    const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33d1', '#33a5ff', '#ffc933', "#FF5733", "#2AB3A6", "#C17A97", "#6EC4E8", "#A9D06E", "#F694C1", "#9F53C8", "#E1B135", "#4D9E66", "#EC7A44",];


    const charCode = initial.charCodeAt(0);
    const colorIndex = charCode % colors.length;


    return colors[colorIndex];
}

export default function DriverItem({ data }) {
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    //null Driver
    const cancelRide = () => {
        API.put(`/profiles/riders/${data.riders.id}/`, {
            profile: data.profiles.id,
            driver: null
        }).then(res => {
            console.log(res.data)
            setOpen(true)
        })
    }

    useEffect(() => {
        console.log('data from driverIte',data)
    })

    return (
        <div>
            <Grid container spacing={2} style={{ maxWidth: "95%", marginTop: "auto", }}>
                <Grid item xs={12}>
                    <Paper elevation={1} style={{
                        padding: "20px",
                        backgroundColor: 'white',
                        borderRadius: "20px",
                        border: "none",
                        transition: "border 0.1s", 
                    }}

                    >
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                {data.driverUser.first_name ?
                                    <Avatar
                                        sx={{
                                            width: "100px",
                                            height: "100px",
                                            fontSize: "36px",
                                            backgroundColor: generateColorFromInitial(data.driverUser.first_name),
                                        }}
                                    >
                                        {data.driverUser.first_name.charAt(0)}{data.driverUser.last_name.charAt(0)}
                                    </Avatar> :
                                    <Avatar sx={{
                                        width: "100px",
                                        height: "100px",
                                    }} />
                                }

                            </Grid>
                            
                            <Grid item xs={8}>
                                {data.user.id === JSON.parse(localStorage.getItem('user')).user_id ?
                                    <Chip
                                        label="End Ride"
                                        onClick={cancelRide}
                                        icon={<CancelIcon />}
                                        color="error" variant={hover ? 'solid' : 'outlined'}
                                        onMouseEnter={() => {
                                            setHover(true)
                                        }}
                                        onMouseLeave={() => {
                                            setHover(false)
                                        }}
                                    /> : null
                                }

                                <Typography variant="h6" fontWeight="bold" style={{ color: 'black' }}>
                                    {data.driverUser.first_name} {data.driverUser.last_name}
                                </Typography>

                                <div style={{ marginBottom: "5px" }}>
                                    <Typography variant="body2" color="textSecondary" style={{ color: 'black' }}>
                                        Contact: {data.driverUser.email}
                                        &nbsp;•&nbsp;
                                        Address: {data.driverProfile.address}
                                        &nbsp;•&nbsp;
                                        School: {data.driverProfile.school}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => {
                setOpen(false)
            }}>
                {/*sucess = green*/}
                <Alert onClose={() => {
                setOpen(false)
                }} severity="success" sx={{ width: '100%' }}>
                    Ride Ended! Have a Great Day 😀
                </Alert>
            </Snackbar>
        </div>
    )
}
