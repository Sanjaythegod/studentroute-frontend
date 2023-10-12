import React from "react";
import userdata from '../data/userData.json'
import NavBar from "../components/NavBar";
import catalogues from '../data/catalogues.json';
import DriverItem from "../components/DriverItem";
import userData from '../data/userData.json'
import { Box } from "@mui/material";

export default function Matches() {
    return(
        <div>
            <NavBar auth={userdata.auth} />
            <Box sx={{
                marginTop: '100px',
                marginLeft: '100px'
            }}>
                {catalogues.map((listing, index) => (
                    <DriverItem key={index} driverData={listing} userData={userData}/>
                ))}
            </Box>
            
        </div>
    )
}