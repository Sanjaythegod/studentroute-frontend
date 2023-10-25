import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CancelIcon from '@mui/icons-material/Cancel';
import Chip from '@mui/material/Chip';
import API from '../apiconfig'



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

export default function RiderItem({ data }) {
    const [hover, setHover] = useState(false);


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

                                <Typography variant="h6" fontWeight="bold" style={{ color: 'black' }}>
                                    {data.driverUser.first_name} {data.driverUser.last_name}
                                </Typography>

                                <div style={{ marginBottom: "5px" }}>
                                    <Typography variant="body2" color="textSecondary" style={{ color: 'black' }}>
                                        Contact: {data.driverUser.email}
                                        &nbsp;•&nbsp;
                                        Address: {data.driverProfiles.address}
                                        &nbsp;•&nbsp;
                                        School: {data.driverProfiles.school}
                                        <br />
                                        Additional Details: {data.driverPosts.additional_info}
                                        <br />
                                        Pick up time : {data.driverPosts.time}
                                        <br />
                                        Pick up frequency : {data.driverPosts.frequency}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
