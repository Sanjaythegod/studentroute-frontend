import React from "react";
import NavBar from "../components/NavBar";
import { Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import image from '../images/why-kei-8e2gal_GIE8-unsplash.jpg'

export default function GuestHomePage() {
    return (
        <div style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover', // Adjust as needed
                backgroundPosition: 'center', // Adjust as needed
                backgroundRepeat: 'no-repeat', // Adjust as needed
                width: '100%',
                height: '100vh', 
        }}>
            <NavBar />
            <Box sx={{ 
                marginTop: '35vh', 
            }}>
                <Container sx={{ paddingTop: 2 }}>
                    <Typography variant="h1" gutterBottom style={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}>
                        Welcome to StudentRoutes
                    </Typography>
                    <Typography variant="h4" paragraph style={{
                        color: 'white',
                    }}>
                    A free and safe school bus alternative for flexible students!
                    </Typography>
                    <Button variant="contained" color="primary">
                        Get Started
                    </Button>
                </Container>
            </Box>

        </div>
    )
}