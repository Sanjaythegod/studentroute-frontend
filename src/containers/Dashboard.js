import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import catalogues from '../data/catalogues.json'
import NavBar from "../components/NavBar";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Box, Grid, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import RideReqiestForm from "../components/RideRequestForm";
import userData from '../data/userData.json'
import ListItemMobile from "../components/ListItemMobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import API from '../apiconfig'
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from "react-router-dom";


export function Map() {
    return (
        <div sx={{ height: '100%', width: '100%' }}>
            <GoogleMap zoom={10} center={{ lat: 44, lng: -80 }} ></GoogleMap>
        </div>
    )

}

export default function Dashboard() {
    const [search, setSearch] = useState('');
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [isDriver, setIsDriver] = useState(false);
    const [driverID, setDriverID] = useState(null);
    const [driver, setDriver] = useState(false)
    const [profileId, setProfileId] = useState(null)
    const [driverFound, setDriverFound] = useState(false);
    const navigate = useNavigate();

    const theme = useTheme();
    const auth = localStorage.getItem('auth');
    const desktop = useMediaQuery(theme.breakpoints.up("md"));


    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };


    useEffect(() => {
        API.get('/posts')
            .then(postResponse => {
                const posts = postResponse.data;
                const dataPromises = posts.map(post => {
                    const postPromise = API.get(`/posts/${post.id}`);
                    const riderPromise = API.get(`/profiles/riders/${post.rider}/`);

                    return Promise.all([postPromise, riderPromise])
                        .then(responses => {
                            const postData = responses[0].data;
                            const riderData = responses[1].data;
                            const profilePromise = API.get(`/profiles/${riderData.profile}`);
                            return Promise.all([postData, riderData, profilePromise]);
                        })
                        .then(dataArray => {
                            const [post, rider, profile] = dataArray;
                            console.log(profile)
                            const userPromise = API.get(`/users/${profile.data.user}/`);
                            return Promise.all([post, rider, profile, userPromise]);
                        })
                        .then(dataArray => {
                            const [post, rider, profile, user] = dataArray;
                            return {
                                posts: post,
                                riders: rider,
                                profiles: profile.data,
                                user: user.data,
                            };
                        });
                });

                return Promise.all(dataPromises);
            })
            .then(dataResponses => {
                // Now you have an array of objects, each containing posts, riders, profiles, and users
                const combinedData = dataResponses.map(dataResponse => {
                    return dataResponse;
                });
                console.log('combined data', combinedData);
                setPostData(combinedData)
            }).then(() => {
                setLoading(false)
            })
            .catch(error => {
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
            });
    }, []);

    //user's data

    useEffect(() => {
        API.get(`/users/${JSON.parse(localStorage.getItem('user')).user_id}/`).then((res) => {
            const userId = res.data.id;
            API.get(`/profiles`).then((profileres) => {
                const profileID = profileres.data.filter((profile) => profile.user === userId)[0].id;
                setProfileId(profileID)
                API.get(`/profiles/drivers/`).then((res) => {
                    if (!!res.data.filter((driver) => driver.profile === profileID)[0]) setIsDriver(!!res.data.filter((driver) => driver.profile === profileID)[0].approved)
                    if (!!res.data.filter((driver) => driver.profile === profileID)[0]) setDriverID(res.data.filter((driver) => driver.profile === profileID)[0].id)
                    const tempDriver = !!res.data.filter((driver) => driver.profile === profileID)[0] ? !!res.data.filter((driver) => driver.profile === profileID)[0].approved : null

                    //get users for the driver
                    /* if(tempDriver) {
                        API.get(`/users/${JSON.parse(localStorage.getItem('user')).user_id}`).then(res => {
                            const userId = res.data.id;
                            API.get('/profiles').then(res => {
                                const profileId =  res.data.filter((profile) => profile.user === userId)[0].id
                                API.get('/profiles/drivers/').then(res => {
                                    const driverId = res.data.filter((driver) => driver.profile === profileId)[0].id
                                    console.log('driver id', driverId)
                                    API.get('/profiles/riders/').then(res => {
                                        const riderWithDriverId = res.data.filter(rider => rider.driver === driverId);
                                        console.log(riderWithDriverId)
                                        if(riderWithDriverId) {

                                        }
                                    })
                
                                })
                            })
                        })
                    } */
                    
                })
                API.get('/profiles/riders/').then(res => {
                    const rider = res.data.filter((rider) => rider.profile === profileID)
                    setDriver(!!rider.length)
                })
            });
        });
    }, [])


    
    




    const filteredPostData = loading
        ? null
        : postData.filter((listing) =>
            listing.user.first_name.toLowerCase().includes(search.toLowerCase()) &&
            listing.profiles.school === JSON.parse(localStorage.getItem('profile')).profile_school &&
            listing.posts.archived === false
        );


    return (
        <div>
            <NavBar auth={auth} badgeContent={isDriver || !driver ? 1 : 0} firstName={JSON.parse(localStorage.getItem('user')).user_first_name} lastName={JSON.parse(localStorage.getItem('user')).user_last_name} />
            <Grid container>
                
                
                    <Grid item xs={desktop ? 4 : 12}>
                        <Box sx={{ marginTop: '125px', height: '100%', backgroundColor: 'white' }}>
                            <RideReqiestForm />
                        </Box>
                    </Grid>


                <Grid item xs={desktop ? 8 : 12}>
                    <Box sx={{ marginTop: desktop ? '125px' : '95px', height: '100%', backgroundColor: 'white', }}>
                        <Box sx={{
                            textAlign: desktop ? isDriver ? 'left' : 'left' : 'center'
                        }}>
                            <Typography variant={desktop ? "h4" : "h5"} sx={{ fontWeight: 'bold', }}>Welcome, {JSON.parse(localStorage.getItem('user')).user_first_name}</Typography>
                            <TextField
                                label="Filter Results"
                                variant="outlined"
                                value={search}
                                sx={{
                                    width: '245px'
                                }}
                                onChange={handleSearchChange} // Attach the event handler
                            />
                        </Box>

                        <Box sx={{
                            marginLeft: desktop ? isDriver ? '150px'  : "0px" : "0px",
                            marginRight: 'auto'
                        }}>
                            {loading ? <LinearProgress /> :
                                filteredPostData.map((listing, index) => (
                                    listing.profiles ?
                                        listing.posts.length === 0 ? <Typography>There are no avaiable riders</Typography> : desktop ? <ListItem key={index} apiData={listing} driverID={driverID} profileId={profileId} isDriver={isDriver} /> : <ListItemMobile key={index} apiData={listing} driverID={driverID} isDriver={isDriver} />
                                        :
                                        <p>Helooo</p>
                                ))
                            }
                        </Box>





                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
