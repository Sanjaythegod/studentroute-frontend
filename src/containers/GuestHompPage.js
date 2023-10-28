import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import image from '../images/why-kei-8e2gal_GIE8-unsplash.jpg'
import userdata from '../data/userData.json'
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function GuestHomePage() {
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up("md"));
    const navigate = useNavigate();
    const auth = localStorage.getItem('auth');
    
    useEffect(() => {
        console.log(localStorage.getItem("auth"))
    }, [])

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflowX: 'hidden', // Prevent horizontal scrolling
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(5px)',
                    zIndex: -1,
                }}
            ></div>
            {auth ? <NavBar auth={auth} firstName={JSON.parse(localStorage.getItem('user')).user_first_name} lastName={JSON.parse(localStorage.getItem('user')).user_last_name}/> : <NavBar auth={auth} />}
            
            <Box sx={{
                marginTop: '35vh',
            }}>
                <Container sx={{ paddingTop: 2 }}>
                    <Typography variant={desktop ? "h1" : "h3"} gutterBottom style={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}>
                        StudentRoutes
                    </Typography>
                    <Typography variant={desktop ? "h4" : "h5"} paragraph style={{
                        color: 'white',
                    }}>
                        A Free and Safe Ride Sharing App for School!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            width: '200px',
                            height: '66px',
                            fontSize: '20px',
                            marginTop: '30px',
                            color: 'white',
                        }}
                        onClick={() => {
                            navigate('/signup')
                        }}
                    >
                        Get Started
                    </Button>

                </Container>
            </Box>
        </div>
    )
}
