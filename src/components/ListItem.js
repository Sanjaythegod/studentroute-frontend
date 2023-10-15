import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import Chip from '@mui/material/Chip';


export const generateRandomColor = (firstName) => {
    const firstLetter = firstName.charAt(0).toLowerCase();
    const letterCode = firstLetter.charCodeAt(0) - 97; // ASCII code for 'a' is 97

    const r = (letterCode * 7) % 256;
    const g = (letterCode * 13) % 256;
    const b = (letterCode * 19) % 256;

    return `rgb(${r}, ${g}, ${b})`;
};

function generateColorFromInitial(initial) {
    // Define an array of possible colors
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33d1', '#33a5ff', '#ffc933'];

    // Use the ASCII value of the initial character to pick a color from the array
    const charCode = initial.charCodeAt(0);
    const colorIndex = charCode % colors.length;

    // Return the selected color
    return colors[colorIndex];
}

export default function ({ data, userData, apiData }) {

    const [hover, setHover] = useState(false);

    useEffect(() => {
        console.log('data from listItem',data)
        console.log('data from listItem API',apiData)

    })
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
                                <Avatar
                                    sx={{
                                        width: "100px",
                                        height: "100px",
                                        fontSize: "36px",
                                        backgroundColor: generateColorFromInitial(apiData.user.first_name),
                                    }}
                                    src={apiData.profile_picture_url}
                                >
                                    {apiData.user.first_name.charAt(0)}{apiData.user.last_name.charAt(0)}
                                </Avatar>
                            </Grid>

                            <Grid item xs={8}>
                                <Typography variant="subtitle1" color="primary">
                                {userData.driver_status ? <Chip
                                        label="Drive this rider"
                                        onClick={() => {console.log("hi")}}
                                        icon={<DriveEtaIcon />}
                                        color="success" variant= {hover ? 'solid' : 'outlined' }
                                        onMouseEnter={() => {
                                            setHover(true)
                                        }}
                                        onMouseLeave={() => {
                                            setHover(false)
                                        }}
                                /> : 
                                    <Typography variant="h8" style={{textDecoration: 'underline', cursor: 'pointer'}}>Want to drive? Click here to become a driver</Typography>
                                }
                            
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" style={{ color: 'black' }}>
                                    {apiData.user.first_name} {apiData.user.last_name}
                                </Typography>

                                <div style={{ marginBottom: "5px" }}>
                                    <Typography variant="body2" color="textSecondary" style={{ color: 'black' }}>
                                        {apiData.posts[0].time}
                                        &nbsp;•&nbsp;
                                        {apiData.posts[0].date}
                                        &nbsp;•&nbsp;
                                        {apiData.posts[0].frequency}
                                    </Typography>
                                </div>

                                <Divider />

                                <Typography variant="body2" sx={{ color: "rgb(0,0,0)", marginY: "7px" }}>
                                    {apiData.profile.address}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#2376d2", marginY: "7px" }}>
                                    Contact: {apiData.user.email}
                                </Typography>
                            </Grid>

                            <Grid item xs>
                                <Typography>
                                    {apiData.posts[0].additional_info}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
