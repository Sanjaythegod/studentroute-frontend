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
    const [profiles, setProfiles] = useState();
    const [users, setUsers] = useState();
    const [allUserData, setAllUserData] = useState();
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up("md"));


    // Function to handle changes in the filter text field
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        API.get('/posts').then((res) => {
            console.log('posts',res.data)
        }).then(() => {
            API.get('/profiles/riders/').then((res) => {
                console.log('riders',res.data)
            }).then(() => {
                API.get('/profiles').then((res) => {
                    console.log('profiles',res.data)
                }).then(() => {
                    API.get('/users').then((res) => {
                        console.log('users',res.data)
                    })
                })
            })
        })
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


                        {filteredCatalogues.map((listing, index) => (
                            desktop ? <ListItem key={index} data={listing} userData={userData} /> : <ListItemMobile key={index} data={listing} userData={userData} />
                        ))}

                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
