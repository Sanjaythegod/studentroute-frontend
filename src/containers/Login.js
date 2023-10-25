import React from "react";
import NavBar from "../components/NavBar";
import userdata from '../data/userData.json'
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";


export default function Login(){
    const auth = localStorage.getItem('auth');

    return(
        <div>
        <NavBar auth={auth} />
        <Box style={{marginTop : "0px"}}>
        <LoginForm />
        </Box>
            
        </div>
    )
}