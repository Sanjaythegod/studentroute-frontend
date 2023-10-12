
import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import Chip from '@mui/material/Chip';


function generateColorFromInitial(initial) {
    // Define an array of possible colors
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33d1', '#33a5ff', '#ffc933'];

    // Use the ASCII value of the initial character to pick a color from the array
    const charCode = initial.charCodeAt(0);
    const colorIndex = charCode % colors.length;

    // Return the selected color
    return colors[colorIndex];
}

export default function DriverItem({userData, driverData}) {
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
                                        backgroundColor: generateColorFromInitial(driverData.first_name[0]),
                                    }}
                                    src={driverData.profile_picture_url}
                                >
                                    {driverData.first_name.charAt(0)}{driverData.last_name.charAt(0)}
                                </Avatar>
                            </Grid>

                            <Grid item xs={8}>
                                <Typography variant="h6" fontWeight="bold" style={{ color: 'black' }}>
                                    {driverData.first_name} {driverData.last_name}
                                </Typography>

                                <div style={{ marginBottom: "5px" }}>
                                    <Typography variant="body2" color="textSecondary" style={{ color: 'black' }}>
                                        {driverData.home_address}
                                        &nbsp;•&nbsp;
                                        {driverData.email}
                                    </Typography>
                                </div>

                                {/* <Divider /> */}
                            </Grid>

                            <Grid item xs>
                                {/* <Typography>
                                    {driverData.extra_info}
                                </Typography> */}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}