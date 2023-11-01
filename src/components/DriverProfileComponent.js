import React, { useEffect, useState } from "react";
import API from "../apiconfig";
import { Avatar, CircularProgress, LinearProgress, Typography, Grid } from "@mui/material";
import { generateColorFromInitial } from "./ListItem";
import userData from '../data/userData.json'
import ListItem from "../components/ListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ListItemMobile from "../components/ListItemMobile";
import RiderItem from "./RiderItem";
import RiderItemMobile from "./RiderItemMobile";


export default function DriverProfileComponent({ id }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [driver, setDriver] = useState(null)

    const [loading, setLoading] = useState(true)
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up("md"));


    const [driverPosts, setDriverPosts] = useState([]);
    const [driverUser, setDriverUser] = useState([]);
    const [driverProfiles, setDriverProfiles] = useState([]);




    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '75px'
    };



    const nameStyle = {
        fontSize: '30px',
        fontWeight: 'bold',
        margin: '10px 0',
    };

    const textStyle = {
        fontSize: '16px',
        margin: '5px 0',
    };


    

    useEffect(() => {
        API.get(`/users/${id}`).then(res => {
            setUser(res.data)
            const userId = res.data.id
            API.get('/profiles').then(res => {
                setProfile(res.data.filter((profile) => profile.user === userId)[0]);
                const profileId = res.data.filter((profile) => profile.user === userId)[0].id
                API.get('/profiles/drivers/').then((res) => {
                    setDriver(res.data.filter((driver) => driver.profile === profileId))
                    const driverId = res.data.filter((driver) => driver.profile === profileId)[0].id
                    console.log('driverid', driverId)

                    //Check if the User is Driver
                    if (driverId) {
                        API.get('/profiles/riders/').then(res => {
                            const riderId = res.data.filter((rider) => rider.driver === driverId)
                            const riderProfile = res.data.filter((rider) => rider.driver === driverId)
                            console.log('rider id', riderProfile)
                            console.log(riderId)

                            //0th array is to set which riders the driver is driving
                            if (riderId[0] && riderProfile[0]) {
                                API.get('/posts').then(res => {
                                    setDriverPosts(res.data.filter((post) => post.rider === riderId[0].id)[0])
                                    console.log('Driver posts', res.data.filter((post) => post.rider === riderId[0].id)[0])
                                })

                                API.get(`/profiles/${riderProfile[0].profile}`).then(res => {
                                    setDriverProfiles(res.data)
                                    API.get(`/users/${res.data.user}`).then(res => {
                                        setDriverUser(res.data)
                                    }).then(() => {
                                        console.log('final')
                                        //may be null, first check if they exist usng conditional rendering
                                        console.log('DRIVERPOST', driverPosts)
                                        console.log('DRIVERUSER', driverUser)
                                        console.log('DRIVERPROFILE', driverProfiles)

                                    })
                                })
                            }


                        })
                    }
                }).then(() => {
                    setLoading(false)
                })
            })
        })
    }, [])




    






    return (
        <div style={containerStyle}>
            {loading ? (
                <LinearProgress />
            ) : (
                <div>
                    <Grid container>
                        <Grid item xs={desktop ? 4 : 12} style={{ textAlign: "center", marginTop: '30px' }}>
                            <Typography sx={nameStyle}>
                                {user.first_name} {user.last_name}
                            </Typography>
                            <Typography sx={textStyle}>Email: {user.email}</Typography>
                            <Typography sx={textStyle}>Account Type: Driver</Typography>
                        </Grid>
                        <Grid item xs={desktop ? 8 : 12} style={{ marginTop: '30px' }}>
                            
                            {driverUser.length > 0 && driverPosts && driverProfiles ? [{ driverUser: driverUser, driverProfiles: driverProfiles, driverPosts: driverPosts }].map(item => (
                                    <Typography variant="h6" sx={{
                                        textAlign: 'center'
                                    }}>Currently Driving:</Typography> + 
                                    desktop ? <RiderItem data={item} />: <RiderItemMobile data={item} />


                            )) : "Not Currently Driving Anyone"}
                        </Grid>
                    </Grid>




                </div>
            )
            }
        </div>
    )
}