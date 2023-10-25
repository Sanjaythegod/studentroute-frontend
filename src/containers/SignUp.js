import React from "react";
import NavBar from "../components/NavBar";
import userdata from '../data/userData.json'
import SignUpForm from "../components/SignUpForm";
import { Box } from "@mui/material";


export default function SignUp() {
    const auth = localStorage.getItem('auth');

    return(
        <div>
            <NavBar auth={auth} />
            <Box style={{marginTop : "25px"}}>
            <SignUpForm />
            </Box>
            
        </div>
    )
}