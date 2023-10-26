import React, { useEffect, useState } from "react";
import API from "../apiconfig";
import { Avatar, CircularProgress, LinearProgress, Typography, Grid } from "@mui/material";
import { generateColorFromInitial } from "./ListItem";
import userData from '../data/userData.json'
import ListItem from "../components/ListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ListItemMobile from "../components/ListItemMobile";
import DriverItem from "./DriverItem";
import DriverItemMobile from "./DriverItemMobile";




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

export default function ProfileComponent({ id }) {
    const [user, setUser] = useState('');
    const [profile, setProfile] = useState('');
    const [rider, setRider] = useState('');
    const [post, setPost] = useState();
    const [driver, setDriver] = useState('');
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up("md"));
    const [listItem, setListItem] = useState(null);

    //state for Riders' Driver

    const [driverProfile, setDriverProfile] = useState(null)
    const [driverUser, setDriverUser] = useState(null)

    


    useEffect(() => {
        API.get(`/users/${id}/`).then((res) => {
            setUser(res.data);
            const userId = res.data.id;
            API.get(`/profiles`).then((profileres) => {
                setProfile(profileres.data.filter((profile) => profile.user === userId)[0]);
                const profileID = profileres.data.filter((profile) => profile.user === userId)[0].id;
                API.get(`/profiles/riders/`).then((res2) => {
                    setRider(res2.data.filter((rider) => rider.profile === profileID)[0]);
                    const riderId = res2.data.filter((rider) => rider.profile === profileID)[0].id
                    API.get(`/posts`).then(postres => {
                        setPost(postres.data.filter((post) => post.rider === riderId)[0])
                        if(!!res2.data.filter((rider) => rider.profile === profileID)[0].driver){
                            API.get(`/profiles/drivers/${res2.data.filter((rider) => rider.profile === profileID)[0].driver}`).then(res => {
                                API.get(`/profiles/${res.data.profile}`).then((res) => {
                                    setDriverProfile(res.data)
                                    API.get(`users/${res.data.user}`).then(res => {
                                        setDriverUser(res.data)
                                    })
                                })
                            })
                        }
                    })
                })

                API.get(`/profiles/drivers/`).then((res) => {
                    setDriver(res.data.filter((driver) => driver.profile === profileID));
                }).then(() => {
                    setLoading(false)
                })
            });
        });
    }, []);

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
                            <Typography sx={textStyle}>Account Type: {driver.length > 0 ? "Driver" : "Rider"}</Typography>
                            <Typography sx={textStyle}>School: {profile ? profile.school : null}</Typography>

                        </Grid>
                        <Grid item xs={desktop ? 8 : 12} style={{ marginTop: '30px' }}>
                            {driver.length > 0 ? <p>The Driver is already driving someone</p> :
                                user && profile && post && rider ?
                                    // console.log([{user : user, profiles: profile, posts: post, riders: rider}])
                                    [{ user: user, profiles: profile, posts: post, riders: rider }].map((listing, index) => (
                                        desktop ? <ListItem key={index} apiData={listing} userData={userData} /> : <ListItemMobile key={index} apiData={listing} userData={userData} />
                                    ))
                                    : <p>This user hasnt submitted a ride request yet.</p>

                            }
                            {driverUser && driverProfile ? 
                            <Typography>Driven by:</Typography>+
                            [{driverUser:driverUser, driverProfile: driverProfile, user: user, profiles: profile, posts: post, riders: rider}].map((item) => (
                                desktop ? <DriverItem data={item} /> : <DriverItemMobile  data={item}/>
                            )):<p>This Rider doesn't currently have a Driver</p>
                            }
                        </Grid>
                    </Grid>




                </div>
            )
            }
        </div>
    );
}
