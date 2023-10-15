import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import catalogues from '../data/catalogues.json'
import NavBar from "../components/NavBar";
import userdata from '../data/userData.json'
import { Box, Grid, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import RideReqiestForm from "../components/RideRequestForm";
import userData from '../data/userData.json'
import ListItemMobile from "../components/ListItemMobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import API from '../apiconfig'
import axios from "axios";



export default function Dashboard() {
    const [search, setSearch] = useState('');
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true)
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up("md"));


    // Function to handle changes in the filter text field
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        let posts, riders, profiles, users;
    
        API.get('/posts')
            .then((postsResponse) => {
                posts = postsResponse.data;
                return API.get('/profiles/riders/');
            })
            .then((ridersResponse) => {
                riders = ridersResponse.data;
                return API.get('/profiles');
            })
            .then((profilesResponse) => {
                profiles = profilesResponse.data;
                return API.get('/users');
            })
            .then((usersResponse) => {
                users = usersResponse.data;
    
                // Combine the results into separate arrays for each user
                const userArrays = users.map(user => {
                    const userPosts = posts.filter(post => post.rider === user.id);
                    const userRiders = riders.filter(rider => rider.profile === user.id);
                    const userProfile = profiles.find(profile => profile.user === user.id);
                    return {
                        user,
                        posts: userPosts,
                        riders: userRiders,
                        profile: userProfile,
                    };
                });
    
                console.log('User Arrays', userArrays);
                setPostData(userArrays)
                console.log(userArrays[0].user.first_name)
            }).then(() => {
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);




    // Filter catalogues based on the search text
    const filteredCatalogues = catalogues.filter((listing) =>
        listing.first_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <NavBar auth={userdata.auth} badgeContent={catalogues.length} />
            <Grid container>
                <Grid item xs={desktop ? 4 : 12}>
                    <Box sx={{ marginTop: '125px', height: '100%', backgroundColor: 'white' }}>
                        <RideReqiestForm />
                    </Box>
                </Grid>
                <Grid item xs={desktop ? 8 : 12}>
                    <Box sx={{ marginTop: desktop ? '125px' : '15px', height: '100%', backgroundColor: 'white', }}>
                        <Box sx={{
                            textAlign: desktop ? 'left' : 'center'
                        }}>
                            <Typography variant={desktop ? "h4" : "h6"} sx={{ fontWeight: 'bold', }}>{userData.auth ? "Choose a rider" : "Westview High School"}</Typography>
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

                        {loading ? <div>loading ... </div> : 
                        postData.map((listing, index) => (
                            <ListItem key={index} apiData={listing} userData={userData} />
                            // desktop ? <ListItem key={index} data={postData} userData={userData} /> : <ListItemMobile key={index} data={postData} userData={userData} />

                        ))
                        }
                        

                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
