import React from "react";
import NavBar from "../components/NavBar";
import userdata from '../data/userData.json'
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";


export default function Login(){
    return(
        <div>
        <NavBar auth={userdata.auth} />
        <Box style={{marginTop : "0px"}}>
        <LoginForm />
        </Box>
            
        </div>
    )
}